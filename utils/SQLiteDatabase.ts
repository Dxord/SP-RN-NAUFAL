import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true); // Use promises for better control

const errorCB=(err:any)=> {
  console.log("SQL Error: " + err);
}

const successCB = () =>{
  console.log("SQL executed fine");
}

const openCB = () =>{
  console.log("Database OPENED");
}

let database: SQLite.SQLiteDatabase | null = null;


 export const initDB = async () => {
  try {
    database = await SQLite.openDatabase({name: 'my.db', location: 'default'}, successCB, errorCB);

      createTables()
  } catch (error) {
      // console.error('Error initializing database:', error);
  }
};
export const createTables = () => {
  database.transaction((tx: { executeSql: (arg0: string) => void; }) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_id TEXT, total_price REAL, card_number TEXT);'
    );
  });
  database.transaction((tx: { executeSql: (arg0: string) => void; }) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS transaction_items (id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_id TEXT, product_id TEXT, price REAL, image TEXT, quantity INTEGER, title TEXT);'
    );
  });
  database.transaction((tx: { executeSql: (arg0: string) => void; }) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT,product_id TEXT, title TEXT,image TEXT, quantity INTEGER NOT NULL DEFAULT 0, price INTEGER);'
    );
  });
};

export const insertTransaction =async (transaction_id: string, total_price: number, card_number: string|undefined) => {
  if (!database) {
    console.error('Database not initialized');
    return;
}

try { 
   await database.executeSql('INSERT INTO transactions (transaction_id, total_price, card_number) VALUES (?, ?, ?)', [transaction_id, total_price,card_number]);
   console.log("Save succeed")
} catch (error) {
    console.error('Error inserting data:', error);
} 
};

export const getTransactions =async (callback: (results: any) => void) => {
  if (!database) {
    console.error('Database not initialized');
    return;
}
try { 
 await database.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (tx: any, results: any) => void) => void; }) => {
    tx.executeSql('SELECT * FROM transactions;', [], (tx: any, results: any) => {
      callback(results);
    });
  });
} catch (error) {
  console.error('Error getting data:', error);
} 
};
export const processResponse = (rows: SQLite.ResultSet) => {
  let _users: any[] = [];
  for (let i = 0; i < rows.rows.length; i++) {
      _users.push(rows.rows.item(i));
  }

  return _users;
};

export const showTableStructure = async (table: string) => {
  if (!database) {
      console.error('Database not initialized');
      return;
  }

  try {
      const query = `PRAGMA table_info(${table});`;
      const res = await database.executeSql(query, []);
      return processResponse(res[0]);
  } catch (error) {
      console.error('Error reading table structure:', error);
      return [];
  }
};

export const readTable = async (table: string, where: string | null = null) => {
  if (!database) {
      console.error('Database not initialized');
      return [];
  }

  try {
      const query = `SELECT * FROM ${table}${where ? ` WHERE ${where}` : ''};`;
      const res = await database.executeSql(query, []);
      return processResponse(res[0]);
  } catch (error) {
      console.error('Error reading table:', error);
      return [];
  }
};

export const insertData = async (table: string, data: any) => {
  if (!database) {
      console.error('Database not initialized');
      return;
  }

  try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')});`;
      await database.executeSql(query, values);
      console.log("Save succeed", data.id)
  } catch (error) {
      console.error('Error inserting data:', error);
  }
};

export const updateData = async (table: string, data: any, where: string) => {
  if (!database) {
      console.error('Database not initialized');
      return;
  }

  try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const query = `UPDATE ${table} SET ${keys.map((key: string) => `${key} = ?`).join(', ')} WHERE ${where};`;
      await database.executeSql(query, values);
      console.log("Update succeed")
  } catch (error) {
      console.error('Error updating data:', error);
  }
};

export const deleteData = async (table: string, where: string) => {
  if (!database) {
      console.error('Database not initialized');
      return;
  }

  try {
      const query = `DELETE FROM ${table} WHERE ${where};`;
      await database.executeSql(query, []);
  } catch (error) {
      console.error('Error deleting data:', error);
  }
};
export const deleteAllData = async (table: string) => {
  if (!database) {
      console.error('Database not initialized');
      return;
  }

  try {
      const query = `DELETE FROM ${table};`;
      await database.executeSql(query, []);
  } catch (error) {
      console.error('Error deleting data:', error);
  }
};