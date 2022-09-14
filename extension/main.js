//Log the Visit to our db
storage = new LocalStorage()

//Copied from background.js
//Get the URL and clip it
function urlToWebsite (_url) {
  //Remove everything before "//"
  const reg = /\/\/(.*)/gm
  var match = _url.match(reg)
  var found = JSON.stringify(match).slice(4,-2)
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

//Turns url into properly formatted website
var url = window.location.href
var website = urlToWebsite(url)

//Add to db
function genOnLoad (curUrl) {
  return function (result) {
    console.log(JSON.stringify(result))
    var db = result
    var found = checkDB(db, curUrl)
    if (found === -1) {
      db.push({"website": curUrl, unixTimeStamps: [], "visits": 1})
    } else {
      db[found].visits += 1
    }
    storage.save("db", db)
  }
}

function genOnLoadEmpty (curUrl) {
  return function (result) {
    const db = []
    db.push({"website": curUrl, unixTimeStamps: [], "visits": 1})
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

storage.load("db", genOnLoad(website), genOnLoadEmpty(website))


//Ping the background script to keep it from getting onloaded
function pingBG() {
  chrome.runtime.sendMessage({func: "ping", message: "pong"}, function(response) {
    //console.log(response.farewell);
  });
}

//Ping every 4 mins
pingBG()
setInterval(pingBG, 240000)