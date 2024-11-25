import { useEffect, useState, useCallback } from "react";

/**
 * This function will open the database and return the IDBDatabase object.
 * If the store doesn't exist, it will create it.
 *
 * It is harcoded to only use one store without indices.
 *
 * In a production application, it is recommended to use a library like
 * Dexie.js to handle IndexedDB operations instead.
 */
const openDatabase = async (DBName: string, storeName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DBName, 3);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * This function performs a transaction in IndexedDB. It handles the opening,
 * the transaction and the store, and returns the result of the operation.
 *
 * Examples of usage:
 *
 *   const allData = await performTransaction((store) => store.getAll());
 *   const data = await performTransaction((store) => store.get(id));
 *   await performTransaction((store) => store.put(item), "readwrite");
 *   await performTransaction((store) => store.delete(id), "readwrite");
 */
const performTransaction = async <R>(
  DBName: string,
  storeName: string,
  callback: (store: IDBObjectStore) => IDBRequest<R>,
  mode: IDBTransactionMode = "readonly"
): Promise<R> => {
  const db = await openDatabase(DBName, storeName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = callback(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * This hook will allow us to interact with an IndexedDB database.
 * It receives the name of the database and the store to interact with.
 * It returns an object with the full data, plus a method to update it,
 * and methods to add, update and delete items from the store.
 *
 * For simplicity, we are using a single database with a singel store here.
 * If more stores are necessary, this method needs to be refactored.
 * Alternatively, it is possible to use multiple databases, but this is an
 * anti-pattern, and should be avoided in production.
 *
 * @param {string} DBName Name of the IndexedDB database
 * @param {string} storeName Name of the IndexedDB store
 * @returns Object with data, plus functions: reload, add, update and destroy
 */
const useIndexedDb = <T>(DBName: string, storeName: string) => {
  const [data, setData] = useState<T[]>([]);

  const reload = useCallback(async () => {
    const allData = await performTransaction<T[]>(DBName, storeName, (store) => store.getAll());
    setData(allData);
  }, [DBName, storeName]);

  const add = useCallback(
    async (item: T) => {
      await performTransaction(DBName, storeName, (store) => store.put(item), "readwrite");
      reload();
    },
    [DBName, storeName, reload]
  );

  const destroy = useCallback(
    async (id: string) => {
      await performTransaction(DBName, storeName, (store) => store.delete(id), "readwrite");
      reload();
    },
    [DBName, storeName, reload]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, reload, add, destroy };
};

export default useIndexedDb;
