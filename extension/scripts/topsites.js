export function mostVisited(db)
{
    
    var advancedData = document.getElementById('top-sites-data');
    console.log(db.length)
    console.log(Math.min(5, db.length))
    for (var i = 0; i < Math.min(5, db.length); i++) 
    {
        var siteVisits = db[i].visits;
        var siteUrl = db[i].website;
        var position = i + 1;
        advancedData.innerHTML += position + ". " + siteUrl + " [" + siteVisits + " visits]" + "<br>";      
    }

    var displayData = document.getElementById('topSites');

    for (var i = 0; i < Math.min(5, db.length); i++) 
    {
        var siteVisits = db[i].visits;
        var siteUrl = db[i].website;
        var position = i + 1;
        displayData.innerHTML += siteUrl + " ";      
    }
}
