<link rel="import" href="fc-calendar-behavior-beta-prime.html">
<script>

//UTILITY FUNCTIONS
	//deep assign gets getters

function deepAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}
function surfaceCopy(target, listOrArrayOfObjectsToStripOrderMatters){
	if(Array.isArray(listOrArrayOfObjectsToStripOrderMatters))

}

function methodAssignment(objectThatIsToBeExtended, funktionToAdd, rg1, [argArray]){
	Object.assign([objectThatIsToBeExtended].prototype, [funktionToAdd]([argArray]);});

}
function DataManager=function(context){
	this.dataManagerProfile=new FcProfile(context.user);

        
 DataManager.prototype.calculateInputKeyAndValueArrayFromPrototypeOfClassStaticGetter(protoStaticGetter){
    var arrReturn=protoStaticGetter,it={},arrHolder=[];
    var keyValArrReturn= arrReturn.map(function(val,index){
        if(index%8===0){arrHolder=[];}//sets the 8 inputs a page
        var temp=val[1].label2;
        temp=temp.replace(/\s/g, "");
        var propertyName=temp.replace(temp.charAt(0),temp.charAt(0).toLowerCase()), label=val[1].label2, name=propertyName,dropdownItems=val[2].map(function(value,i,arr){var obj={};obj={"name": value, "value":value, "selectCheck": false}; return obj;}),multiSelect=(val[3])?val[3].multiSelect:false, ab=(index%2===0)?"A":"B";
        //setting ab allows a row of two inputs to be created for the dom-repeat
        var nameProp="name"+ab,labelProp="label"+ab,propertyNameProp="propertyName"+ab,dropdownItemsProp="dropdownItems"+ab, multiSelectProp="multiSelect"+ab;
        it[nameProp]=name,it[labelProp]=label,it[propertyNameProp]=propertyName,it[dropdownItemsProp]=dropdownItems;
        it[multiSelectProp]=multiSelect;
        //the above lines allow the creation of the A input and the B input to be shared in the same object;
        //console.log(it[dropdownItemsProp]);
        if(index%2!==0){
            var holder=it;
            it={};
            arrHolder.push(holder);
            }
        //above uses sets one full object in an array that will be sent with 3 other object pairs to full a page (see directly below)
            if((index+1)%8===0){return arrHolder;}
            else{ return false;} //false allows for the easy filtering of the mapped array, in the chained function below/we are only 1 in 8 of the array "slots" for the new array; so array is not sparse, filter ;-)
        }).filter(function(val){return(val!==false)});
    //console.log(keyValArrReturn);
    return keyValArrReturn;
  },
  

  DataManager.prototype.setPropertiesFromConstructorsToInitializeInputsForAnApi(argConstructorArray, apiName){
    //get at least the labelable values from the classes we have made... oh getters and setters would make this five-10 lines of code....
    // var student=new FcStudentProfile({}), pastAcademics=new FcPastAcademics({}), addAcademics=new FcAdditionalAcademics({});
    //     pastAcademics=Object.assign(pastAcademics, addAcademics);
    		
        var newObject=argContstructorArray.reduce((pre,constructor, index, array)=>{
        		var obj=new[constructor]({});
        		this[apiName]=deepAssign(this[apiName], obj);
        		return this[apiName];
        		});


        var it={},keyz=Object.keys(pastAcademics),keys=Object.keys(student),inputArrayA=[],inputArrayB=[],contentArray=[], two=keys[12],one=keys.splice(12,1);
        //note that the it object will be used for moving properties from one object to another, later in the code via an Object.assign--poor mans defineProperties set and gets...
        var tester={};
        tester=Object.assign(tester, student, pastAcademics);
        keys.push(two);
        var moreKeys=keys.concat(keyz); 
        var length;
        moreKeys.forEach(function(val, index, array){
          length=array.length;
        var label=val.replace(/([A-Z])/g, ' $1'),  
        label=label.replace(/^./, function(label){ return label.toUpperCase(); }),
        label=label.replace("1", " One"),
        label=label.replace("2", " Two");
        var ab=(index%2===0)?"A":"B",nameProp="name"+ab,labelProp="label"+ab,propertyNameProp="propertyName"+ab,dropdownItemsProperty="dropdownItems"+ab, multiSelectProperty="multiSelect"+ab;
        //built up the franken-it object now gonna use it to run sixty input objects! wish i ordered the data more consistently earlier....
        it[labelProp]=label,it[nameProp]=val,it[propertyNameProp]=val, it[dropdownItemsProperty]=(Array.isArray(tester[val]))?"value":(val.selectedItems)?val.selecteditems:false; 
        var mapName=val;
        if(it[dropdownItemsProperty]=="value")
          { it[dropdownItemsProperty]=[];
            it[dropdownItemsProperty]=tester[val].map(function(item){ 
                      var retVal={"name": mapName, "value": item}; 
                      return retVal;
                  });
          }
        // it[multiSelectProperty]=(val.multiSelect&&val.multiSelect===true)?true:false;
        //I avoided multi-select for the time being//will come back to it very SHORTLY NOW AUG 1, 2016;
        //ADDING A UNIQUE HANDLER HERE WILL DEAL WITH "related properties in next redo"//after multi=select

        if(it[nameProp]==="daysToNextTestDate"){
              var dynamicDependantValue="value" +ab;
                it[dynamicDependantValue]=tester.daysToNextTestDate;
        }
        //TODO--FIX THIS REALLY ITS A SCAR ON THE SYSTEM; SLIPPERY SLOPE

        var pushVal=(index%2===0)?inputArrayA:inputArrayB;
        //alternating on the index to get a pair of items to load on the dom!
        pushVal.push(it);
        it={};
        //cleared `it`, next gonna grab eight inputs (four pairs of two) for the cards
        if((index+1)%4==0 || array.length-1===index){
              this.push("inputArraysAb", [inputArrayA, inputArrayB]);
              inputArrayA=[];
              inputArrayB=[];
                 }
         }, this);
        //this was original impl... used two arrays to make columns... now need to resort them and move paired odd array elements object sub properties all onto one replacement element for the other two, and maintain order in the impl... Wait for it... wait for it... it's...it is coming!
         var mymerge=this.inputArraysAb.map(function(prop, index, array){
         var pickle=prop[0].concat(prop[1]); 
            var nobj=Object.assign({},pickle[0],pickle[2]);//concern here regarding cloning using a getter: did I just bind the properties?
            var nobj2=Object.assign({},pickle[1],pickle[3]);
            return[nobj,nobj2];
         }, this);
        //this is a columns to rows switch will need same api dynamics in the grid table and in any accounting interface DUAL USE IMPORTANT!!! 
         var arrat=[];
         mymerge.forEach(function(val,i,arr){
                if(i%2===0&&i<arr.length-1){var mini=val.concat(arr[i+1]); arrat.push(mini);}
            });
         console.log(arrat);
         console.log(this.njhs);
           var jason=this;
        var pickle= "https://focusedstaging1.firebaseio.com/forms/callIntake/njhighschools000020160208";
        var ref = new Firebase(pickle);
        ref.on("value", function(snap){
        var vald = snap.val();
        var valuebased=vald.map(function(val){
          var nu={"name": "currentSchool", "value":val};
          return nu;
        });
        jason.set("njhs",valuebased); 
         arrat[2][0].dropdownItemsB=valuebased;
         arrat[2][0].dropdownItemsA=[{"name":"gradeLevel", "value": "9th Grade"}, {"name":"gradeLevel","value": "10th Grade"}, {"name":"gradeLevel","value": "11th Grade"},{"name":"gradeLevel","value":"12th Grade"}, {"name":"gradeLevel","value": "Grades 7-8"}, {"name":"gradeLevel","value": "Grades 5-6"}, {"name":"gradeLevel","value": "Grades 3-4"}];
            console.log*(arrat);
            arrat[2][1].labelB="Educational Aspirations";
            arrat[2][1].dropdownItemsB=[{"name": "highestEducationLevel","value": "Regional or State College"}, {"name": "highestEducationLevel","value": "Private University"}, {"name": "highestEducationLevel","value": "Competitve Private University"},{"name": "highestEducationLevel","value":"Elite Private University"}, {"name": "highestEducationLevel","value": "Masters Degree"}, {"name": "highestEducationLevel","value": "Professional Degree"}, {"name": "highestEducationLevel","value": "Doctoral Degree, or Equivalent"}];
            arrat[2][1].labelA="Previous Eductaion";
            arrat[2][2].dropdownItemsA=[{"name": "startMathScore", "value": "200-300"}, {"name": "startMathScore", "value": "300-400"}, {"name": "startMathScore","value": "400-500"},{"name": "startMathScore","value":"500-600"}, {"name": "startMathScore","value": "600-650"}, {"name": "startMathScore","value": "650-700"}, {"name": "startMathScore","value": "700-750"}, {"name": "startMathScore", "value": "750-800"}];
            arrat[2][2].dropdownItemsB=[{"name": "startReadingScore","value": "200-300"}, {"name": "startReadingScore","value": "300-400"}, {"name": "startReadingScore","value": "400-500"},{"name": "startReadingScore","value":"500-600"}, {"name": "startReadingScore","value": "600-650"}, {"name": "startReadingScore","value": "650-700"}, {"name": "startReadingScore","value": "700-750"}, {"name": "startReadingScore","value": "750-800"}];
            arrat[2][3].dropdownItemsA=[{"name": "startTotalScore","value": "500-700"}, {"name": "startTotalScore","value": "700-900"}, {"name": "startTotalScore","value": "900-1050"},{"name": "startTotalScore","value":"1050-1150"}, {"name": "startTotalScore","value": "1150-1250"}, {"name": "startTotalScore","value": "1250-1350"}, {"name": "startTotalScore","value": "1350-1450"}, {"name": "startTotalScore","value": "1450+"}];
            arrat[2][3].dropdownItemsB=[{"name": "goalTotalScore","value":"1050-1150"}, {"name": "goalTotalScore","value": "1150-1250"}, {"name": "goalTotalScore","value": "1250-1350"}, {"name": "goalTotalScore","value": "1350-1450"}, {"name": "goalTotalScore","value": "1450-1500"}, {"name": "goalTotalScore","value": "1500-1550"}, {"name": "goalTotalScore","value": "1550+"}];
          jason.set("inputArraysAb",[]);
         jason.set("inputArraysAb", arrat);
        });
         
         var pickle=this.calculateInputKeyAndValueArrayFromPrototypeOfClassStaticGetter(this.courseInputs);
         this.set("courseCalendarCreationArrays", pickle);
         this.set("callIntakeArrays", arrat);
           var retArray= arrat.concat(pickle);
            //console.log(arrat,pickle);
        //had to do the above twice to get the ordering correct...see 391 above, this time though I didnt need the assigment as I did two at once above;
        // next we wipe out our mistake in approach by resetting the original array we had to deal with...
         // this.set("inputArraysAb",null);
         // this.set("inputArraysAb", retArray);
    



}

'use strict';
class FcStudentProfile {
	constructor(argProfile){this.build(argProfile.studentFirstName, argProfile.studentLastName, argProfile.studentTelephone, argProfile.studentEmail, argProfile.parent1FirstName, argProfile.parent1LastName, argProfile.parent1Telephone, argProfile.parent1Email, argProfile.parent2FirstName, argProfile.parent2LastName, argProfile.parent2Telephone, argProfile.parent2Email, argProfile.addressLine1, argProfile.addressLine2, argProfile.fcid);}
	build(studentFirstName,studentLastName, studentTelephone, studentEmail, parent1FirstName, parent1LastName, parent1Telephone, parent1Email, parent2FirstName, parent2LastName, parent2Telephone, parent2Email, addressLine1, addressLine2, fcid)
	{
		this.studentFirstName= studentFirstName ||"";
		this.studentLastName= studentLastName ||"";
		this.studentTelephone= studentTelephone ||"";
		this.studentEmail= studentEmail || "";
		this.parent1FirstName= parent1FirstName ||"";
		this.parent1LastName= parent1LastName || "";
		this.parent1Telephone= parent1Telephone ||"";
		this.parent1Email= parent1Email ||"";
		this.parent2FirstName= parent2FirstName ||"";
		this.parent2LastName=parent2LastName || "";
		this.parent2Telephone= parent2Telephone ||"";
		this.parent2Email= parent2Email ||"";
		this.studentFullName=this.studentFirstName + " " + this.studentLastName;
		this.addressLine1= addressLine1 ||"";
		this.addressLine2= addressLine2 ||"";
		this.fcid= fcid || this.studentLastName + this.studentFirstName + "00001";
	}

	getFanout(){
		var fanoutObj = {


		};
		fanoutObj[this.fcid]=this;
		fanoutObj.currentStudents=this;
		return fanoutObj;
	}
}
function objectArrayForPossiblePropertyValues(propertyName, arrayOfPossibleValues, context){
		var prop=propertyName;
		var arrayToInputDropdownsAndMenus=arrayOfPossibleValues.map(function(value){ 
			var retVal={"name":prop, "value": value};
			return retVal;
		}, context);
		return arrayToInputDropdownsAndMenus;

}
class FcAdditionalAcademics {
	constructor(argAces, fcid){this.build(argAces.completedMathCourse, argAces.currentEnglishClass, argAces.completedScience,argAces.currentHistoryCourse, fcid);}
	build(completedMathCourse, currentEnglishCourse, completedScienceCourse,currentHistoryCourse, fcid)
	{
		var english= ["Standard English",
             "Honors English",
             "AP Language and Composition",
             "AP Literature and Composition",
             "English Writing Colloquim",
             "I want to be a writer",
             "I am currently writing for publication",
             "I Have Published Work Professionally",
             "Other (write what you want, it's a writing question)"];
   
        var science=[ "Biology",
             "Chemistry",
             "Physics",
             "AP Biology",
             "AP Chemistry",
             "AP Physics",
             "AP Bio & AP Chem",
             "AP Bio & AP Phys",
             "AP Phys & AP Chem",
             "AP Phys, AP Bio & AP Chem",
             "I currently have a project with a university laboratory",
             "I am currentyly doing research in industry",
             "I am currently doing research for the government",
             "I have a laboratory in my basement and a good friend named Igor, but I hate it when everyone calls me Dr. Frankenstein"];
        
         var history=["World History",
             "AP U.S. History One",
             "AP U.S. History Two",
             "AP Human Geography",
             "AP World History",
             "AP European History",
             "AP Art History",
             "U.S. History",
             "AP Gov. & Pol.",
             "I am currently involved in local politics", 
             "I am currently running for local or state office", 
             "I figured I could be President if Donald Trump could..."];
        

	this.completedMathCourse = completedMathCourse ||["Algebra I","Geometery, no Algebra I","Algebra I and Geometery","Algebra II, no Geometry","Algebra II and Geometry","Currently in Pre-Calculus","Completed Pre-Calculus","Completed Basic Statistics","Calculus AB or Higher","Completed Higher Math Courses (You May Type in Your Courses Here)","Let's Not Talk About 'THAT MATH'"];
     this.currentEnglishCourse = currentEnglishCourse || english;
     this.completedScienceCourse= completedScienceCourse || science;
	this.currentHistoryCourse = currentHistoryCourse || history;
	//this.fcid = fcid;
	}
}
var testdateHolder=[];
  var d=new Date();
class FcPastAcademics{
constructor (gradeLevel, currentSchool, pastSchool, highestEducationLevel, startMath, startReading, startTotal,goalScore,fcid){
  this.gradeLevel= gradeLevel ||"";
  this.currentSchool= currentSchool ||"";
  this.pastSchool= pastSchool ||"";
  this.highestEducationLevel= highestEducationLevel ||"";
  this.startMathScore =  startMath  || "";
  this.startReadingScore = startReading || "";
  this.startTotalScore = startTotal || "";
  this.goalScore=goalScore || "";
  this.pastTestDates=[];
  testdateHolder=this.nextReasonableTestDates(8);
  console.log(testdateHolder);
  this.approachingTestDates=testdateHolder;
  console.log(this.approachingTestDates, this.approachingTestDates[0]);
  this.daysToNextTestDate=Date.prototype.countdownDays(d,new Date(this.approachingTestDates[0]));
  console.log(this.daysToNextTestDate);
  this.serviceMatchLevelOne=[];
  }
computeServiceMatchLevelOne(gradeLevel){
    var returnVal =("focusedProgramFit"=="Grade 4")?["Young Scholars Reading","Young Scholars Math"]:("focusedProgramFit"=="Grade 5")?["Young Scholars Reading","Young Scholars Math", "Young Scholars:Young Authors"]:("focusedProgramFit"=="Grade 6")?["Young Scholars Reading","Young Scholars Math","Young Scholars:Young Authors","PSAT 8/9"]:("focusedProgramFit"=="Grade 7")?["PSAT 8/9","Young Scholars Reading","Young Scholars Math","Young Scholars:Young Authors","Focused1600Prep"]:("focusedProgramFit"=="Grade 8")?["1600 SAT","PSAT-NMSQT","PSAT 10","PSAT 8/9","Young Scholars II: True Scholarship"]:("focusedProgramFit"=="Grade 9")?["1600 SAT","PSAT-NMSQT","PSAT 10","PSAT 8/9","Young Scholars II:Deep Learning"]:("focusedProgramFit"=="Grade 10+")?["1600 SAT","PSAT-NMSQT","PSAT 10"]:["1600 SAT"];

}
nextReasonableTestDates(num)
{

var allTestDates=[[2016,1,23], [2016, 3, 5],[2016, 5, 7],[2016, 6, 4],[2016, 8, 6],[2016,10,1],[2016,11,5],[2016,12,3],[2017,1,28],[2017,3,11],[2017, 5, 6], [2017, 6, 3],[2017, 8, 26],[2017, 10, 7],[2017,11,4],[2017, 12, 2],[2018,3, 10],[2018, 5, 5], [2018, 6, 2], [2018, 8, 25], [2018, 10, 6],[2018,11,3],[2018,12,1],[2019,3, 9],[2019,5,4],[2019, 6, 1]];

	var now = new Date();
	var i=0;
	var testDates=allTestDates.filter(function(val){ 
			var date=new Date(val);
			if(date>now.addDays(+30)&&i<num)
				{
					i++;return true;
				}
			else if(date<now.addDays(+30)&&date.getMonth()!==7){
				date=new Date(date).toDateString();
				this.pastTestDates.push(date);
			}
		}, this);
	console.log(this.lastTestDate);
		console.log(testDates);
		var readableDates=testDates.map(function(date){var td=new Date(date).toDateString(); return td;});
		console.log(readableDates);
		return readableDates;	
}

};
class FcInquiry{
	constructor(argInquiry, argCallerRole, argFcProfile)
	{	

		this.builder(argInquiry.timeStamp, argInquiry.callerFullName, argInquiry.isClosed, argInquiry.relatedStudent, argInquiry.callerMessage, argInquiry.focusedProgramMatch, argInquiry.returnContactTime, argInquiry.callerExpectedFollowUp, argInquiry.isPreviousCaller, argInquiry.intakeFcid, argInquiry.fcid, argCallerRole, argFcProfile);
	
	} 
	builder(timeStamp, callerFullName, isClosed, relatedStudent, callerMessage, focusedProgramMatch, returnContactTime, callerExpectedFollowUp, isPreviousCaller, intakeFcid, fcid, callerRole, fcProfile){
	this.timeStamp=timeStamp || "ALERT FAIL"; 
	var  callerFirstName = fcProfile[callerRole+"FirstName"];
	var callerLastName = fcProfile[callerRole+"LastName"];
	this.callerFullName=callerFullName || callerFirstName + " " + callerLastName;
	var email= fcProfile[callerRole+"Email"];
	this.callerEmail=email  || "";
	var phone = fcProfile[callerRole+"Telephone"];
	this.callerTelephone=phone  || "";
	this.isClosed=isClosed || false;  
	this.relatedStudent=relatedStudent || fcProfile.studentFullName;  
	this.callerMessage=callerMessage || "AlertVital"; 
	this.focusedProgramMatch=focusedProgramMatch || "Focused 1600SAT";  
	this.returnContactTime=returnContactTime || "";  
	this.callerExpectedFollowUp=callerExpectedFollowUp || "";
	this.callerRole =callerRole || "fail";
	this.isPreviousCaller = isPreviousCaller || false; 
	if(this.inquiryNumber==null){this.inquiryNumber= 1; console.log(this.inquiryNumber);}
	else if(this.inquiryNumber==Nan){var num = parseInt(this.inquiryNumber); if(num ==Nan || num == null){this.inquiryNumber=1;} else{ num++; this.inquiryNumber=num; console.log(this.inquiryNumber, num, "this is the else on the if in the else if one");}}
	else if(typeof this.inquiryNumber==Number){this.inquiryNumber++; this.inquiryNumber = this.inquiryNumber; console.log(this.inquiryNumber, "this is if stuff goes right");}   
	this.intakeFcid=intakeFcid || "ALERT"; 
	this.fcid= fcid || fcProfile.fcid;
	this.fcProfile= fcProfile || {};
	}
	fcSave(ref){
		var inq = ref.child("inquiries");
		var key1= -(new Date(this.timeStamp).getTime()) + "_" + this.fcid;
		var savObject ={};
		savObject[key1]=this;
		inq.update(savObject);
		var student = ref.child("students/" + this.fcid + "/inquiries");
		student.update(savObject);
	}
	
}

function StudentEntity

// class FcAccountDetails{
// 	constructor(argAcctDs, argFcProfile, argFcInquiries, fcid){this.build(argAcctDs.inquiryNumber, argAcctDs.totalAmmountDue)
// 	(firstName,lastName,address1,address2,parent1,parent2,phone1,parent1Telephone,parent2Telephone,email,parent1Email,parent2Email,telephone,fcid);


window.FCBehaviors = window.FCBehaviors || {};
FCBehaviors.FcProfileClass= {
};
</script>