let dbPromised = idb.open("serie-a", 1, upgradeDB=>{
    let clubsObjectStore = upgradeDB.createObjectStore("club",{
        keyPath: "id"
    });
    clubsObjectStore.createIndex("name", "name", {unique: false});
});

const saveClub=(club)=>{
    
    dbPromised.then(db=>{
        let tx = db.transaction("club", "readwrite");
        let store = tx.objectStore("club");
        console.log(club);
        store.put(club);
        return tx.complete;
    })
    .then(()=>{
        showNotifikasiSimpan(club)
        console.log("club disimpan.");
    })
          
}

const getAll =()=>{
    return new Promise((resolve,reject)=>{
        dbPromised
        .then(db=>{
            let tx = db.transaction("club", "readonly");
            let store = tx.objectStore("club");
            return store.getAll();
        })
        .then(clubs=>{
            resolve(clubs);
        });
    });
}

const deleteClub=(club)=>{
    dbPromised.then(db=>{
        let tx = db.transaction("club", "readwrite");
        let store = tx.objectStore("club")
        store.delete(club.id);
        return tx.complete;
    })
    .then(()=>{
        console.log("club dihapus");
    })
}