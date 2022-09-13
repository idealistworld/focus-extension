try {
  importScripts("./scripts/storage.js");
} catch (e) {
  console.log(e);
}
storage = new LocalStorage()

//Get the URL and clip it
function urlToWebsite (_url) {
  //Remove everything before "//"
  const reg = /\/\/(.*)/gm
  var match = _url.match(reg)
  var found = JSON.stringify(match).slice(4,-4)
  //Remove everything after the first "/"
  var found2 = found.slice(0, found.indexOf("/"))
  //console.log(_url + " match " + typeof(match) + " found " + found + ")
  //Remove WWW
  if (found2.indexOf("www.") === -1) {
    return found2;
  } else {
    return found2.substring(4);
  }
}

//Keep the service worker running
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
      if (request.func === "ping") {
        console.log(request.message)
          sendResponse({farewell: "ping"});
      }
  }
);

//Check what the current page is every 15 seconds
var currentTime = 0;
const currentPage = () =>
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var curUrl = urlToWebsite(JSON.stringify(tabs[0].url))
    currentTime = currentTime + 15;
    console.log(`Time: ${currentTime} Url: ${curUrl}`);
    storage.load("db", genOnLoad(curUrl), genOnLoadEmpty(curUrl))
 });
}

function genOnLoad (curUrl) {
  return function (result) {
    console.log(JSON.stringify(result))
    var db = result
    var found = checkDB(db, curUrl)
    if (found === -1) {
      db.push({"website": curUrl, unixTimeStamps: [Math.floor(Date.now() / 1000)], "visits": 1})
    } else {
      unixTimeStampsArr = db[found].unixTimeStamps
      unixTimeStampsArr.push(Math.floor(Date.now() / 1000))
      db[found].unixTimeStamps = unixTimeStampsArr
    }
    storage.save("db", db)
  }
}

function genOnLoadEmpty (curUrl) {
  return function (result) {
    const db = []
    db.push({"website": curUrl, unixTimeStamps: [Math.floor(Date.now() / 1000)], "visits": 1})
    storage.save("db", db)
  }
}

function checkDB (db, curUrl) {
  for (let i = 0; i < db.length; i++) {
    if (db[i].website == curUrl) {
      return i
    }
  }
  return -1
}



currentPage()
setInterval(currentPage, 15000);

