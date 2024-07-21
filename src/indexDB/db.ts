let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
let DB_NAME_ITEMS = "ITEMS_DB"

export interface Item {
    id: string;
    name: string;
    price: string;
    quantity: string;
}

export enum Stores {
    Items = 'items',
    Variant = 'variant'
}

export const deleteDB = (): Promise<String> => {
    return new Promise((resolve) => {
        var request = indexedDB.deleteDatabase(DB_NAME_ITEMS);
        request.onsuccess = function() {
            console.log("Deleted successfully")
            resolve("Deleted successfully")
        }
        request.onerror = function() {
            console.log("Error on Deletion")
            resolve("Error on Deletion")
        }
        request.onblocked = function() {
            console.log("Blocked on Deletion")
            resolve("Blocked on Deletion")
        }

    })
}

export const initDB = (): Promise<String> => {
    return new Promise((resolve) =>{
        let message = ""

        // open the connection
        request = indexedDB.open(DB_NAME_ITEMS);
        request.onupgradeneeded = () => {
            db = request.result;

            console.log("db.objectStoreNames", db.objectStoreNames)
            if(!db.objectStoreNames.contains(Stores.Items)) {
                console.log("=====> Creating items store");
                db.createObjectStore(Stores.Items, {keyPath:"id"})
                message = "Object created, "
            } else {
                message = "Object falied to create, Item "
            }

            // Variant DB
            if(!db.objectStoreNames.contains(Stores.Variant)) {
                console.log("=====> Creating items store");
                db.createObjectStore(Stores.Variant, {keyPath:"id"})
                message = "Object created, "
            } else {
                message = "Object falied to create, Variant"
            }
            resolve("Object Created !!!")
        };

        request.onsuccess = () => {
            db = request.result;
            version = db.version;
            console.log("request.onSuccess - initDB ", version);
            resolve( "DB Successfully created");
        }

        request.onerror = () => {
            resolve( "DB Creation Failed");
        }

    })
}

export const addData = <T>(storeName:string, data: T): Promise<T|string|null> => {
    return new Promise((resolve) => {
        request = indexedDB.open(DB_NAME_ITEMS, version);

        request.onsuccess = () => {
            console.log("REQUEST_ONSUCCESS_DATA", data);
            db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        }

        request.onerror = () => {
            console.log("REQUEST_ONERROR_DATA");
            const error = request.error?.message;
            if(error) {
                resolve(error)
            } else {
                resolve("Unknown Error")
            }
        }
    })
}

export const getAllData = <T>(storeName: Stores):Promise<T[]> => {
    return new Promise((resolve) => {
        request = indexedDB.open(DB_NAME_ITEMS);

        request.onsuccess = () => {
            try{
                db = request && request.result;
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const res = store.getAll();
                res.onsuccess = () => {
                    console.log("FINAL GETALL", res.result)
                    resolve(res.result)
                }
                res.onerror = () => {
                    console.log("============ ERROR ON GET ALLDATA ===========")
                }
    
            }
            catch(exception) {
                console.log("============ CaughtException: ERROR ON GET ALLDATA ===========", exception)
            }
        }

        request.onerror = () => {
            console.log("ERROR ON GET ALL DATA")
        }

    })
}


// select query on indexed db
export const getData = <T>(storeName: Stores, searchTerm: String):Promise<T[]> => {
    return new Promise((resolve) => {
        request = indexedDB.open(DB_NAME_ITEMS);
        let item = [];
        request.onsuccess = () => {
            try{
                db = request && request.result;
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const res = store.getAll();
                const cursorreq = store.openCursor();
                cursorreq.onsuccess = function(e) {
                    let cursor = (e?.target as IDBRequest).result;
                    if(cursor) {
                        if(cursor.value.name.toString().toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
                            console.log("we found it", cursor.value)
                            item.push(cursor.value as never)
                            console.log("array item final", item)
                        }
                        cursor.continue();
                    }       
                    // if(!item.length) {
                    //     resolve([]);
                    // } else {
                    //     resolve(item);    
                    // }
                }

                tx.oncomplete = (event) => {
                    console.log("TRANSAACTION COMP", item)
                    resolve(item)
                }


                // res.onsuccess = () => {
                //     resolve(res.result)
                // }
                // res.onerror = () => {
                //     console.log("============ ERROR ON GET ALLDATA ===========")
                // }
    
            }
            catch(exception) {
                console.log("============ CaughtException: ERROR ON GET ALLDATA ===========", exception)
            }
        }
        request.onerror = () => {
            console.log("ERROR ON GET ALL DATA")
        }
    })
}