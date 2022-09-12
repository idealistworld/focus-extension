function compareTime(a, b) {

    return b.visits - a.visits;
}


export function mostVisited()
{
    chrome.storage.local.get({
        sitesVisited: [],
        sitesData: []
      }, function (items) {
        var sortedViews = items.sitesData.sort(compareTime);
        var advancedData = document.getElementById('top-sites-data');

        for (var i = 0; i < 5; i++) 
        {
            var siteVisits = sortedViews[i].visits;
            var siteUrl = sortedViews[i].url;
            var position = i + 1;
            advancedData.innerHTML += position + ". " + siteUrl + " [" + siteVisits + " visits]" + "<br>";      
        }

        var displayData = document.getElementById('topSites');

        for (var i = 0; i < 3; i++) 
        {
            var siteVisits = sortedViews[i].visits;
            var siteUrl = sortedViews[i].url;
            var position = i + 1;
            displayData.innerHTML += siteUrl + " ";      
        }
      });
}
