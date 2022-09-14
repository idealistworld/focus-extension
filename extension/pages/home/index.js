import {mostVisited} from "../../scripts/topsites.js";
import { totalTime } from "../../scripts/totaltime.js";
//importing not working for class
class LocalStorage {
    load(name, callback, callbackIsUndefined) {
        chrome.storage.local.get(name, function(item) {
            if (item[name] !== undefined) {
                var result = item[name];
                if (result !== undefined)
                    callback(result);
            } else {
                if (callbackIsUndefined !== undefined)
                    callbackIsUndefined();
            }
        });
    }

    save(name, value) {
        chrome.storage.local.set({
            [name]: value
        });
    }

    getMemoryUse(name, callback) {
        chrome.storage.local.getBytesInUse(name, function(item) {
            if (item !== undefined) {
                callback(item[name]);
            }
        });
    };

    test() {
        console.log("imported")
    }
}

//Sort the Database
var storage = new LocalStorage()
function empty () {
    console.log("Nothing to sort, db is empty")
}

function sort(result) {
    result.sort(compareTime)
    storage.save("db", result)
    console.log(result[0].unixTimeStamps.length)
    totalTime(result);
    result.sort(compareVisits)
    console.log(result)
    mostVisited(result);
}

function compareTime( a, b ) {
    if ( a.unixTimeStamps.length > b.unixTimeStamps.length ){
      return -1;
    } else {
        return 1;
    }
}

function compareVisits ( a, b ) {
    if ( a.unixTimeStamps.visits > b.unixTimeStamps.visits ){
        return -1;
      } else {
          return 1;
      }
}

function sortDB() {
    storage.load("db", sort, empty)
}

const loadData = () =>
{    
    mostVisited();
}

const displayTotalTime = () =>
{
    document.getElementById("total-time-expand").style.display = "inline";
    document.getElementById("bonsai").style.display = "none";

}

const hideTotalTime = () =>
{
    document.getElementById("total-time-expand").style.display = "none";
    document.getElementById("bonsai").style.display = "inline";

}

const displayTimeToday = () =>
{
    document.getElementById("time-today-expand").style.display = "inline";
    document.getElementById("bonsai").style.display = "none";

}

const hideTimeToday = () =>
{
    document.getElementById("time-today-expand").style.display = "none";
    document.getElementById("bonsai").style.display = "inline";
}

const displayTopSites = () =>
{
    document.getElementById("top-sites-expand").style.display = "inline";
    document.getElementById("bonsai").style.display = "none";

}

const hideTopSites = () =>
{
    document.getElementById("top-sites-expand").style.display = "none";
    document.getElementById("bonsai").style.display = "inline";
}

const displayFriendsStats = () =>
{
    document.getElementById("friends-stats-expand").style.display = "inline";
    document.getElementById("bonsai").style.display = "none";

}

const hideFriendsStats = () =>
{
    document.getElementById("friends-stats-expand").style.display = "none";
    document.getElementById("bonsai").style.display = "inline";
}

const onLoad = () =>
{
    sortDB();
    document.getElementById("stat-box-total-time").addEventListener("mouseover", displayTotalTime);
    document.getElementById("stat-box-total-time").addEventListener("mouseout", hideTotalTime);

    document.getElementById("stat-box-time-today").addEventListener("mouseover", displayTimeToday);
    document.getElementById("stat-box-time-today").addEventListener("mouseout", hideTimeToday);

    document.getElementById("stat-box-top-sites").addEventListener("mouseover", displayTopSites);
    document.getElementById("stat-box-top-sites").addEventListener("mouseout", hideTopSites);

    document.getElementById("stat-box-friends-stats").addEventListener("mouseover", displayFriendsStats);
    document.getElementById("stat-box-friends-stats").addEventListener("mouseout", hideFriendsStats);
}

window.onload = onLoad();