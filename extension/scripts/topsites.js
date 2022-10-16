export function mostVisited(db) {
    var advancedData = document.getElementById('top-sites-data');
    console.log(db.length)
    console.log(Math.min(5, db.length))

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

    var sortedList = db.sort(dynamicSort("visits"));

  

    for (var i = sortedList.length -1; i > sortedList.length - 6; i--) {
        var siteVisits =  sortedList[i].visits;
        var siteUrl = sortedList[i].website
        var position = sortedList.length - i;
        advancedData.innerHTML += position + ". " + siteUrl + " [" + siteVisits + " visits]" + "<br>";
    }

    var displayData = document.getElementById('topSites');

    displayData.innerHTML = "";
    for (var i = sortedList.length -1; i > sortedList.length - 6; i--) {
        var siteVisits =  sortedList[i].visits;
        var siteUrl = sortedList[i].website
        var position = sortedList.length - i;
        displayData.innerHTML += siteUrl + " ";
    }
}
