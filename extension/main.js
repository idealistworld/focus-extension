var currentTime = 0;
var visitAdded = false;

//Get the URL and clip it
function removeWww(urlvar) {
  if (urlvar.indexOf("www.") === -1) {
    return urlvar;
  } else {
    return urlvar.substring(4);
  }
}
var url = removeWww(window.location.host);

//Getters and setters for the site lists
function getVisitedSites() {
  chrome.storage.local.get({
    sitesVisited: [],
    sitesData: []
  }, function (items) {
    const sitesVisited = items.sitesVisited;
    const sitesData = items.sitesData;
    updateVisitedSites(sitesVisited, sitesData, removeWww(window.location.host));
  });
}

function updateVisitedSites(sitesVisitedList, sitesDataList, _urlvar) {
  if (sitesVisitedList.indexOf(_urlvar) === -1) {
    var site = {
      url: _urlvar,
      time: currentTime,
      visits: 1
    }
    sitesDataList.push(site);
    sitesVisitedList.push(_urlvar);
    chrome.storage.local.set({
      sitesVisited: sitesVisitedList,
      sitesData: sitesDataList
    }, function () {
    });
  }
}

//Changing data within the data lists
function displaySiteData(url) {
  chrome.storage.local.get({
    sitesData: [],
    sitesVisited: []
  }, function (items) {
    var index = items.sitesVisited.indexOf(url);
   // alert(items.sitesData[index].url + " " + items.sitesData[index].time + " " + items.sitesData[index].visits);
  });
}

function updateStats() {
  getSitesToUpdate();
  }

function getSitesToUpdate ()
{
  chrome.storage.local.get({
    sitesData: [],
    sitesVisited: []
  }, function (items) {
    var index = items.sitesVisited.indexOf(url);
    var currentVisits = items.sitesData[index].visits;
    const sitesDataChanged = items.sitesData;
    sitesDataChanged[index].time =  sitesDataChanged[index].time + 10;
    if (visitAdded === false)
    {
      sitesDataChanged[index].visits = currentVisits + 1;
      visitAdded = true;
    }
    updateLists(sitesDataChanged)
  })
  }

  function updateLists (sitesDataChanged) {
    chrome.storage.local.set({
      sitesData: sitesDataChanged
    }, function () {
    });
  }



const currentPage = () => {
  currentTime++;
  getVisitedSites();
  displaySiteData(removeWww(window.location.host));
  updateStats();
}

//setInterval(currentPage, 10000);

//Ping the background script to keep it from getting onloaded
function pingBG() {
  chrome.runtime.sendMessage({func: "ping", message: "pong"}, function(response) {
    //console.log(response.farewell);
  });
}

//Ping every 4 mins
pingBG()
setInterval(pingBG, 240000)