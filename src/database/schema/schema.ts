import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('xpense.db');

export const getDb = () => db;

export type TransactionType = 'Income' | 'Expense' | 'Transfer';

export type TransactionRow = {
  id?: number;
  date: string;              // Format: YYYY-MM-DD for fast SQLite sorting/filtering
  timestamp: number;         // Unix timestamp for exact chronological ordering
  account: string;           // E.g., 'Cash', 'June Abbu', 'Card'
  category: string;          // E.g., '💰 Salary', '🍜 Food'
  subcategory?: string | null;  // E.g., 'Rent', 'Mango'
  note?: string | null;             // E.g., 'Bhara', 'kathal'
  type: TransactionType;     // 'Income', 'Expense', or 'Transfer'
  amount: number;            // Transaction amount
  currency: string;          // Transaction currency (e.g., 'BDT', 'US$')
  bdt_amount: number;        // Standardized BDT amount for rapid aggregations
  description?: string | null;      // Optional extra context or image path
  transfer_to?: string | null;      // Destination account for transfers
  transfer_fee?: number | null;     // Any fees incurred during a transfer
};

export const createTable = async () => {
  try {
    // 1. Enable WAL mode for drastically improved write performance and concurrency
    await db.execAsync(`PRAGMA journal_mode = WAL;`);

    // 2. Create the robust transactions table accommodating all fields
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        account TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT,
        note TEXT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT NOT NULL,
        bdt_amount REAL NOT NULL,
        description TEXT,
        transfer_to TEXT,
        transfer_fee REAL
      );
    `);

    // 3. Create indices for exceptionally fast queries on common filters
    await db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account);
      CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
      CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
    `);
    
    console.log('✅ Optimal SQLite schema & indices created successfully.');
  } catch (error) {
    console.error('❌ Failed to create table:', error);
  }
};

/**
 * Performant Insert Operation
 */
export const insertTransaction = (txn: TransactionRow): number | undefined => {
  try {
    const result = db.runSync(
      `INSERT INTO transactions (
        date, timestamp, account, category, subcategory, note, 
        type, amount, currency, bdt_amount, description, transfer_to, transfer_fee
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        txn.date, txn.timestamp, txn.account, txn.category, 
        txn.subcategory || null, txn.note || null, txn.type, 
        txn.amount, txn.currency, txn.bdt_amount, txn.description || null, 
        txn.transfer_to || null, txn.transfer_fee || 0
      ]
    );
    return result.lastInsertRowId;
  } catch (err) {
    console.error('❌ Error inserting transaction:', err);
    return undefined;
  }
};

/**
 * High-performance querying using Date range
 */
export const getTransactionsByMonth = (yearMonth: string): TransactionRow[] => {
  // `yearMonth` should be 'YYYY-MM' format
  // Because we indexed `date`, using the `LIKE` operator without a leading wildcard is fast
  try {
    const results = db.getAllSync(
      `SELECT * FROM transactions WHERE date LIKE ? ORDER BY timestamp DESC`,
      [`${yearMonth}-%`]
    );
    return results as unknown as TransactionRow[];
  } catch (err) {
    console.error('❌ Error fetching transactions:', err);
    return [];
  }
};

/**
 * Load all transactions efficiently mapped
 */
export const getAllTransactions = (): TransactionRow[] => {
  try {
    const results = db.getAllSync(`SELECT * FROM transactions ORDER BY timestamp DESC`);
    return results as unknown as TransactionRow[];
  } catch (err) {
    console.error('❌ Error fetching transactions:', err);
    return [];
  }
};
