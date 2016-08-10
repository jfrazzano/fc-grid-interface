importScripts("bower_components/firebase/firebase.js");


		class ArrayManager{
				constructor(){
					this.fb = null;
					this.initialized = false;
					this.request = null;
					this.calls=null;
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
				getAllCalls(argRequest)
				{
					console.log("Data Manager Worker received getAllCalls Request");
					this.request = argRequest;
					this.calls.once("value", (snap)=>{

						var callRecords=snap.val();
						var keys=Object.keys(callRecord);
						console.log(callRecords[keys[0]]); 
						var profiles={};
						var profilesHolder=keys.reduce((pre, val, i)=>{
										pre[val.fcid]=val.fcProfile; 
										var message={"timestamp": val.timestamp,  "callerFullName":val.callerFullName, "callerRole": val.callerRole, "callerMessage": val.callerMessage, "isClosed": val.isClosed, "intakeFcid": val.intakeFcid, "messageNumber": i};
										if((message.timestamp!=undefined|| message.callerRole||message.callerFullName)&&pre[val.fcid]!=undefined &&pre[val.fcid].messageList==undefined)
										{
											var messageo=[];
											pre[val.fcid].messageList=messageo;
											pre[val.fcid].messageList.push(message);

										}
										else if((message.timestamp|| message.callerRole||message.callerFullName)&&pre[val.fcid]!=undefined &&pre[val.fcid].messageList.length>0)
										{	
											pre[val.fcid].messageList.push(message);
										}
										else{
											
										}
											console.log(pre);console.dir(pre);
							return pre;},profiles);
						console.log(profilesHolder);
						console.log("I am in the worker and getting the data from the data base!!!! Yeee Hah!!!!");
						self.postMessage("here are the basic profiles from messages", profilesHolder);
					});

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
					am[req.data.requestType](req);
					}
					else
					{
						req.data.status = "badType";
						console.log("Array Status Manager Worker does not handle " + req.data.requestType + " requests");
					}
					postMessage(req.data);
				});









											onmessage=function(e){ 
																console.log(e); var datum=e.data.datum; console.log(datum);
																	
																	console.log(datum,e.data.operation);
																	var func=e.data.operation;
																	self.data=datum;
																	dat=datum;
																self[func](datum);
																console.log(self[func][dat]);
																}.bind(self);
																	
																

																				
// getAllCalls=(datum)=>{
// 				var profiles=Object.create({});
// 				var ref =new Firebase(datum);
// 				var messageRecord=[];
// 				ref.on("value",(snap)=>{
				
// 				var callRecords=snap.val();
// 				var keys=Object.keys(callRecord);
// 						console.log(callRecords[keys[0]]); var profiles={};
// 	var profilesHolder=keys.reduce((pre, val, i)=>{
// 			pre[val.fcid]=val.fcProfile; 
// 			var message={"timestamp": val.timestamp,  "callerFullName":val.callerFullName, "callerRole": val.callerRole, "callerMessage": val.callerMessage, "isClosed": val.isClosed, "intakeFcid": val.intakeFcid, "messageNumber": i};
// 			var message=JSON.stringify(message);
// 		if((message.timestamp|| Message.callerRole||	message.callerFullName)&&profiles[val.fcid]!=undefined &&profiles[val.fcid].messageList.length>=0)
// 		{	
// 			pre[val.fcid].messageList.push(message);
// 		}
// 		else{
// 			var massageo=[], messages=[]; pre[val.fcid].messages=massageo;
// 			}
// 			console.log(pre);console.dir(pre);
// 			return pre;});profiles});
// 				profilesHolder.reduce((pre, curr,i, array)
	
			

		


	
// 		console.log("I am in the worker and getting the data from the data base!!!! Yeee Hah!!!!");

// 						self.postMessage("here are the basic profiles from messages",);



// };









