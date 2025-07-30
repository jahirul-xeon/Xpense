import { getDb } from "../database/schema/schema";

export const getTransactions = async (): Promise<any[]> => {
  const db = getDb();
  const result = await db.getAllAsync(`SELECT * FROM transactions ORDER BY id DESC`);
  return result;
};
