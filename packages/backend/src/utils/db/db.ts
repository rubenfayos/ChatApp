import { Client } from "pg";

const db = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_SCHEMA,
  user: "postgres",
  password: process.env.DB_PASSWORD,
});

async function initializeDatabase() {
  let attempts = 0;
  const maxAttempts = 5;
  const retryInterval = 5000; // 5 seconds

  while (attempts < maxAttempts) {
    try {
      await db.connect();
      console.log("Base de datos conectada");
      break;
    } catch (error) {
      console.error("Error conectando a la base de datos:", error);
      console.log("Volviendo a intentar en 5 segundos...");
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      attempts++;
    }
  }

  if (attempts === maxAttempts) {
    console.error(
      "Failed to connect to the database after multiple attempts. Exiting...",
    );
    process.exit(1);
  }
}

async function closeDatabase() {
  try {
    await db.end();
    console.log("Base de datos desconectada");
  } catch (error) {
    console.error("Error al desconectarse a la base de datos:", error);
    throw error;
  }
}

export { db, initializeDatabase, closeDatabase };
