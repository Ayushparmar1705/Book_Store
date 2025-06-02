import random
from faker import Faker
import mysql.connector
from datetime import datetime

fake = Faker()

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",             # Change if needed
    user="root",                  # Replace with your MySQL username
    password="Ayush#2004",        # Replace with your MySQL password
    database="ebook"              # Replace with your database name
)
cursor = db.cursor()

# Your predefined categories
categories = [
    'Coding',
    'Fiction',
    'Non-Fiction',
    'Romance',
    'Science_Fiction',
    'Horror',
    'Love',
    'Mythical Nature'
]

languages = ['English', 'Hindi', 'Spanish', 'French', 'German']

# Helper functions
def generate_isbn10():
    return ''.join([str(random.randint(0, 9)) for _ in range(10)])

def generate_isbn13():
    return ''.join([str(random.randint(0, 9)) for _ in range(13)])

# Insert books
def insert_books(n=300):
    for i in range(n):
        isbn10 = generate_isbn10()
        isbn13 = generate_isbn13()
        name = fake.sentence(nb_words=4).replace('.', '')
        category = random.choice(categories)
        description = fake.paragraph(nb_sentences=3)
        price = round(random.uniform(5, 150), 2)
        quantity = random.randint(0, 50)
        pages = random.randint(100, 1000)
        author = fake.name()
        publisher = fake.company()
        publish_date = fake.date_between(start_date='-10y', end_date='today')
        language = random.choice(languages)
        image = f"https://picsum.photos/seed/{random.randint(1000,9999)}/200/300"

        sql = """
        INSERT INTO products (
            isbn10, isbn13, name, category, description, price, quantity, pages,
            author, publisher, publish_date, langauge, image
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            isbn10, isbn13, name, category, description, price, quantity, pages,
            author, publisher, publish_date, language, image
        )

        cursor.execute(sql, values)

        if (i + 1) % 50 == 0:
            print(f"{i + 1} records inserted...")

    db.commit()
    print(f"✅ {n} records inserted successfully!")

insert_books(300)
