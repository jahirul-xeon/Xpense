import { openDatabaseSync, SQLiteRunResult } from 'expo-sqlite';

const db = openDatabaseSync('xpense.db');

export const getDb = () => db;

export type TransactionRow = {
  id: number;
  period: string;
  account: string;
  category: string;
  subcategory: string;
  note: string;
  bdt: number;
  type: 'Income' | 'Expense';
  description: string;
  amount: number;
  currency: string;
};

export const createTable = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        period TEXT NOT NULL,
        account TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT,
        note TEXT,
        bdt INTEGER NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        amount REAL NOT NULL,
        currency TEXT NOT NULL
      );
    `);
    console.log('✅ Table created.');
  } catch (error) {
    console.error('❌ Failed to create table:', error);
  }
};


// Load all transactions filtered by period ("YYYY-MM")
export const getAllTransactions = (period?: string): TransactionRow[] => {
  try {
    const results = db.getAllSync(
      period
        ? `SELECT * FROM transactions WHERE period = ? ORDER BY id DESC`
        : `SELECT * FROM transactions ORDER BY id DESC`,
      period ? [period] : []
    );
    return results as TransactionRow[];
  } catch (err) {
    console.error('❌ Error fetching transactions:', err);
    return [];
  }
};
