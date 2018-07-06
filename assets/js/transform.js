export function run(dayBookings, venue, cDay) {

  console.log(dayBookings);
  console.log("Transform start");
  var dayBookings, startTime, EndTime;

  console.log(dayBookings);
    
  var moment = require('moment');

  // Fix timezone, offset with +2
  for (let i = 0; i < dayBookings.value.length; i++) {
    // let dateStartTmp = Date(dayBookings.value[i].start.dateTime);
    // console.log('START = ' + moment(dateStartTmp.toString()).format());

    let date = new Date(dayBookings.value[i].start.dateTime);
    console.log('REAL = ' + dayBookings.value[i].start.dateTime);
    console.log('START = ' + date.toISOString());

    let date2 = new Date(dayBookings.value[i].end.dateTime);
    console.log('REAL = ' + dayBookings.value[i].end.dateTime.toString());
    console.log('END = ' + date2.toISOString());

    let dateStart = new Date(dayBookings.value[i].start.dateTime);
    dateStart.setTime(dateStart.getTime() + (1 * 60 * 10000 * 24)); // +4

    let dateEnd = new Date(dayBookings.value[i].end.dateTime);
    dateEnd.setTime(dateEnd.getTime() + (1 * 60 * 10000 * 24) ); // +4

    
    dayBookings.value[i].start.dateTime = dateStart.toISOString();
    dayBookings.value[i].end.dateTime = dateEnd.toISOString();

    console.log("Adjusted start = " + dayBookings.value[i].start.dateTime);
    console.log("Adjusted End = " + dayBookings.value[i].end.dateTime);

  }

  document.getElementById("details").innerHTML ="     "+ venue +" | "+ cDay ;

  var table = document.getElementById("bookings");


  var d = new Date();
  var hour= d.getHours();

  var min = d.getMinutes();
  if (min<10){
    min="0"+min;
  }
  var time = hour+":"+min;

  var checker=[],othercheck=[];


  for (let n = 0; n < dayBookings.value.length; n++){
    var startTime,endMin,endHour;
      startTime=dayBookings.value[n].start.dateTime;
      var endTime=dayBookings.value[n].end.dateTime;
    for (let m = 0; m < 11; m++) {
      endTime = endTime.substr(1);
      console.log(endTime);
    }

    endTime = endTime.substr(0, 5);
    console.log(endTime);
    endHour=endTime.substr(0,2);
    console.log(endHour);
    endMin=endTime.substr(3,6);
      if (endHour>hour){
       
        //document.getElementById("verify").innerHTML = endTime + "||" + time;

       checker.push(startTime);
     //  othercheck.push(endTime);
      }

      console.log(endMin);
    

  }
 //document.getElementById("verify").innerHTML = endTime+"||"+time;
 checker.sort();
 var things="";
 //var testing="";
  for (let n = 0; n < dayBookings.value.length; n++) {
   //   testing=testing+"|||"+otherchecker[n];
    things=things+"||||"+checker[n];
  }

 // document.getElementById("verify").innerHTML = othercheck;

for (let v=0;v<checker.length;v++){
        

  for (let t = 0; t < dayBookings.value.length; t++) {
      // TODO(egeldenhuys): Filter for different locations, replace FILTER.
      if (dayBookings.value[t].location.uniqueId !== "FILTER") {
        var startTime = dayBookings.value[t].start.dateTime;

        if (startTime==checker[v]){
        var  EndTime,
            // startValue,
            // endValue;
            EndTime = dayBookings.value[t].end.dateTime;

          for (let j = 0; j < 11; j++) {
            startTime = startTime.substr(1);
          }

          startTime = startTime.substr(0, 5);

          for (let m = 0; m < 11; m++) {
            EndTime = EndTime.substr(1);
          }

          EndTime = EndTime.substr(0, 5);
          // FIX:
          //EndTime = endTime;
          // document.getElementById("verify").innerHTML = EndTime;
          var booker, subject;
          booker = dayBookings.value[t].organizer.emailAddress.name;
          subject = dayBookings.value[t].subject;

 

          var row = table.insertRow(v+ 1);

          var cell1 = row.insertCell(0);
          cell1.style.fontSize = "22px";
          var cell2 = row.insertCell(1);
          cell2.style.fontSize = "22px";

          cell1.innerHTML = startTime + " - " + EndTime;
          cell1.style.color = "white";
        //  cell1.style.border = "solid black 1px";
          cell1.style.height = "70px";
          cell2.innerHTML = subject;
          cell2.style.color = "white";
         // cell2.style.border = "solid black 1px";
          cell2.style.height = "70px";

          var et = dayBookings.value[t].end.dateTime;// end time
          
          for (let m = 0; m < 15; m++) {
            et = et.substr(1);
          }

          et = et.substr(0, 6);
         var eh = et.substr(0, 3);// end hour
         var em = et.substr(4, 6);//end minute

          var st = dayBookings.value[t].end.dateTime;// start time
          for (let m = 0; m < 15; m++) {
            sh = et.substr(1);
          }

         st  = st.substr(0, 6);
         var sh  = startTime.substr(0, 2);// start hour
         var sm = startTime.substr(3, 4);//start minute
         
         // FIX
         eh = endHour;
         em = endMin;
        

         console.log('EH: ' + eh + '/' + hour);
         console.log('SH: ' + sh + '/' + hour);

         console.log('SM:' + sm + '/' + min)
          if (eh >= hour && hour>=sh ) {
                {if (em>=min && min>=sm){
              cell1.style.backgroundColor = "rgb(100,0,0)";
              cell1.style.height = "100px";
              cell1.style.fontSize = "30px";
              document.getElementById("verify").innerHTML = em;
              cell2.style.backgroundColor = "rgb(100,0,0)";
              cell2.style.height = "100px";
              cell2.style.fontSize = "30px";
                }
          }
            
          } 

        }
      }
    }
  }

  if (checker.length==0){
    var body = document.getElementById("check");
        body.innerHTML="NO UPCOMING BOOKINGS TODAY";
        body.style.height="300px";
        body.style.backgroundColor="rgb(200,200,200)";
        body.style.fontSize="60px";
        body.style.color="rgb(200,0,0)";
        table.style.display="none";
        
  }
  console.log("Transform end");
    var timer= document.getElementById("time");
    timer.innerHTML=time;
    timer.style.fontSize="50px";
    timer.style.fontStyle='Arial';
    timer.style.color="rgb(200,0,0)";
}
