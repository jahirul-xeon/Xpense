import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('money_manager.db'); 

export const setupDatabase = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      currency TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent_id INTEGER,
      type TEXT CHECK(type IN ('Income', 'Expense', 'Transfer'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      from_account_id INTEGER,
      to_account_id INTEGER,
      category_id INTEGER,
      note TEXT,
      description TEXT,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      type TEXT CHECK(type IN ('Income', 'Expense', 'Transfer'))
    );
  `);
};

export default db;
