
class DataGrids{
  constructor(){
    this.firstLoad=true;
    this.counter=0;
    this.dataArrays=[];
    this.indexOfDatabases=[];
    this.csv=[[  "Monthly Comparisons","January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October","November" ,"December","Monthly Avg","%_v_Prev","Yr. Tot. Est 14"],
            ["2008 Totals",,,,,,,,,,,,,"$11,426.42 ",,"$137,117.00 "],
            ["2009 Totals","39.79%",,,,,,,,,,,,"$16,064.58 ","40.59%","$192,775.00 "],
            ["2010 Totals",,,,,,,,,,,,,"$25,997.08 ","61.83%","$311,965.00 "],
            ["2011 Totals","$31,454.86 ","$17,363.07 ","$36,275.98 ","$18,214.92 ","$9,891.99 ","$52,962.60 ","$70,732.42 ","$70,482.71 ","$30,910.19 ","$45,635.75 ","$10,225.00 ","$29,020.00 ","$35,264.12 ","35.65%","$423,169.49 "],
            ["2012 Totals","$51,545.00 ","$30,709.50 ","$9,300.00 ","$51,240.00 ","$53,762.50 ","$74,445.00 ","$101,800.00 ","$69,150.00 ","$45,700.00","$52,008.00 ","$38,220.00","$25,468.75 ","$50,279.06 ","42.58%","$603,348.75 "],
            ["2013 Totals","$70,942.00 ","$31,962.00 ","$59,400.00 ","$86,950.00 ","$55,025.00 ","$76,750.00 ","$148,334.00 ","$68,242.00 ","$51,399.00 ","$62,282.00 ","$51,000.00 ","$66,633.00 ","$69,076.58 ","37.39%","$828,919.00 "],
            ["2014 Totals","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$77,375.00 ",,,,,,,"$86,309.00 ","35.91%","$1,126,578.34 "],
            ["Avg. Revenue '11-'14","$58,135.47 ","$38,773.14 ","$47,412.75 ","$66,623.98 ","$52,683.62 ","$70,383.15 ","$106,955.47 ","$69,291.57 ","$42,669.73 ","$53,308.58 ","$33,148.33 ","$40,373.92 ","$60,232.19 ",,"$722,786.31 "],
            ["% Change 14 v. Avg. '11-'14","35.20%","93.58%","78.59%","65.24%","74.73%","9.93%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","43.29%",,"#REF!"],
            ["Best Month '11-'13 yr. ","$70,942.00 ","$31,962.00 ","$59,400.00 ","$86,950.00 ","$55,025.00 ","$76,750.00 ","$148,334.00 ","$70,482.71 ","$51,399.00 ","$62,282.00 ","$51,000.00 ","$66,633.00 ","$69,263.31 ",,"$900,423.02 "],
            ["% change 14 v. previous best '11-'13","10.79%","134.84%","42.55%","26.61%","67.30%","0.81%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","24.95%",,"-7.94%"],
            [ "Avg. Revenue '12-'14","$67,029.00 ","$45,909.83 ","$51,125.00 ","$82,760.33 ","$66,947.50 ","$76,190.00 ","$125,067.00 ","$68,696.00 ","$48,549.50 ","$57,145.00 ","$44,610.00 ","$46,050.88 ","$65,006.67 ",,"$780,080.04 "],
            ["%Change14 v.14 Avg","17.26%","63.49%","65.62%","33.02%","37.50%","1.56%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","32.77%",,"6.26%"],
            ["Gross delta '13 to '14","$7,658.00 ","$43,096.00 ","$25,275.00 ","$23,141.00 ","$37,030.00 ","$625.00" ,"($148,334.00)","($68,242.00)","($51,399.00)","($62,282.00)","($51,000.00)","($66,633.00)","$27,240.00 ",,"$326,880.00 "],
            ["% &#916 13 to '14","10.79%","134.84%","42.55%","26.61%","67.30%","0.81%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","-100.00%","44.76%",,"54.18%"],
            ["Projections RE: 2014","January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October","November" ,"December","Monthly Avg","%?'14 v 13","Totals"],
            ["Worst Remaining M. (WRM) '12+","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$74,445.00 ","$101,800.00 ","$68,242.00 ","$45,700.00 ","$52,008.00 ","$38,220.00 ","$25,468.75 ","$70,530.23 ","2.10%","$846,362.75 "],
            ["Proj.WRMonths_incQ4 +17%","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$87,100.65 ","$119,106.00 ","$79,843.14 ","$53,469.00 ","$60,849.36 ","$44,717.40 ","$29,798.44 ","$76,280.25 ","10.43%","$915,362.99 "],
            ["Proj./w_last +15%","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$88,262.50 ","$170,584.10 ","$78,478.30 ","$59,108.85 ","$71,624.30 ","$58,650.00 ","$76,627.95 ","$86,984.58 ","25.92%","$1,043,815.00 "],
            ["Projected w last+25%","$88,677.50 ","$39,952.50 ","$74,250.00 ","$108,687.50 ","$68,781.25 ","$95,937.50 ","$185,417.50 ","$85,302.50 ","$64,248.75 ","$77,852.50 ","$63,750.00 ","$83,291.25 ","$86,345.73 ","25.00%","$1,036,148.75 "],
            ["Proj. w/Avg. 12-13","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$76,190.00 ","$125,067.00 ","$68,696.00 ","$48,549.50 ","$57,145.00 ","$44,610.00 ","$46,050.88 ","$75,565.61 ","9.39%","$906,787.38 "],
            ["2014 Projections" ,"January" ,"February" ,"March" ,"April" ,"May" ,"June" ,"July" ,"August" ,"September" ,"October","November" ,"December","Monthly Avg","%? v. Proj.","2014 Proj."],
            ["2014 Actual ","$78,600.00 ","$75,058.00 ","$84,675.00 ","$110,091.00 ","$92,055.00 ","$77,375.00 ",,,,,,,"$86,309.00 ","8.73%","$1,126,578.34"],
            ["? '14 v. + 25%","($10,077.50)","$35,105.50 ","$10,425.00 ","$1,403.50 ","$23,273.75 ","($18,562.50)",,,,,,,"$6,927.96 ","8.73%","$90,429.59"]
           ];
    this.defaultFormat={"color": "#009", "background": "#fefefe", "header_backgroundColor":"aliceblue", "fontSize": "14px", "fontWeight": "600", "fontFamily": "merriweather", "lineHeight": "1.15","line-height":"1.3em", "border": "1px #afafaf solid","styleText": "margin:0px; box-shadow: 1px 3px 4px 2px #fafafa; cursor: cell;font-size: 14px; font-weight: 600; color: #009; font-family: merriweather; text-align: center; white-space: wrap; max-height: 65px; min-height: 18px; border: 1px solid #afafaf; padding-top: 4px; font-family: merriweather; text-align: center;resize:none; line-height:1.3em;"};
    this.june2015CallSheet=[["6/1/2015", "Ram Lattupally",  "Saketh",  "sophmore"  ,"Monroe Twp HS", "908-239-2233",  "rdreddy116@gmail.com","tue/thurs class"],["6/1/2015", "Mary Coscia", "Matthew",  "sophmore",  "Metuchen HS", "732 494-3751",  "immdc@aol.com",  "sat class"],["6/1/2015", "Mattu Meera"  ,"Juhi",   ,   ,"732-987-9797", ,   "sat class"],["6/1/2015", " Cindy Prestigiacomo", "Jaime",   , "colts neck hs",   "917-750-0552",  "jprestir@aol.com",  "august sat class"],["6/1/2015", " Yelena ,Buryan", "Nicole Zatserkovaniy",  "sophmore",  "colts neck hs",  "617-832-5129",  "yburyan@yahoo.com august sat class"],["6/1/2015", "Rana Hemendra", "Kajal", "sophmore",  "Biotechnology HS",  "862-823-1888",  "hcrana@yahoo.com",  "sat class"]
    ];
    this.defaultHeader={"max-height": "65px;","border": "solid 1px #009;", "min-height": "18px;","line-height":"1.3em", "margin": "0px;", "height":"20px!important;", "font-family":"merriweather;", "background": "aliceblue;", "color": " #009;", "text-align": "center;", "font-size": "18px;","font-weight":"700;", "resize":"none;","styleText":"max-height: 65px; border: solid 1px #009; min-height: 18px;  margin: 0px;  height:23px!important;  font-family:merriweather;  background: aliceblue;  color:  #009;  text-align: center; line-height:1.3em; font-size: 18px; font-weight:700; resize:none;"};
      
    this.defaultColor="#009";    
    this.defaultHeaderbackground="#F0F8FF";
    this.monthsCalendarHeaderClass="daysOfTheWeekHeader";
    this.monthsCalendarCellClass="calendarDays";

    var calStyle=this.defaultFormat.styleText+"min-width: 100px!important;max-width: 101px!important; min-height: 100px;!important; max-height:101px!important;";
    var calHeaderStyle="border: solid 2px #009; height: 24px!important;  margin: 0px; font-family:courier;  background: aliceblue;  color:  #005c00;  text-align: center; line-height:1.3em; font-size: 17px; font-weight:300; resize:none;"
    this.financialGrid =this.gridConstructor([25,25,"mid2014Monthlies", "fcFinancials", undefined,1, undefined, this.csv, null, null, null, null, true]);
    this.calendarGrid=this.gridConstructor([7,7,"monthsCalendar", "fcCalendar", [["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]],3, undefined, [["--",1,2,3,4,5,6],[7,8,9,10,11,12,13],[14, 15,16,17,18,19,20],[21,22,23,24,25,26,27,28,29],[30,31]], calStyle,null, calHeaderStyle,null, true]);
    this.fcCallRecords =this.gridConstructor([9,80,"June2015Calls", "fcCallRecords", [["Date", "Parent Name","Student Name","Year","School","Phone Number","Email","Stated Interest"]],12, undefined, this.june2015CallSheet, null, null, null, null, true]);
    this.courseResultsByStudent=this.gridConstructor([18,30,"stacyClassSheetJuneTTH900AM", "fcCourseResultsByStudent", undefined,3,undefined, undefined, null, null, null, null, null, true]);
    if(this.firstLoad===true){this.firstLoad=false;
      this.dataArrays=this.dataForPresetDatabases();
     this.indexOfDatabases=this.createIndicies(this.dataArrays);
     this.initDataBasesAndObjectStoresOnFirstLoadToStystem(this.indexOfDatabases);


    }
  }

   gridConstructor([col,row,gridname, apiName, columnHeaders,sheets, toolset, baseValuesArrays, userStyle, userClass, userHeaderStyle,userHeaderClass, isCsv]){
    
    var grid=[], i=0, j=0, cell={},colArray=[]; 
    var cols=(col)?col:26; var rows=(row)?row:26; 
    var appliedClass=(userClass)?userClass:"fitter"; 
  var valuesArray=(baseValuesArrays&&baseValuesArrays.length>0)?baseValuesArrays:(baseValuesArrays===true)?this.csv:[];
  var sheetName=(gridname)?gridname: "newSheet"+this.counter;
  var input={};
  if(columnHeaders){valuesArray=columnHeaders.concat(valuesArray);}
    for(i=0;i<cols;i++){
    
    var minWidth=0; var altitude=0;
      for(var j=0;j<rows;j++)
      {
       if(isCsv===true||(columnHeaders&&i===0)){
      var value=(valuesArray&& valuesArray[j] && valuesArray[j][i])?valuesArray[j][i]:"--";}
        else{value=(valuesArray&& valuesArray[i] && valuesArray[i][j])?valuesArray[i][j]:"--";}
      var str="00000";
      var co=(str+i).slice(-5);
      var ro=(str+j).slice(-5);
      var id=sheetName+"_"+co+"_"+ro+"_", keys=id.split("_");
      var name=(valuesArray===true&&this.csv && this.csv[0][i] && this.csv[j])?this.csv[0][i]+"__"+this.csv[j][0]:(this[sheetName]&&this[sheetName].length>0&&this.sheetName[i])?this[sheetName][i][0]+"__"+this[sheetName][0][j]:"add names";
      var style=(isCsv===true&&keys[2]==0&&userHeaderStyle!=null)?userHeaderStyle:(isCsv===true&&keys[2]==0&&userHeaderStyle==null)?this.defaultHeader.styleText:(isCsv!==true&&keys[1]===0&&userHeaderStyles!=null)?userHeaderStyles:this.defaultFormat.styleText; 
      var nowTime=new Date().getTime();
      var readableTime=new Date(nowTime).toUTCString();
      var time={"time":nowTime, "readableTime":readableTime, "user": "user","change":"change"}
          var cell={"key":id, "value":value, "apiName": apiName, "contenteditable": true, "id": id, "style":  style, "name": name,"class": appliedClass, "time": time, "archive":[], "closed": false};
              var width=this.textMeasurements(cell);
              width=parseInt(width);
              minWidth=(minWidth>=width)?minWidth:width;
              
              colArray.push(cell); 
          }
        
          colArray.forEach(function(cell, ind){
            var numb=Math.ceil(parseInt(minWidth)+63);//do the cleaner removal
            cell.style+="width: " +numb+"px; ";
          });

         grid.push(colArray);
         colArray=[];
    }
    this.counter++;
    this[gridname]=grid;
    postMessage(grid);
    return grid;
  }
   textMeasurements(cell, units){
    var c=document.createElement("CANVAS");
    var ctx=c.getContext("2d");
    var theId="#"+cell.id
    if(cell&&cell.style){
        var ft1=cell.style.match("font-size:");
        var   cssArr=cell.style.split("font-size:");
        var inde=cssArr[cssArr.length-1].indexOf(";")
        var fs=parseInt(cssArr[cssArr.length-1].substr(inde-4,4));
        fs=parseInt(fs);
        cell.style.split("font-size:")
        var ft2= cell.style.split("font-family");
        var index=ft2[ft2.length-1].indexOf(";"); var family=ft2[ft2.length-1].slice(0, index);
          
        ctx.font =fs+"px"+ " "+family;
        var txt=cell.value;
        var width=ctx.measureText(txt).width;
        return width;
      }
    else{return "6px";}
  }

    createIndicies(dataArrays){
      var indexOfDatabases=[];
      var counter=dataArrays.length;
      for(var j=0; j<counter;j++){ 
                 var gridKey=dataArrays[j][0];  
                  var dataArray=dataArrays[j][1];
                  var columns=(gridKey.columns&&gridKey.columns>0)?gridKey.columns:dataArray.length;
                  var rows=(gridKey.rows&&gridKey.rows>0)?gridKey.rows:dataArray[0].length;
                  var data=dataArray.map(function(colHolder, col){
                      return colHolder;
                      }).reduce(function(pre, val){
                          return pre.concat(val);
                      },[]);
                      //console.log(data);
                  //descriptor object in 00, value on 01, map model[[keys, values], [keys, values]
                  var version=gridKey.version;
                  var apiName=gridKey.apiName;
                  var nowTime=new Date().getTime();
                  var readableTime=new Date(nowTime).toUTCString();
                  var time={"time":nowTime, "readableTime":readableTime, "user": "user","change":"change"}
                  var storeName = gridKey.storeName; 
                  var numObj=data.length;
                  var indexEntry={
                      "apiName": apiName,
                      "name": apiName,
                      "version": version, 
                      "columns": columns,
                      "rows": rows,
                      "size": numObj,
                      "time": nowTime,
                      "value": dataArray,
                      "changeRecord": time,
                      "key":storeName,
                      "storeName": storeName,
                      "indicies": ["key", "apiName", "closed", "value", "time", "user"],
                      "dataStream": data,
                    };

              indexOfDatabases.push(indexEntry);
              indexEntry=[];
              data=[];
              } 
              postMessage(indexOfDatabases);
              return indexOfDatabases;
            }
 createIndex(indexName,indexVersion){
      this.getObjectStore("indexOfDatabases",1, false, this.localDisplayedOfDBIndexSetter);   
      }
    makeGrids(setter, context){
      console.log(context,"this", this);
      var index=(this.indexOfDatabases&&this.indexOfDatabases.length>0)?this.indexOfDatabases:context.indexOfDatabases;
      console.log("index", index);
        for(var i=0;i<index.length;i++){
        var name=index[i].name;
        var version=index[i].version;
        this.getObjectStore(name, version, true,setter,context); 
        }
      }
  observeDataArrays(){}
  getAllObjectStoresAtInit(){}
  viewIndexOfIndexedDatabases(){}
  
  dataForPresetDatabases(){
        return [

        [{"apiName": "fcFinancials", "storeName":"mid2014Monthlies", "version": 1, "columns": undefined, "rows": undefined, "size":0, "time": undefined, "changeRecord": []},this.financialGrid],
         [{"apiName": "fcCalendar", "version": 1, "storeName":"monthsCalendar", "columns": 7, "rows": 6, "size":0, "time": undefined, "changeRecord": []},this.calendarGrid],
         [{"apiName": "fcCallRecords", "version": 1, "storeName":"june2015CallSheet", "columns": undefined, "rows": undefined, "size":0, "time": undefined, "changeRecord": []},    this.fcCallRecords],
         [{"apiName": "fcCourseResultsByStudent", "version": 1,"storeName":"stacyClassSheetJuneTTH900AM", "columns": undefined, "rows": undefined, "size":0, "time": undefined, "changeRecord": []},this.courseResultsByStudent]
         ];
    }
initDataBasesAndObjectStoresOnFirstLoadToStystem(){}
    createColumnsAndRows(cells){          
                     var topArray=[];
                     var lastVal=cells.length-1;
                     var grid =cells.reduce((pre, val, i, arr)=>{
                       var valKeys=val.id.split("_"); 
                        if(pre.length==0)
                          {
                            pre.push(val); 
                            return pre;
                            }
                        else {  
                                var last=pre.length-1;
                                var keys=pre[last].id.split("_");
                                var valKeys=val.id.split("_");
                                }
                                if(keys[1]==valKeys[1]&&i!==(lastVal))
                                { 
                                  pre.push(val); return pre;
                                }
                                else if(keys[1]!=valKeys[1]){
                                  topArray.push(pre); 
                                  var newArr=[];
                                  newArr.push(val);
                                  return newArr;
                                }
                                else if(i==(lastVal)&&keys[1]==valKeys[1]){
                                  pre.push(val);
                                  topArray.push(pre);
                                  return topArray;
                                }
                                else if(i==(lastVal)&&keys[1]!=valKeys[1]){
                                  topArray.push(pre); 
                                  var newArr=[];
                                  newArr.push(val);
                                  topArray.push(newArr);
                                  return topArray;
                                }         
                          }, []);
                     return grid;
      }
    getObjectStore(name,version, asGrid, callbackSetter){}
    
    createIndex(indexName,indexVersion){
      this.getObjectStore("indexOfDatabases",1, false, this.localDisplayedOfDBIndexSetter);   
      }
    makeGrids(setter, context){
      console.log(context.indexOfDatabases,context, "this",this, this.indexOfDatabases);
      var index=(this.indexOfDatabases&&this.indexOfDatabases.length>0)?this.indexOfDatabases:context.indexOfDatabases;
      console.log("index", index);
        for(var i=0;i<index.length;i++){
        var name=index[i].name;
        var version=index[i].version;
        this.getObjectStore(name, version, true,setter,context); 
        }
      }
    dataArraysCallBackSetter(query, context){context.dataArrays.push(query);}
    
    localDisplayedOfDBIndexSetter(query, context){
            var databases=[];
            console.log(query);
            var databasesIndex=query.map(function(val,i){
                  var version =(val.version!=undefined)?val.version:undefined;
                  var flag=false;
                  var databases={
                    "name": val.name,
                    "version": version, 
                    "columns": val.columns,
                    "rows": val.rows,
                    "size": val.size,
                    "value": val.value,
                    "key": val.key,
                    "time": 0,
                    "location":"#s_#n",
                    "changeFlag":flag
                  };
                  return databases;
                });
          
            context.indexOfDatabases=databasesIndex;
            console.log(context.indexOfDatabases);
      }
  
    createObjectStoresForDataArrays(){


    }
    updateObjectStoreByPuttingNewObjects(name, version,replacementArray){
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
    }

    deleteObjectStore(name, version){   
        console.log("CALL ME CALL ME CALL ME");
        indexedDB.deleteDatabase(name);
        console.log("would love this to work");
      }
};




