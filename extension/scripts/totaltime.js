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
        return (days + " days " + hours + " hr " + minutes + " min");
    }
    else {
        return (minutes + " min");
    }
}

export function totalTime(db) {
    document.getElementById('totalTime').innerHTML = timeConversion(Math.round(countTotalTime(db) / 4));
    var advancedData = document.getElementById('total-time-data');
    for (var i = 0; i < Math.min(5, db.length); i++) {
        var siteTime = Math.round((db[i].unixTimeStamps.length / 4))
        var siteUrl = db[i].website;
        var position = i + 1;
        advancedData.innerHTML += position + ". " + siteUrl + " [" + timeConversion(Math.round(db[i].unixTimeStamps.length / 4)) + "]" + "<br>";
    }
}

function countTotalTime(db) {
    var counter = 0
    for (let i = 0; i < db.length; i++) {
        counter = counter + db[i].unixTimeStamps.length
    }
    return counter
}

