const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionOptions = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

const pool = new Pool(connectionOptions);

const seedDatabase = async () => {
  try {
    await pool.connect();

    // Generate fake users
    for (let i = 0; i < 10; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();
        console.log({name, password})
      await pool.query(
        'INSERT INTO "Users" (display_name, email, password_hash) VALUES ($1, $2, $3)',
        [name, email, password]
      );
    }

    // Generate fake todos
    for (let i = 0; i < 20; i++) {
      const userId = Math.floor(Math.random() * 10) + 1;
      const title = faker.lorem.sentence();
      const completed = faker.datatype.boolean();

      await pool.query(
        'INSERT INTO "Todos" (user_id, title, completed) VALUES ($1, $2, $3)',
        [userId, title, completed]
      );
    }

    // Generate fake notes
    for (let i = 0; i < 20; i++) {
      const userId = Math.floor(Math.random() * 10) + 1;
      const content = faker.lorem.paragraph();

      await pool.query(
        'INSERT INTO "Notes" (user_id, content) VALUES ($1, $2)',
        [userId, content]
      );
    }

    // Generate fake calendar events
    for (let i = 0; i < 20; i++) {
      const userId = Math.floor(Math.random() * 10) + 1;
      const title = faker.lorem.sentence();
      const date = faker.date.future();

      await pool.query(
        'INSERT INTO "Calendar" (user_id, title, date) VALUES ($1, $2, $3)',
        [userId, title, date]
      );
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
};

seedDatabase();