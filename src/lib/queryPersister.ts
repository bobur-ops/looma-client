import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { del, get, set } from "idb-keyval";

export const indexedDbPersister = createAsyncStoragePersister({
  storage: {
    getItem: get,
    setItem: set,
    removeItem: del,
  },
});
