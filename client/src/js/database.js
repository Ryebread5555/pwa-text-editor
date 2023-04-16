import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { console.log('PUT to database');

// create connection to database
const jateDb = await openDB('jate', 1);

// create new transaction and specify database
const tx = jateDb.transaction('jate', 'readwrite');

// open object store
const store = tx.objectStore('jate');

// use put() to update data
const request = store.put({ id: 1, value: content });

// confirmation request
const result = await request;
console.log('data has been saved to the database!', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { console.log('GET from database');

// create connection to the database
const jateDb = await openDB('jate', 1);

// create new connection and specifiy database
const tx = jateDb.transaction('jate', 'readonly');

// open object store
const store = tx.objectStore('jate');

// use get() to get text editor entry from database
const request = store.get(1);

// get confirmation of request
const result = await request;
// return text editor entry
result
        ? console.log('Data has been retrieved from the database', result.value)
        : console.log('No data was found in the database!');
return result?.value;

};

initdb();
