import random
from faker import Faker
import mysql.connector
from datetime import date, timedelta

# ─────────── Configuration ───────────
TOTAL_BOOKS = 12_000
PRICE_MIN, PRICE_MAX = 5, 150
PAGES_MIN, PAGES_MAX = 100, 1_000
YEARS_BACK = 10
BATCH_SIZE = 1000

CATEGORIES = [
    "Coding", "Fiction", "Non-Fiction", "Romance",
    "Science_Fiction", "Horror", "Love", "Mythical Nature"
]
LANGUAGES = ["English", "Hindi", "Spanish", "French", "German"]

fake = Faker()

# ─────────── Helper Functions ───────────
def randdigit(n): return "".join(random.choices("0123456789", k=n))
def fake_isbn10(): return randdigit(10)
def fake_isbn13(): return randdigit(13)

def fake_publish_date():
    start = date.today() - timedelta(days=YEARS_BACK * 365)
    return fake.date_between(start, "today")

def fake_image(isbn13):
    # Working image URL from picsum.photos
    return f"https://picsum.photos/seed/{isbn13}/200/300"

def build_row():
    isbn13 = fake_isbn13()
    book_name = fake.sentence(nb_words=4).rstrip(".")
    category = random.choice(CATEGORIES)
    return (
        fake_isbn10(),
        isbn13,
        book_name,
        category,
        fake.paragraph(nb_sentences=3),
        round(random.uniform(PRICE_MIN, PRICE_MAX), 2),
        random.randint(0, 50),  # quantity
        random.randint(PAGES_MIN, PAGES_MAX),
        fake.name(),            # author
        fake.company(),         # publisher
        fake_publish_date(),
        random.choice(LANGUAGES),
        fake_image(isbn13)      # working image URL
    )

# ─────────── MySQL Connection ───────────
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ayush#2004",      # 👈 change if needed
    database="ebook"
)
cursor = db.cursor()

# ─────────── Insert SQL ───────────
INSERT_SQL = """
INSERT INTO products (
    isbn10, isbn13, name, category, description, price, quantity, pages,
    author, publisher, publish_date, langauge, image
) VALUES (
    %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
)
"""

# ─────────── Batch Insert ───────────
for i in range(0, TOTAL_BOOKS, BATCH_SIZE):
    rows = [build_row() for _ in range(BATCH_SIZE)]
    cursor.executemany(INSERT_SQL, rows)
    db.commit()
    print(f"✅ Inserted batch {i + BATCH_SIZE} / {TOTAL_BOOKS}")

print(f"🎉 Successfully seeded {TOTAL_BOOKS:,} books with working cover images.")
