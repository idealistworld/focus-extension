function timeConversion(mins) {
    var minutes = mins;
    var hours = 0;
    var days = 0;
    hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;

    if (hours > 0) {
        return (hours + " hr " + minutes + " min");
    }
    else if (hours > 24) {
        return (hours + " hr " + minutes + " min");
    }
    else {
        return (minutes + " min");
    }
}

export function timeToday(db) {
    var totalTimeToday = 0;
    for (var x = db.length - 1; x >= 0; x--) {
        var siteTimeToday = 0;
        for (var i = db[x].unixTimeStamps.length - 1; i >= 0; i--) {
            var databaseInput = db[x].unixTimeStamps;
            if (Math.floor(Date.now() / 1000) - databaseInput[i] < 86400) {
                totalTimeToday += 1;
                siteTimeToday += 1;
            }
        }
        db[x].unixTimeStamps["timeToday"] = siteTimeToday;
    }
    var displayData = document.getElementById('timeToday');

  

    displayData.innerHTML = timeConversion(Math.round(totalTimeToday / 4));

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a.unixTimeStamps[property] > b.unixTimeStamps[property]) ? -1 : (a.unixTimeStamps[property] < b.unixTimeStamps[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    var sortedList = db.sort(dynamicSort("timeToday"));

    var advancedData = document.getElementById('time-today-data');

    var position = 1;

    for (var i = 0; i < 5; i++) {
        var siteTimeToday = timeConversion(Math.round(sortedList[i].unixTimeStamps.timeToday / 4));
        var siteUrl = sortedList[i].website;
        advancedData.innerHTML += position + ". " + siteUrl + " [" + siteTimeToday + "]" + "<br>";
        position += 1;
    }
}

