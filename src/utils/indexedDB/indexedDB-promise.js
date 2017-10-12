/**
 * indexedDB的封装
 */
var localDatabase = {};
localDatabase.indexedDB =  window.indexedDB || window.mozIndexedDB  || window.webkitIndexedDB  || window.msIndexedDB;

export default {
	initIndexedDB (dbName, successCallBack) {
		var openRequest = localDatabase.indexedDB.open(dbName);

	   openRequest.onerror = function(e) {
	      console.log("Database error: " + e.target.errorCode);
	   };
	   openRequest.onsuccess = function(event) {
	      console.log("Database created");
	      localDatabase.db = openRequest.result;
	      successCallBack.call();
	   };
	   openRequest.onupgradeneeded = function (evt) {
	     	var db = event.target.result;

		    db.onerror = function(event) {
		      console.log('Error loading database.');
		    };

		    // Create an objectStore for this database

		    var objectStore = db.createObjectStore(dbName, {keyPath:'id'});

		    // define what data items the objectStore will contain
		    objectStore.createIndex("title", "title", { unique: false });
		    objectStore.createIndex("content", "content", { unique: false });
		    objectStore.createIndex("time", "time", { unique: false });

		    console.log('Object store created.');
	   };
	},
	getList (dbName) {
		var objectStore = localDatabase.db.transaction(dbName).objectStore(dbName),
			list = [];
	    objectStore.openCursor().onsuccess = function(event){
	    	var cursor = event.target.result;
	        // if there is still another cursor to go, keep runing this code
	        if(cursor) {
	          list.push(cursor.value)

	          // continue on to the next item in the cursor
	          cursor.continue();

	        // if there are no more cursor items to iterate through, say so, and exit the function
	        } else {
	          console.log('Entries all displayed.');
	        }
	    }
	    return list
	},
	createList (dbName, newList, successCallBack) {
		var transaction = localDatabase.db.transaction([dbName], "readwrite");

      // report on the success of opening the transaction
      transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');

        // update the display of data to show the newly added item, by running displayData() again.
        successCallBack.call();
      };

      transaction.onerror = function() {
        console.log('Transaction not opened due to error: ' + transaction.error);
      };

      // call an object store that's already been added to the database
      var objectStore = transaction.objectStore(dbName);

      // add our newItem object to the object store
      newList.id = String(newList.id || new Date().getTime());
      newList.time = new Date().getTime();
      var objectStoreRequest = objectStore.add(newList);
        objectStoreRequest.onsuccess = function(event) {
        	// report the success of our new item going into the database
          	console.log('New item added to database.')
        };
	},
	updateList (dbName, newList, successCallBack) {
		var transaction = localDatabase.db.transaction([dbName], "readwrite");

	      // report on the success of opening the transaction
	      transaction.oncomplete = function() {
	        console.log('Transaction completed: database modification finished.');

	        // update the display of data to show the newly added item, by running displayData() again.
	        successCallBack.call();
	      };

	      transaction.onerror = function() {
	        console.log('Transaction not opened due to error: ' + transaction.error);
	      };

      // call an object store that's already been added to the database
      	var objectStore = transaction.objectStore(dbName);

      	newList.time = new Date().getTime();

		var updateTitleRequest = objectStore.put(newList);

		  // Log the transaction that originated this request
		  console.log("The transaction that originated this request is " + updateTitleRequest.transaction);

		  // When this new request succeeds, run the displayData() function again to update the display
		  updateTitleRequest.onsuccess = function() {
		    console.log('update success');
		  };
	},
	get (dbName, id, successCallBack) {
		var response = null;
		var transaction = localDatabase.db.transaction([dbName], "readwrite");

	      // report on the success of opening the transaction
	      transaction.oncomplete = function() {
	        console.log('Transaction completed: database modification finished.');

	        // update the display of data to show the newly added item, by running displayData() again.
	        successCallBack.call(null, response);
	      };

	      transaction.onerror = function() {
	        console.log('Transaction not opened due to error: ' + transaction.error);
	      };

      	// call an object store that's already been added to the database
      	var objectStore = transaction.objectStore(dbName);
      	var objectStoreGetRequest = objectStore.get(String(id));
      	objectStoreGetRequest.onsuccess = function(e) {
      		 // Grab the data object returned as the result
      		 console.log('get success')
  			response = e.target.result;
      	}
	},
	deleteList (dbName, id,successCallBack) {
		var response = null;
		var transaction = localDatabase.db.transaction([dbName], "readwrite");

	      // report on the success of opening the transaction
	      transaction.oncomplete = function() {
	        console.log('Transaction completed: database delete finished.');

	        // update the display of data to show the newly added item, by running displayData() again.
	        successCallBack.call();
	      };

	      transaction.onerror = function() {
	        console.log('Transaction not opened due to error: ' + transaction.error);
	      };

      	// call an object store that's already been added to the database
      	var objectStore = transaction.objectStore(dbName);
      	var objectStoreGetRequest = objectStore.delete(String(id));
      	objectStoreGetRequest.onsuccess = function(e) {
      		 // Grab the data object returned as the result
      		 console.log('delete success')
      	}

	},
	deleteDatabase (dbName, successCallBack) {
	   var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);
	   deleteDbRequest.onsuccess = function (event) {
	      // database deleted successfully
	      successCallBack.call();
	      console.log('Database delete success')
	   };
	   deleteDbRequest.onerror = function (e) {
	      console.log("Database error: " + e.target.errorCode);
	   };
	}
}
