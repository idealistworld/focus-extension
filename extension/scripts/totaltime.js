function compareTime(a, b) {

    return b.time - a.time;
}


export function totalTime()
{
    var accumulatedTime = 0;
    chrome.storage.local.get({
        sitesVisited: [],
        sitesData: []
      }, function (items) {
        const sitesData = items.sitesData;
        sitesData.forEach((site) => {
            accumulatedTime += site.time;
        })
        document.getElementById('totalTime').innerHTML = Math.round(accumulatedTime/60) + " minutes";
        var advancedData = document.getElementById('total-time-data');
        var sortedTimes = items.sitesData.sort(compareTime);

        for (var i = 0; i < 5; i++) 
        {
            var siteTime = sortedTimes[i].time;
            var siteUrl = sortedTimes[i].url;
            var position = i + 1;
            advancedData.innerHTML += position + ". " + siteUrl + " [" + Math.round(siteTime/60) + " minutes]" + "<br>";      
        }
      });
}
