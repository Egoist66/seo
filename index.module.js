let db;
let dbReq = indexedDB.open('myDB', 1);

const addStickyNote = (db, message) => {
     // Запустим транзакцию базы данных и получите хранилище объектов Notes
     let tx = db.transaction(['notes'], 'readwrite');
     let store = tx.objectStore('notes');
   
     // Добаляем заметку в хранилище объектов
     let note = {text: message, timestamp: Date.now()};
     store.add(note);
   
     // Ожидаем завершения транзакции базы данных
     tx.oncomplete = () => {
       console.log('stored note!')
     }
     tx.onerror = (event) => {
       alert('error storing note ' + event.target.errorCode);
     }
   }

dbReq.onupgradeneeded = (event) => {
  // Зададим переменной db ссылку на базу данных
  db = event.target.result;

  // Создадим хранилище объектов с именем notes.
  let notes = db.createObjectStore('notes', {autoIncrement: true});
}
dbReq.onsuccess = (event) => {
     db = event.target.result;
   
     addStickyNote(db, 'Hello world first time!');
     addStickyNote(db, 'Hello world second time!');
     addStickyNote(db, 'Hello world third time!');
     addStickyNote(db, 'Hello world third time!');

}

dbReq.onerror = (event) => {
  alert('error opening database ' + event.target.errorCode);
}

