

onmessage=function(e){ 
console.log(e); var datum=e.data.datum; console.log(datum);
	
	console.log(datum,e.data.operation);
	var func=e.data.operation;
	self.data=datum;
	dat=datum;
self[func](datum);
}.bind(self);
	
replaceArrays=(e)=>{
	console.log(self.data, e);
	var request=indexedDB.open("indexOfDatabases", undefined);
	request.onerror=(errorev)=>{console.log(errorev);}
	request.onsuccess=(e)=>{var db=event.target.result;
	var transaction=db.transaction("fcapinames",readwrite);
	var objectStore=transaction.objectStore("fcapinames");


};
};

newIndexedDatabase=(e)=>{
			if(!e){
		var gridName=e.data.gridName;
		var version=e.data.version;
		var indicies=e.data.indicies;
		var data=e.data.data;
		var substore=(e.data.subStore)?e.data.subStore:"cell";
	     }
	     else if(e.indexOfDatases){}
	           	var request = indexedDB.open(gridName, version);
	                console.log(gridName, version, data, "db error");
	                  
	                request.onerror = function(event){
	                    console.log(gridName, version, data, "db error");
	                  };
	                request.onupgradeneeded = function(event){
	                 
	                    var db = event.target.result;
	                    var objectStore = db.createObjectStore([substore], { keyPath: "key" });
	    
	                    objectStore.createIndex("key", "key", {unique: true });

	                    indicies.forEach(function(elem,index){
	                    	objectStore.createIndex([elem], [elem], {unique: false });
	                    });
	                    
	                        data.forEach(function(ca,i,a){
	                              objectStore.put(ca);
	              
	                      });
	                        self.postMessage('message', objectStore);
	    
	                    transaction.oncomplete = function() {
	                      console.log(substore +"created and saved", objectStore + " with name " + gridName);
	                      //console.log("db updated");
	                    };

	                    };
	             };
	    

getIndexAtInit=(e)=>{
	console.log(e.data, self.datum, self.data); 
	var indexData=self.data.indexOfDatabases;
	console.log(indexData);
	var request=indexedDB.open("indexOfDatabases", 4);	
		request.onerror = (ev)=>{ 
	        console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time. we will be initializing a new Index.");
	                  };
	                  var arr=[];

         		 request.onupgradeneeded =(event)=>{
         		 	 var db = event.target.result;
	                 var count=indexData.length;
	                 for(var i=0;i<count;i++){
	                 	var object=indexData[i];
	                var db = event.target.result;
	                    var objectStore = db.createObjectStore(object.apiName,{ keyPath: "key" });
	                    objectStore.createIndex(["key"], ["key"], {unique: true });
	                    console.log(object, event);
	                  // var  object.indicies.forEach(function(index){
	                  //   	console.log(index);
	                    	 // objectStore.createIndex([index],{unique:false});
	                  var cell={"apiName":object.apiName, "indicies":object.indicies, "changeRecord":object.changeRecord, "key":object.key, "columns":object.columns, "name": object.name, "rows":object.rows,"time": object.time, "version": object.version, "storeName": object.storeName};
	    	                   objectStore.put(cell);
	                      arr.push(cell);
	                      console.log(object);console.log( cell);console.log( "monkies");
	                      var val=object.value;
	                      var dataStream=object.dataStream;
	                      self.createApiDatabases(cell, val, dataStream);
	    
	                       // self.postMessage({"indexForGrids": arr});
	    				
	                    request.oncomplete = function() {
	                      console.log(substore +"created and saved", objectStore + " with name " + gridName);

	                        self.postMessage({"indexForGrids": arr});
	                      //console.log("db updated");
	                    }.bind(self);
         			}
			};
		};


self.createApiDatabases=(cell,value, dataStream, issvalue)=>{
	var request=indexedDB.open(cell.apiName, 1);	
		request.onerror = (ev)=>{ 
			        console.log("This is the second failed ATTEMPT.  NO MORE 	ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time. we will be initializing a new Index.");
	            };
	      request.onupgradeneeded =(event)=>{
	            var db = event.target.result;
	            var objectStore = db.createObjectStore(cell.storeName,{ keyPath: "key" });
	            objectStore.createIndex(["key"], ["key"], {unique: true });
	            cell.indicies.forEach(function(index){
	            	objectStore.createIndex([index], [index], {unique: false});
	            });
	  			cell.dataStream.forEach(function(cell){
	  				objectStore.put(cell);
	  			});
		};
	};

 getIndex=(e)=>{

	var request=indexedDB.open("indexOfDatabases", 4);

		request.onerror=(ev)=>{console.log("There was an error in your attempt to load your local databases.  You may have cleared your browser history and will therefore have to wait for a server load; or your version may merely be out of synch; we will attempt now to recapture your data if your version control was merely out of synch;  After we have recovered your data you will be instructed as to how you can remedy this problem tyhrough the focused coaching db interface!");e.stopPropogation();

	                  var request=indexedDB.open("indexOfDatabases", undefined);
	      request.onsuccess =(event)=>{
	                          var db = event.target.result;
	                          var transaction = db.transaction("fcapinames", "readonly");
	                          var objectStore = transaction.objectStore("fcapinames");
	                      var allIndex= objectStore.getAll();
	                      var arrayOfFourForBack=allIndex.result.map(function(item, index){var object= {"key":item.key, "apiName": item.apiName, "dataStream": item.dataStream, "valuesInColumns": item.value};
	                     return object; });
	                      self.postMessage(arrayOfFourBack);
	                          console.log("SUCCESS!!");
	                  };
	              };//end request on error closure
	        request.onsuccess =(event)=>{
	            var db = event.target.result;
	            var transaction = db.transaction("fcapinames", "readwrite");
	            var objectStore = transaction.objectStore("fcapinames");
	                   	 
	                   var   query = objectStore.getAll();
              		query.onsuccess = function(queryEvent){
                   var cell1 = queryEvent.target.result;
	              	var arrayOfFourForBack=cell1.map(function(item, index){var object= {"key":item.key, "apiName":      item.apiName, "dataStream": item.dataStream, "valuesInColumns": item.value};
	                     return object; });
	              	self.postMessage(arrayOfFourForBack);
	                          console.log("SUCCESS!!");

	            console.log("SUCCESS!! FIRST TRY!!");
	            console.log(arrayOfFourForBack);
	        };
	    };
	   }
	              
       
self.deleteObjectStore=(names)=>{   
	        console.log("CALL ME CALL ME CALL ME");
	        if(Array.isArray(names)){ names.forEach(function(name){
	        				indexedDB.deleteDatabase(name);
	        		});
	        			self.postMessage('yourdirtyworkisdone');
	      		}
	      	else{indexedDB.deleteDatabase(names);}
	      };




self.updateObjectStoreWithNewObjects=(name, version,replacementArray)=>{
	      	var request=indexedDB.open(name, version);
	      	request.onerror = (e)=>{
	                  console.log("Unable to retrieve data from database. We have stopped propogation of events, but will attempt again to access the newest version of the requested database!");
	                  e.stopPropogation();
	                  var request=indexedDB.open(name, undefined);
	                  request.onerror = (ev)=>{ 
	                          console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time.");e.stopPropogation();
	                  };
	                  request.onsuccess =(event)=>{
	                          var db = event.target.result;
	                          var transaction = db.transaction("cell", "readwrite");
	                          var objectStore = transaction.objectStore("cell");
	                          replacementArray.forEach(function(ref){
	                                  objectStore.put(ref);
	                            });
	                          console.log("SUCCESS!!");
	                  };
	              };//end request on error closure
	        request.onsuccess =(event)=>{
	            var db = event.target.result;
	            var transaction = db.transaction("cell", "readwrite");
	            var objectStore = transaction.objectStore("cell");
	            replacementArray.forEach(function(ref){
	                    objectStore.put(ref);
	              });
	            console.log("SUCCESS!! FIRST TRY!!");
	        };
	    };


	













