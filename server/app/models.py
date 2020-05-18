from app import db


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(60), nullable=False, server_default="Anonymous", default="Anonymous")
    title = db.Column(db.String(80), nullable=False, server_default="", default="")
    text = db.Column(db.Text, nullable=False, server_default="", default="")

    def __str__(self):
        return f"Note {self.id}: {self.text}"

    def __repr__(self):
        return str(self)
