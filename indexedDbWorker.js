importScripts("bower_components/firebase/firebase.js");

						

	class ArrayManager{
				constructor(){
					this.fb = null;
					this.initialized = false;
					this.request = null;
					this.calls=null;
					this.args=null;
					this.cells=null;
					// this.dataProperties={};
					// this.extraProperties();
					// this.dataProperties
				}
			
				initialize()
				{
					 this.calls = new Firebase("https://focused0ne.firebaseio.com/inquiries");
					 this.initialized = true;
					
				}
				ping(argRequest)
				{
					console.log("Data Manager Worker received ping");
					console.log("Data Manager Worker ping arg = " + argRequest.data.datum);
					argRequest.data.data = "pinged";
					argRequest.data.status = "complete";
				}
				pong(argRequest)
				{
					console.log("Data Manager Worker received pong");
						console.log("Data Manager Worker pong arg = " + argRequest.data.datum);
					argRequest.data.data = "ponged";
					argRequest.data.status = "complete";
				}
				setDatabaseInitialIndex(){}
				getAllProfiles(argRequest)
				{
					console.log("Data Manager Worker received getAllCalls Request");
					this.request = argRequest;
					console.log(argRequest, argRequest.data);
					var keys=Object.keys(argRequest.data);
					var obj={};
					var holderObject=keys.reduce((object, key, i, arr)=>{
								object[key]="--";
								console.log(object);
								return object;
									}, {});
					console.log(holderObject);
					var lk=Object.keys(holderObject);
					this.calls.once("value", (snap)=>{

						var callRecords=snap.val();
						var keys=Object.keys(callRecords);
						console.log(callRecords[keys[0]]); 
						var profiles={};
						var profilesHolder=keys.reduce((profiles, key, i)=>{
							var ak={};
								ak=Object.assign(ak,callRecords[key].fcProfile, holderObject);
							if(callRecords[key].fcid!=undefined&&profiles[callRecords[key].fcid]==undefined)
							{   
								profiles[callRecords[key].fcid]=ak;
								profiles[callRecords[key].fcid].messageList=[];
							}
							if((profiles[callRecords[key].fcid].parent2FirstName=="" && ak.parent2FirstName!="") || (profiles[callRecords[key].fcid].addressLine1=="" &&ak.addressLine1)){
								profiles[callRecords[key].fcid]=ak;
								profiles[callRecords[key].fcid].messageList=[];
								
							}
							if(profiles[callRecords[key].fcid]!=undefined&&ak!=undefined){
							var message={"timestamp": callRecords[key].timestamp,  "callerFullName":callRecords[key].callerFullName, "callerRole": callRecords[key].callerRole, "callerMessage": callRecords[key].callerMessage, "isClosed": callRecords[key].isClosed, "intakeFcid": callRecords[key].intakeFcid, "messageNumber": i};
								message=JSON.stringify(message);
								profiles[callRecords[key].fcid].messageList.push(message);
										
									
							return profiles;
							}
							else { return profiles;}
								},profiles);
						console.log(profilesHolder, argRequest, argRequest.data);
						
						console.log("I am in the worker and getting the data from the data base!!!! Yeee Hah!!!!");
						var keys=Object.keys(profilesHolder);
						var profilesArray=keys.map((key)=>{
												var messageList=profilesHolder[key].messageList;
												var messageList=messageList;
													profilesHolder[key].messageList=null;
													// var string=JSON.stringify(profilesHolder[key]);
													//console.log(string);
													return [profilesHolder[key], messageList];
						 				});console.log(profilesArray)
						// var profilesHolderString=JSON.stringify(profilesHolder.toString());
						// console.log(profilesHolderString);
						profilesArray.forEach((miniArray)=>{
						self.postMessage(["here are the basic profiles from messages", miniArray[0],miniArray[1]]);
							});
						var profilePropertyKeys=Object.keys(profilesArray[0][0]);
						var ooppa=profilePropertyKeys.reduce((object, key)=>{
							object[key]=[];
							return object;
						}, {});


						var filledOoppa=profilesArray.reduce((ooppa, miniArray)=>{
							 var profile=miniArray[0];
							 profilePropertyKeys.forEach((key)=>{
							 	//console.log(profile, ooppa);
							 	if(profile&&profile[key]&&profile.fcid){
							 	ooppa[key].push({"fcid":profile.fcid, "property": key, "value": profile[key]});}
							 		});
							 console.log(ooppa);
							 return ooppa;
						}, ooppa);
						//console.log(filledOoppa);
						//self.postMessage(["searchKeys", filledOoppa]);
						var profilesArr=profilesArray.map((miniArr)=>{
							miniArr[0].messages=miniArr[1];
							return miniArr[0];});
						var datum=profilesArray.reduce((pre,miniArr)=>{var min=miniArr[1];min.fcid_=(min.fcid)+"_"; console.log(min);pre=pre.concat(min);
							return pre;},[]).sort((a,b)=>{return (a.timestamp-b.timestamp);});
						
						console.log("53");
						var e={};
						e.data={
							dbName:"callCenter",
							storeName:"profilesAndMessages",
							version:2,
							indicies:["studentFirstName", "studentLastName", "parent1FirstName", "parent1LastName", "parent2FirstName", "parent2LastName", "course", "coach"],
							key:"fcid",
							data:profilesArr};
						var d={};
						d.data={
							dbName:"callCenter",
							storeName:"allMessages",
							version:4,
							indicies:["callerRole", "callerType", "messageNumber", "isClosed", "timestamp","callerFullName", "fcid", "relatedStudent"],
							data: datum, 
							bitVal: true
							
			
						};
						// setTimeout(()=>{this.createIndexedDb(e);},3);

						setTimeout(()=>{this.createIndexedDb(d);},3);	
					});

				}
				createIndexedDb(e){
					console.log(e);
					var dbName=e.data.dbName;
					var version=e.data.version;
					var indicies=e.data.indicies;
					var data=e.data.data;
					var storeName=e.data.storeName;
					var key=e.data.key;
					var bitVal=(e.data.bitVal)?e.data.bitVal: false

			       	var request = indexedDB.open(dbName, version);
            		console.log(dbName, version, data, "db");
              
            		request.onerror = function(event){
                		console.log(dbName, version, data, "db error");
              			};
            		request.onupgradeneeded = (event)=>{
                		var db = event.target.result;
                		console.log("we are creating it");
                		var objectStore = db.createObjectStore([storeName], { keyPath: key, autoIncrement:bitVal});
                		console.log("created store");
                		objectStore.createIndex([key], [key], {unique: true });
                		if(Array.isArray(indicies)){
                		indicies.forEach(function(elem,index){
                			if(elem.match(key))
                			{

                			}
   							else{
   								objectStore.createIndex([elem], [elem], {unique: false });}
                							});
                			}
                			console.log("completed the indicies");
                		if(Array.isArray(data)){
                    		data.forEach(function(data,i,a){
                    			// var keys=Object.keys(profile);
                    			// keys.forEach
                          			objectStore.put(data);
          
                 			 });
                    	  self.postMessage({returnMessage: "build", name: dbName, storeName: storeName, indicies: indicies, key: key, data: data});
                    	}
                    else{
                    	objectStore.put(data);
                            self.postMessage({returnMessage: "build", name: dbName, storeName: storeName, indicies: indicies, key: key, data: data});
                		}//end on upgradeneeded
         		

         	};//onsuccess
         }
         		deleteDatabase(names){
         			 console.log("CALL deleteDatabase");
								if(Array.isArray(names))
								{
									names.forEach((name)=>{
													indexedDB.deleteDatabase(name);
												});
									self.postMessage(['yourdirtyworkisdone on databases', names]);
								}
								else{indexedDB.deleteDatabase(names);}
				}

				getDatabase(args){
						var dbName=args.dbName;
						var storeName=args.storeName;
						var version=args.version;
						console.log(dbName, storeName, version);
					 var request = indexedDB.open(dbName,version);
					 var query;
            		
            		request.onerror = (event)=>{
                		console.log(dbName, version, "db error");
                		request=indexedDB.open(dbName, storeName, undefined);
                		request.onerror=(ev2)=>{
                			console.log("second fail review data and try again after adjusting code");
                		};
                		request.onsuccess=(e)=>{  
                			console.log("success");
                			var db = event.target.result;
                			var transaction = db.transaction([storeName], "readonly");
                			var objectStore = transaction.objectStore([storeName]);
                			query = objectStore.getAll();
                
                			query.onerror=(quev)=>{
                    			console.log("After initially opening the database, we have failed to query the object store.  Please try again later");
                			};
                			query.onsuccess =(queryEvent)=>{
                  				// if(asGrid===true){
                   					var cells = queryEvent.target.result;
                   					console.log(cells);
                   					this.cells=cells;
                   					self.postMessage({returnMessage: "databaseReturn", dbName: dbName, data: cells, version: version, storeName: storeName});
                			};
            			};
         	 		};
         	 		request.onsuccess=(e)=>{  
            			console.log("success");
            			var db = e.target.result;
            			console.log(dbName, version, storeName);
            			var transaction = db.transaction([storeName], "readonly");
            			var objectStore = transaction.objectStore([storeName]);
            			query = objectStore.getAll();
            
            			query.onerror=(quev)=>{
                			console.log("After initially opening the database, we have failed to query the object store.  Please try again later");
            			};
            			query.onsuccess =(queryEvent)=>{
              				
               					var cells = queryEvent.target.result;
               					console.log(cells);
                   					self.postMessage(["databaseReturn", cells]);
            			};
        			};	          
				}
				getIndex(){
					this.getDatabase("Index", "Index", 1);
				}
				addObjectToObjectStore(dbName, storeName, version,indicies,data, key, context){
			      	var request=indexedDB.open(dbName, version);
			      	request.onerror = (e)=>{
			                  console.log("Unable to retrieve data from database. We have stopped propogation of events, but will attempt again to access the newest version of the requested database!");
			                  e.stopPropogation();
			                  var request=indexedDB.open(dbName, undefined);
			                  request.onerror = (ev)=>{ 
			                          console.log("This is the second failed ATTEMPT.  As a result a new database with the specified database and substore names and versions will be created at this time.");
			                         var e={}
			                         // e.data={"dbName":dbName,"storeName": storeName,"version":1,"indicies": indicies,"data": ref,"key": fcid};
			                         //  upgradeIndexedDb(e);
			                          e.stopPropogation();
			                  };
			                  request.onsuccess =(event)=>{
			                          var db = event.target.result;
			                          var transaction = db.transaction([storeName], "readwrite");
			                          var objectStore = transaction.objectStore([storeName]);
			                            objectStore.put(ref);
			                          console.log("SUCCESS!!");
			                  };
			              };//end request on error closure
			        request.onsuccess =(event)=>{
			            var db = event.target.result;
			            var transaction = db.transaction([storeName], "readwrite");
			            var objectStore = transaction.objectStore([storeName]);
			                    objectStore.put(ref);
			            console.log("SUCCESS!! FIRST TRY!!");
			        };
			    }
				constructAndRecordInquiry(args){
					this.deleteDatabase("object Object");
					var data=args.data;
					var propertyNames=args.propertyNames;
					var d=new Date().getTime();
					var messageObject={"intakeFcid":"ZirkelJoseph00001","callerMessage":"Hi, how are you, new messahe coming shortly","callerExpectedFollowUp":"call&signUp within 48hours","inquiryNumber":7,"isClosed": false, "api": "callCenter", "storeName": "inquiries", "timestamp":d}; 
				var inq =new FoCoInquiry(data, propertyNames,messageObject, this);
				console.log(inq);


				}
				handleEvents(argSnapshot)
				{
				// console.log("Data Manager Worker", argSnapshot.val());
				// this.request.data.data = argSnapshot.val();
				// this.request.data.status = "complete";
				// postMessage(this.request.data);
				}
			}

				var am = new ArrayManager();
							
				self.addEventListener("message", function(argRequest){ 
							if(!am.initialized)
					{
						am.initialize()
					}
					console.log("received Worker request", argRequest);
					var req = argRequest;
					if(am[req.data.requestType])
					{
					req.data.status = "received";
						//send a 'received' status unless synchronous call above completed request
						console.log(req.data, req.data.args);
					am[req.data.requestType](req.data);

					}
					else
					{
						req.data.status = "badType";
						console.log("Array Status Manager Worker does not handle " + req.data.requestType + " requests");
					}
					postMessage(req.data);
				});

class FoCoInquiry{
	constructor(arrayValues, arrayKeys,messageObject, context)
	{	
        var profilesObject={};
       var keys=arrayKeys[0];
       console.log(keys, keys[0]);
       var profiles={};
            if(Array.isArray(arrayValues)&&Array.isArray(arrayKeys)){
                     var profile=arrayValues[0].reduce((profiles, val, i, array)=>{	
                     		console.log("kiiiayyyuop", keys[i], val);
                     		var name=keys[i]; 
                     		name=name.replace(/\s/g,"");
          					name=name.charAt(0).toLowerCase()+name.slice(1);
          					name =(name.match("One"))?name.replace("One","1"):(name.match("Two"))?name.replace("Two","2"):name;
          					console.log(name);
                                   profiles[name]=val;
                                   console.log(profiles);
                                   return profiles;
                                                        },profiles);
                     var callerRole=profile.callerRole;
                     var fn=callerRole+"FirstName";
                     var ln=callerRole+"LastName";
                     console.log(profile, profile[fn], profile[ln]);
                    this.ref=null;
                    this.timestamp=profile.orderingTime;
                    this.readableTime=profile.date+"_"+profile.time;
                    this.callerFullName=profile[fn] + " " + profile[ln];
                    this.isClosed=(messageObject.isClosed)?messageObject.isClosed:(profile.callerType=="nonClient"||profile.callerRole=="clientCompetitor")?true: false;
                    this.relatedStudent=[{"fullName":profile.studentFullName, "fcid": profile.fcid}];
                    //TODO BEEF UP THE CALLER MATCHING SERVICES);
                    this.callerMessage=(messageObject&&messageObject.callerMessage)?messageObject.callerInterest: "No Message";
                    this.callerInterest=(messageObject&&messageObject.callerInterest)?messageObject.callerInterest:(profile.callerType=="newClient"||profile.callerType=="repeatCaller")?"Focused1600Course":(profile.callerType==="activeClient" || profile.callerType==="inactiveClient")?"FocusedStudyGroup":"Focused1600Course";//this will have to be beefed up
                    this.focusedProgramMatch=this.callerInterest; //see TODO ABOVE
                    this.callerExpectedFollowUp=(messageObject&&messageObject.callerExpectedFollowUp)?messageObject.callerExpectedFollowUp:this.timestamp; 
                    //TODO fix the end of the line above, it will break now;
                    this.intakeFcid=(messageObject&&messageObject.intakeId)?messageObject.intakeId:self.user;
                    this.fcid=profile.fcid;

                    this.callerRole=profile.callerRole;
                    this.callerType=profile.callerType;
                    var inqNumber=this.getFcidPastInquiryNumber(profile.fcid);
		            this.inquiryNumber =(parseInt(inqNumber)==NaN)?1:inqNumber+1;
                    //this.saveInquiry();
                    console.log(this);
                    this.saveInquiryLocal("callCenter", "MessageDetails",2,profile.indicies, this, this.fcid, context);
                    //this.displayInquiries();
                }
       }
	 
    getFcidPastInquiryNumber(fcid){}
    saveInquiryLocal(dbName,storeName,version,indicies,data,key,context){
    	//context.addObjectToObjectStore(dbName, storeName, version, indicies, data,key, context);
    	var e={};

    	e.data={"dbName":dbName,"storeName": "callLog","version":1,"indicies": indicies,"data": this,"key": "timestamp"};
			                          var testValue=context.getIndex();
			                        var initialize= (testValue===true)?true:false; 
										      if(initialize===true){context.createIndexedDb(e);}
										      else{ context.addObjectToObjectStore(dbName, storeName, 1,indicies,this, fcid, context);
										      		context.createIndexedDb(e);
										      	 }
    	//window.FCBehaviors.FocusedDataManagerBehaviorImpl.mapValuesFromIndexedDb("callCenterExtendedProfilesAndMessages", data, arraysVal);
    }
	saveInquiry(ref){
		var inq = ref.child("inquiries");
		var key1= -(new Date(this.timeStamp).getTime()) + "_" + this.fcid;
		var savObject ={};
		savObject[key1]=this;
		inq.update(savObject);
		var student = ref.child("students/" + this.fcid + "/inquiries");
		student.update(savObject);
	}
    displayInquiries(){}
}

				
							// 	handleEvents(argSnapshot)
							// 	{
							// 		console.log("Data Manager Worker", argSnapshot.val());
							// 		this.request.data.data = argSnapshot.val();
							// 		this.request.data.status = "complete";
							// 		postMessage(this.request.data);
							// 	}
							// }

							// var gm = new GridManager();
								
							// self.addEventListener("message", function(argRequest){ 
							// 	if(!gm.initialized)
							// 	{
							// 		gm.initialize()
							// 	}
							// 	console.log("received Worker request", argRequest);
							// 	var req = argRequest;
							// 	if(gm[req.data.requestType])
							// 	{
							// 		req.data.status = "received";
							// 		//send a 'received' status unless synchronous call above completed request
							// 		gm[req.data.requestType](req);
							// 	}
							// 	else
							// 	{
							// 		req.data.status = "badType";
							// 		console.log("Data Manager Worker does not handle " + req.data.requestType + " requests");
							// 	}
							// 	postMessage(req.data);
							// });




								// 											onmessage=function(e){ 
								// 											console.log(e); var datum=e.data.datum; console.log(datum);
																				
								// 												console.log(datum,e.data.operation);
								// 												var func=e.data.operation;
								// 												self.data=datum;
								// 												dat=datum;
								// 											self[func](datum);
								// 											}.bind(self);
																				
								// 											replaceArrays=(e)=>{
								// 												console.log(self.data, e);
								// 												var request=indexedDB.open("indexOfDatabases", undefined);
								// 												request.onerror=(errorev)=>{console.log(errorev);}
								// 												request.onsuccess=(e)=>{var db=event.target.result;
								// 												var transaction=db.transaction("fcapinames",readwrite);
								// 												var objectStore=transaction.objectStore("fcapinames");


								// 											};
								// 											};

								// 		addExistenceToIndex=(e)=>{};
	

							// getUpdatedObjectStores=(nameArray, context, isInit, index, changeArray)=>{
							 //      					var newArray=this.sortTheNameArray(nameArray);
								// 			        for(i=0;i<newArray.length;i++){
											            
								// 			            var gridName=newArray[i][0];
											         
								// 			            var cell1;
								// 			            var arrayName=gridName;
								// 			            var version=newArray[i][1];
								// 			            if(newArray[i][0]==="class20" || newArray[i][0]==="class" ||newArray[i][0]==="ACalendar2" || newArray[i][0]==="class22"|| newArray[i][0]==="JasonTest"){version=3;}
								// 			            var request = indexedDB.open(gridName, version);//"gridMap"
								// 			            var query;
											              
								// 			          request.onerror = function(e){
								// 			                          console.log("Unable to retrieve data from database!");
								// 			                        };
								// 			          request.onsuccess = function(event){
								// 			                      var db = event.target.result;
								// 			            var transaction = db.transaction("cell", "readonly");
								// 			                      var objectStore = transaction.objectStore("cell");
								// 			                      query = objectStore.getAll();
								// 			              query.onsuccess = function(queryEvent){
								// 			                     cell1 = queryEvent.target.result;
											 
								// 			                      var arrayToMutate=context.dataArrays[index];
								// 			                      var time=new Date().getTime();
								// 			                      console.log(context.arrayIndex, index);
								// 			                      var keys=cell1[0].id.split("_");
								// 			                      var arrayName=keys[0];
								// 			                      var id="id";
								// 			                      var selector="[id^="+arrayName+"]";
											                  
								// 			                        var counter =cell1.length;
								// 			                        var p=0;
								// 			                        for(p=0;p<counter;p++)
								// 			                        {
								// 			                          var val=cell1[p];
								// 			                          var keys=val.id.split("_");
								// 			                          var col=parseInt(keys[1]);
								// 			                          var row=parseInt(keys[2]);
								// 			                          context.splice(["dataArrays", index,col], row, 1, val);
								// 			                          context.splice(["selectedArraySet", col], row, 1, val);
								// 			                        }
								// 			                      var secondTime=new Date().getTime();
								// 			                      var delta=((secondTime-time)/1000);
								// 			                      console.log(time, secondTime, delta, "here are your times for notifying");
								// 			                  }.bind(context);
								// 			                }.bind(context);
											           
								// 			              }//for loop
								// 			              return context.dataArrays;
								// 			          },


									    

								// 									getIndexAtInit=(e)=>{
								// 										console.log(e.data, self.datum, self.data); 
								// 										var indexData=self.data.indexOfDatabases;
								// 										console.log(indexData);
								// 										var request=indexedDB.open("indexOfDatabases", 4);	
								// 											request.onerror = (ev)=>{ 
								// 										        console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time. we will be initializing a new Index.");
								// 										                  };
								// 										                  var arr=[];

								// 									         		 request.onupgradeneeded =(event)=>{
								// 									         		 	 var db = event.target.result;
								// 										                 var count=indexData.length;
								// 										                 for(var i=0;i<count;i++){
								// 										                 	var object=indexData[i];
								// 										                var db = event.target.result;
								// 										                    var objectStore = db.createObjectStore(object.apiName,{ keyPath: "key" });
								// 										                    objectStore.createIndex(["key"], ["key"], {unique: true });
								// 										                    console.log(object, event);
								// 										                  // var  object.indicies.forEach(function(index){
								// 										                  //   	console.log(index);
								// 										                    	 // objectStore.createIndex([index],{unique:false});
																		                    	 

								// 										                  var cell={"apiName":object.apiName, "indicies":object.indicies, "changeRecord":object.changeRecord, "key":object.key, "columns":object.columns, "name": object.name, "rows":object.rows,"time": object.time, "version": object.version, "storeName": object.storeName};
								// 										    	                   objectStore.put(cell);
								// 										                      arr.push(cell);
								// 										                      console.log(object);console.log( cell);console.log( "monkies");
								// 										                      var val=object.value;
								// 										                      var dataStream=object.dataStream;
								// 										                      self.createApiDatabases(cell, val, dataStream);
																		    
								// 										                       // self.postMessage({"indexForGrids": arr});
																		    				
								// 										                    request.oncomplete = function() {
								// 										                      console.log(substore +"created and saved", objectStore + " with name " + gridName);

								// 										                        self.postMessage({"indexForGrids": arr});
								// 										                      //console.log("db updated");
								// 										                    }.bind(self);
								// 									         			}
								// 												};
								// 											};


								// 					self.createApiDatabases=(cell,value, dataStream, issvalue)=>{
								// 						var request=indexedDB.open(cell.apiName, 1);	
								// 							request.onerror = (ev)=>{ 
								// 								        console.log("This is the second failed ATTEMPT.  NO MORE 	ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time. we will be initializing a new Index.");
								// 						            };
								// 						      request.onupgradeneeded =(event)=>{
								// 						            var db = event.target.result;
								// 						            var objectStore = db.createObjectStore(cell.storeName,{ keyPath: "key" });
								// 						            objectStore.createIndex(["key"], ["key"], {unique: true });
								// 						            cell.indicies.forEach(function(index){
								// 						            	objectStore.createIndex([index], [index], {unique: false});
								// 						            });
								// 						  			cell.dataStream.forEach(function(cell){
								// 						  				objectStore.put(cell);
								// 						  			});
								// 							};
								// 						};

								// 					 getIndex=(e)=>{

								// 						var request=indexedDB.open("indexOfDatabases", 4);

								// 							request.onerror=(ev)=>{console.log("There was an error in your attempt to load your local databases.  You may have cleared your browser history and will therefore have to wait for a server load; or your version may merely be out of synch; we will attempt now to recapture your data if your version control was merely out of synch;  After we have recovered your data you will be instructed as to how you can remedy this problem tyhrough the focused coaching db interface!");e.stopPropogation();

								// 						                  var request=indexedDB.open("indexOfDatabases", undefined);
								// 						      request.onsuccess =(event)=>{
								// 						                          var db = event.target.result;
								// 						                          var transaction = db.transaction("fcapinames", "readonly");
								// 						                          var objectStore = transaction.objectStore("fcapinames");
								// 						                      var allIndex= objectStore.getAll();
								// 						                      var arrayOfFourForBack=allIndex.result.map(function(item, index){var object= {"key":item.key, "apiName": item.apiName, "dataStream": item.dataStream, "valuesInColumns": item.value};
								// 						                     return object; });
								// 						                      self.postMessage(arrayOfFourBack);
								// 						                          console.log("SUCCESS!!");
								// 						                  };
								// 						              };//end request on error closure
								// 						        request.onsuccess =(event)=>{
								// 						            var db = event.target.result;
								// 						            var transaction = db.transaction("fcapinames", "readwrite");
								// 						            var objectStore = transaction.objectStore("fcapinames");
														                   	 
								// 						                   var   query = objectStore.getAll();
								// 					              		query.onsuccess = function(queryEvent){
								// 					                   var cell1 = queryEvent.target.result;
								// 						              	var arrayOfFourForBack=cell1.map(function(item, index){var object= {"key":item.key, "apiName":      item.apiName, "dataStream": item.dataStream, "valuesInColumns": item.value};
								// 						                     return object; });
								// 						              	self.postMessage(arrayOfFourForBack);
								// 						                          console.log("SUCCESS!!");

								// 						            console.log("SUCCESS!! FIRST TRY!!");
								// 						            console.log(arrayOfFourForBack);
								// 						        };
								// 						    };
								// 						   }
														              
													       
								// 					self.deleteObjectStore=(names)=>{   
								// 						        console.log("CALL ME CALL ME CALL ME");
								// 						        if(Array.isArray(names)){ names.forEach(function(name){
								// 						        				indexedDB.deleteDatabase(name);
								// 						        		});
								// 						        			self.postMessage('yourdirtyworkisdone');
								// 						      		}
								// 						      	else{indexedDB.deleteDatabase(names);}
								// 						      };




								// 	self.updateObjectStoreWithNewObjects=(name, version,replacementArray)=>{
								// 						      	var request=indexedDB.open(name, version);
								// 						      	request.onerror = (e)=>{
								// 						                  console.log("Unable to retrieve data from database. We have stopped propogation of events, but will attempt again to access the newest version of the requested database!");
								// 						                  e.stopPropogation();
								// 						                  var request=indexedDB.open(name, undefined);
								// 						                  request.onerror = (ev)=>{ 
								// 						                          console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time.");e.stopPropogation();
								// 						                  };
								// 						                  request.onsuccess =(event)=>{
								// 						                          var db = event.target.result;
								// 						                          var transaction = db.transaction("cell", "readwrite");
								// 						                          var objectStore = transaction.objectStore("cell");
								// 						                          replacementArray.forEach(function(ref){
								// 						                                  objectStore.put(ref);
								// 						                            });
								// 						                          console.log("SUCCESS!!");
								// 						                  };
								// 						              };//end request on error closure
								// 						        request.onsuccess =(event)=>{
								// 						            var db = event.target.result;
								// 						            var transaction = db.transaction("cell", "readwrite");
								// 						            var objectStore = transaction.objectStore("cell");
								// 						            replacementArray.forEach(function(ref){
								// 						                    objectStore.put(ref);
								// 						              });
								// 						            console.log("SUCCESS!! FIRST TRY!!");
								// 						        };
								// 						    };										













