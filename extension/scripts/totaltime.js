export function totalTime(db)
{
    document.getElementById('totalTime').innerHTML = Math.round((countTotalTime(db)/60)*15) + " minutes";
    var advancedData = document.getElementById('total-time-data');
    for (var i = 0; i < Math.min(5, db.length); i++) {
        var siteTime = Math.round((db[i].unixTimeStamps.length/60)*15)
        var siteUrl = db[i].website;
        var position = i + 1;
        advancedData.innerHTML += position + ". " + siteUrl + " [" + siteTime + " minutes]" + "<br>";      
    }
}

function countTotalTime(db) {
    var counter = 0
    for (let i = 0; i < db.length; i++) {
        counter = counter + db[i].unixTimeStamps.length
    }
    return counter
}

