
			onmessage=function(e){




						

						};

			createNewIndexedDatabase(e){
				//gridName, subStore, version, indicies, data
				var gridName=e.data.gridName;
				var version=e.data.verion;
				var indicies=e.data.indicies;
				var data=e.data.data;
				var substore=(e.data.subStore)?e.data.subStore:"cell";
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
			             },false);

		self.addEventlistener('getIndex', function(e){
				console.log(e.data); var request=indexedDB.open("indexOfDatabases", 1);	
				request.onerror = (ev)=>{ 
			        console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time.");e.stopPropogation();
			                  };
			        request.onsuccess = function(event){
                      var db = event.target.result;
            			var transaction = db.transaction("index", "readonly");
                      var objectStore = transaction.objectStore("index");
              	        query = objectStore.getAll();
              			query.onsuccess = function(queryEvent){
                     			var index = queryEvent.target.result;
                     			self.postMessage("gotIndex", index);
								};
							};
						});
			                

				// updateObjectStoreWithNewObjects(name, version,replacementArray){
			 //      	var request=indexedDB.open(name, version);
			 //      	request.onerror = (e)=>{
			 //                  console.log("Unable to retrieve data from database. We have stopped propogation of events, but will attempt again to access the newest version of the requested database!");
			 //                  e.stopPropogation();
			 //                  var request=indexedDB.open(name, undefined);
			 //                  request.onerror = (ev)=>{ 
			 //                          console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time.");e.stopPropogation();
			 //                  };
			 //                  request.onsuccess =(event)=>{
			 //                          var db = event.target.result;
			 //                          var transaction = db.transaction("cell", "readwrite");
			 //                          var objectStore = transaction.objectStore("cell");
			 //                          replacementArray.forEach(function(ref){
			 //                                  objectStore.put(ref);
			 //                            });
			 //                          console.log("SUCCESS!!");
			 //                  };
			 //              };//end request on error closure
			 //        request.onsuccess =(event)=>{
			 //            var db = event.target.result;
			 //            var transaction = db.transaction("cell", "readwrite");
			 //            var objectStore = transaction.objectStore("cell");
			 //            replacementArray.forEach(function(ref){
			 //                    objectStore.put(ref);
			 //              });
			 //            console.log("SUCCESS!! FIRST TRY!!");
			 //        };
			 //    },


			    self.addEventListener('message',function(e){var names=e.data.names;   
			        console.log("CALL ME CALL ME CALL ME");
			        if(Array.isArray(names)){ names.forEach(function(name){
			        				indexedDB.deleteDatabase(name);
			        		});
			        			self.postMessage('yourdirtyworkisdone');
			      		}
			      	else{indexedDB.deleteDatabase(names);}
			      });







