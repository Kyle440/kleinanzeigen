from datetime import datetime

class Kleinanzeigen:
    def __init__(self, title, description, price):
        self.title = title
        self.description = description
        self.price = price
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def update(self, title=None, description=None, price=None):
        if title:
            self.title = title
        if description:
            self.description = description
        if price:
            self.price = price
        self.updated_at = datetime.now()