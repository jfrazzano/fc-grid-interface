
		request.onerror = (ev)=>{ 
	        console.log("This is the second failed ATTEMPT.  NO MORE ATTEMPTS WILL BE MADE AT THIS TIME. Please attempt to access your data at a later time. we will be initializing a new Index.");
	                  };





           console.log(db.getAll());
           if(db.transaction("index")){
			// var transaction = db.transaction(["index"], "readonly");
          var objectStore = transaction.objectStore(["index"]);
  	        query = objectStore.getAll();
  			query.onsuccess =(queryEvent)=>{
         			var index = queryEvent.target.result;
         			var count=index.length;
         			self.postMessage({"message":{"index":index, "count":count}});
         		};
         	}
         	else{





 }