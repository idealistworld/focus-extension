export function timeToday(db)
{ var sortedList;
    var totalTimeToday = 0;
    for (var x = db.length -1; x > 0; x--)
    {
        var siteTimeToday= 0;
        for (var i = db[x].unixTimeStamps.length - 1; i >= 0; i--)
        {
            var databaseInput = db[x].unixTimeStamps;
            if (Math.floor(Date.now() / 1000) - databaseInput[i] < 86400)
            {
                totalTimeToday += 1;      
                siteTimeToday += 1;      
            } 
        }
        db[x].unixTimeStamps["timeToday"] = siteTimeToday;
       // alert( db[x].website + " " + db[x].unixTimeStamps.timeToday);
    }
    var displayData = document.getElementById('timeToday');
    displayData.innerHTML = totalTimeToday/4 + " minutes";

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }}

    var sortedList = db.sort(dynamicSort("timeToday"));

    var advancedData = document.getElementById('time-today-data');

    var position = 1;

    for (var i = 0; i < 6; i++) {
        var siteTimeToday =  sortedList[i].unixTimeStamps.timeToday/4;
        var siteUrl = sortedList[i].website
        if(sortedList[i].website != "newtab"){
            advancedData.innerHTML += position + ". " + siteUrl + " [" + siteTimeToday + " minutes]" + "<br>";
            position +=1;
        }
      
    }
}

