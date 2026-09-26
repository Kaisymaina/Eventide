import africastalking
from flask import Blueprint, jsonify, request

from config import Config
from extensions import db
from models import Vendor, VendorMessage

vendor_bp = Blueprint("vendors", __name__)

africastalking.initialize(Config.AT_USERNAME, Config.AT_API_KEY)
sms = africastalking.SMS


@vendor_bp.route("/api/vendors", methods=["GET"])
def list_vendors():
    vendors = Vendor.query.all()
    return jsonify([v.to_dict() for v in vendors])


@vendor_bp.route("/api/vendors", methods=["POST"])
def create_vendor():
    data = request.get_json(silent=True) or {}
    if not data.get("name") or not data.get("phone_number"):
        return jsonify({"error": "name and phone_number are required"}), 400

    vendor = Vendor(
        event_id=data.get("event_id"),
        name=data["name"],
        phone_number=data["phone_number"],  # sandbox format: +2547XXXXXXXX
        category=data.get("category"),
    )
    db.session.add(vendor)
    db.session.commit()
    return jsonify(vendor.to_dict()), 201


@vendor_bp.route("/api/vendors/<int:vendor_id>/messages", methods=["GET"])
def vendor_messages(vendor_id):
    Vendor.query.get_or_404(vendor_id)
    msgs = (
        VendorMessage.query.filter_by(vendor_id=vendor_id)
        .order_by(VendorMessage.created_at)
        .all()
    )
    return jsonify([m.to_dict() for m in msgs])


@vendor_bp.route("/api/vendors/<int:vendor_id>/messages", methods=["POST"])
def send_vendor_message(vendor_id):
    """Organizer -> vendor. This is the OUTBOUND half of the two-way loop."""
    vendor = Vendor.query.get_or_404(vendor_id)
    data = request.get_json(silent=True) or {}
    text = data.get("message")
    if not text:
        return jsonify({"error": "message is required"}), 400

    log = VendorMessage(vendor_id=vendor.id, message=text, direction="outbound")
    db.session.add(log)
    db.session.commit()

    try:
        response = sms.send(text, [vendor.phone_number])
        recipients = response.get("SMSMessageData", {}).get("Recipients", [])
        log.status = recipients[0]["status"] if recipients else "sent"
    except Exception as e:  # noqa: BLE001 - want any AT/SDK error captured for the log
        log.status = f"failed: {e}"

    db.session.commit()
    return jsonify(log.to_dict()), 201


@vendor_bp.route("/sms/inbound", methods=["POST"])
def inbound_sms():
    """
    Vendor -> organizer. This is the INBOUND half of the two-way loop.
    Africa's Talking POSTs here (form-encoded) whenever a vendor replies.
    Register this route's public URL as the SMS callback in the AT dashboard.
    """
    from_number = request.values.get("from")
    text = (request.values.get("text") or "").strip()

    vendor = Vendor.query.filter_by(phone_number=from_number).first()
    if not vendor:
        # Unknown number texting in - log nothing, just acknowledge receipt
        return "", 200

    log = VendorMessage(
        vendor_id=vendor.id, message=text, direction="inbound", status="received"
    )
    db.session.add(log)

    keyword = text.upper()
    if keyword.startswith("CONFIRM"):
        vendor.status = "confirmed"
    elif keyword.startswith("ISSUE"):
        vendor.status = "issue"

    db.session.commit()
    return "", 200