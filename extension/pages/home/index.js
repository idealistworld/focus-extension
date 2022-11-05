import {mostVisited} from "../../scripts/topsites.js";
import { totalTime } from "../../scripts/totaltime.js";
import { timeToday } from "../../scripts/timetoday.js";


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

function clearData () {
    chrome.storage.local.clear()
    location.reload();
}

var clearDataButton = document.getElementById("clear-data-button");
clearDataButton.onclick = clearData;



//Sort the Database
var storage = new LocalStorage()
function empty () {
    console.log("Nothing to sort, db is empty")
}

function sort(result) {
    result.sort(compareTime);
    storage.save("db", result);
    console.log(result[0].unixTimeStamps.length);
    totalTime(result);
    result.sort(compareVisits);
    console.log(result);
    mostVisited(result);
    result.sort(compareTimeToday);
    timeToday(result);
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

function compareTimeToday ( a, b ) {
    if ( a.unixTimeStamps.length > b.unixTimeStamps.length ){
        return -1;
      } else {
          return 1;
      }
}

function closeSettings () {
    document.getElementById("settings-container").style.display = "none";
}

function openSettings () {
    document.getElementById("settings-container").style.display = "inline";
}

var closeSetting = document.getElementById("close-settings");
closeSetting.onclick = closeSettings;

var openSetting = document.getElementById("open-settings");
openSetting.onclick = openSettings;

function closeFriends () {
    document.getElementById("friends-container").style.display = "none";
}

function openFriends () {
    document.getElementById("friends-container").style.display = "inline";
}

var closeFriend = document.getElementById("close-friends");
closeFriend.onclick = closeFriends;

var openFriend = document.getElementById("open-friends");
openFriend.onclick = openFriends;


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

var timerRunning = false;

const displayFriendsStats = () =>
{
    document.getElementById("friends-stats-expand").style.display = "inline";
    document.getElementById("bonsai").style.display = "none";
    document.getElementById("stat-box-total-time").removeEventListener("mouseover", displayTotalTime);
    document.getElementById("stat-box-total-time").removeEventListener("mouseout", hideTotalTime);

    document.getElementById("stat-box-time-today").removeEventListener("mouseover", displayTimeToday);
    document.getElementById("stat-box-time-today").removeEventListener("mouseout", hideTimeToday);

    document.getElementById("stat-box-top-sites").removeEventListener("mouseover", displayTopSites);
    document.getElementById("stat-box-top-sites").removeEventListener("mouseout", hideTopSites);
}

const hidingFriendsStats = () => {
    document.getElementById("stat-box-total-time").addEventListener("mouseover", displayTotalTime);
    document.getElementById("stat-box-total-time").addEventListener("mouseout", hideTotalTime);

    document.getElementById("stat-box-time-today").addEventListener("mouseover", displayTimeToday);
    document.getElementById("stat-box-time-today").addEventListener("mouseout", hideTimeToday);

    document.getElementById("stat-box-top-sites").addEventListener("mouseover", displayTopSites);
    document.getElementById("stat-box-top-sites").addEventListener("mouseout", hideTopSites);
    document.getElementById("friends-stats-expand").style.display = "none";
    document.getElementById("bonsai").style.display = "inline";
    timeRunning = true;
}

const hideFriendsStats = () =>
{
    if (!timerRunning)
    {
        setTimeout(hidingFriendsStats, 8000)
    }
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