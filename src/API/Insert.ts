import { getDb } from "../database/schema/schema";


export const insertTransaction = async (transaction: {
  period: string;
  account: string;
  category: string;
  subcategory: string;
  note: string;
  bdt: number;
  type: string;
  description: string;
  amount: number;
  currency: string;
}) => {
  const db = getDb();
  try {
    await db.runAsync(
      `INSERT INTO transactions (period, account, category, subcategory, note, bdt, type, description, amount, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transaction.period,
        transaction.account,
        transaction.category,
        transaction.subcategory,
        transaction.note,
        transaction.bdt,
        transaction.type,
        transaction.description,
        transaction.amount,
        transaction.currency,
      ]
    );
    console.log('Insert successful');
  } catch (error) {
    console.error('Insert failed', error);
  }
};
