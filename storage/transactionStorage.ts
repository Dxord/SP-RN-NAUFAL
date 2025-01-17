import { readTable } from "../utils/SQLiteDatabase";
 

export const getTransactions =async () => {
  let data = await readTable('transactions');
  console.log('getTransactions', data)
 return data
};