import random
from faker import Faker
import mysql.connector
from datetime import date, timedelta
# ──────────────────────────────────────────────────────────────────────────

TOTAL_BOOKS = 1_000          # ← change here if you want even more
PRICE_MIN, PRICE_MAX = 5, 150
PAGES_MIN, PAGES_MAX = 100, 1_000
YEARS_BACK = 10              # publish-date window
BATCH_SIZE = 1_000           # keep this ≤ TOTAL_BOOKS

CATEGORIES = [
    "Coding", "Fiction", "Non-Fiction", "Romance",
    "Science_Fiction", "Horror", "Love", "Mythical Nature"
]
LANGUAGES = ["English", "Hindi", "Spanish", "French", "German"]

fake = Faker()

# ───────────────  helpers ────────────────
randdigit = lambda n: "".join(random.choices("0123456789", k=n))

def fake_isbn10():  return randdigit(10)
def fake_isbn13():  return randdigit(13)

def fake_publish_date():
    start = date.today() - timedelta(days=YEARS_BACK * 365)
    return fake.date_between(start, "today")

def fake_image(isbn13):
    # deterministic cover so you never cache-miss
    return f"https://picsum.photos/seed/{isbn13}/200/300"

def build_row():
    isbn13 = fake_isbn13()
    return (
        fake_isbn10(),
        isbn13,
        fake.sentence(nb_words=4).rstrip("."),
        random.choice(CATEGORIES),
        fake.paragraph(nb_sentences=3),
        round(random.uniform(PRICE_MIN, PRICE_MAX), 2),
        random.randint(0, 50),                       # quantity
        random.randint(PAGES_MIN, PAGES_MAX),
        fake.name(),                                 # author
        fake.company(),                              # publisher
        fake_publish_date(),
        random.choice(LANGUAGES),
        fake_image(isbn13),
    )

# ───────────────  MySQL insert ────────────────
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ayush#2004",
    database="ebook"
)
cursor = db.cursor()

INSERT_SQL = """
INSERT INTO products (
    isbn10, isbn13, name, category, description, price, quantity, pages,
    author, publisher, publish_date, langauge, image
) VALUES (
    %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
)
"""

rows = [build_row() for _ in range(TOTAL_BOOKS)]
cursor.executemany(INSERT_SQL, rows)
db.commit()

print(f"✅ Seeded {TOTAL_BOOKS:,} books with online cover images.")
def fake_image(isbn13, category):
    keywords = {
        "Science_Fiction": "space",
        "Horror": "dark",
        "Romance": "love",
        # …
    }.get(category, "book")
    return f"https://source.unsplash.com/400x600/?{keywords},{isbn13}"
