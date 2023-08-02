import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS
          menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT, description TEXT, price REAL, image TEXT, category TEXT);`,
        [],
        () => { resolve() },
        (_, error) => { console.log("db error creating tables"); reject(error) }
      );
    });
  });
};

const insertItems = (items) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      items.forEach(item => {
        tx.executeSql(
          `INSERT INTO menu (name, description, price, image, category) values (?, ?, ?, ?, ?);`,
          [item.name, item.description, item.price, item.image, item.category],
          () => { resolve() },
          (_, error) => { console.log("Error inserting item"); reject(error) }
        );
      });
    });
  });
};


const getItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menu;`,
        [],
        (_, { rows }) => { resolve(rows._array) },
        (_, error) => { console.log("Error getting items"); reject(error) }
      );
    });
  });
};

export async function getFilteredMenuItems(categories) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM menu WHERE category IN (${categories.map(() => '?').join(',')})`,
        categories,
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getFilteredMenuItemsByName = (searchQuery, selectedCategories) => {
  return new Promise((resolve, reject) => {
    let query = '';
    let params = [];
    if (selectedCategories.length > 0) {
      query = `SELECT * FROM menu WHERE name LIKE ? AND category IN (${selectedCategories.map(() => '?').join(',')})`;
      params = [`%${searchQuery}%`, ...selectedCategories];
    } else {
      query = `SELECT * FROM menu WHERE name LIKE ?`;
      params = [`%${searchQuery}%`];
    }
    db.transaction(tx => {
      tx.executeSql(query, params, (_, { rows: { _array } }) => resolve(_array), (_, error) => reject(error));
    });
  });
}



export { setupDatabaseAsync, insertItems, getItems };
