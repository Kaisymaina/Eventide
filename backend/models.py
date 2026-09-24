from datetime import datetime

from extensions import db


class Event(db.Model):
    __tablename__ = "events"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    event_date = db.Column(db.Date)
    venue = db.Column(db.String(120))


class Attendee(db.Model):
    __tablename__ = "attendees"
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    phone_number = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    checked_in = db.Column(db.Boolean, default=False)
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)


class Reminder(db.Model):
    __tablename__ = "reminders"
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    message = db.Column(db.String(500))
    scheduled_time = db.Column(db.DateTime)
    sent = db.Column(db.Boolean, default=False)


class Poll(db.Model):
    __tablename__ = "polls"
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    question = db.Column(db.String(300))
    option_1 = db.Column(db.String(120))
    option_2 = db.Column(db.String(120))
    option_3 = db.Column(db.String(120))


class PollVote(db.Model):
    __tablename__ = "poll_votes"
    id = db.Column(db.Integer, primary_key=True)
    poll_id = db.Column(db.Integer, db.ForeignKey("polls.id"))
    attendee_id = db.Column(db.Integer, db.ForeignKey("attendees.id"))
    chosen_option = db.Column(db.Integer)


class AirtimeReward(db.Model):
    __tablename__ = "airtime_rewards"
    id = db.Column(db.Integer, primary_key=True)
    attendee_id = db.Column(db.Integer, db.ForeignKey("attendees.id"))
    amount = db.Column(db.Float)
    reason = db.Column(db.String(200))
    status = db.Column(db.String(20), default="pending")


class Vendor(db.Model):
    __tablename__ = "vendors"
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    category = db.Column(db.String(80))
    # pending -> confirmed | issue, updated automatically from inbound SMS
    status = db.Column(db.String(20), default="pending")

    def to_dict(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "name": self.name,
            "phone_number": self.phone_number,
            "category": self.category,
            "status": self.status,
        }


class VendorMessage(db.Model):
    __tablename__ = "vendor_messages"
    id = db.Column(db.Integer, primary_key=True)
    vendor_id = db.Column(db.Integer, db.ForeignKey("vendors.id"))
    message = db.Column(db.String(500))
    direction = db.Column(db.String(10))  # "outbound" or "inbound"
    status = db.Column(db.String(30), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "vendor_id": self.vendor_id,
            "message": self.message,
            "direction": self.direction,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }