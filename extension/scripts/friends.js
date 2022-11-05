import { initializeApp } from "../fb/fb.js";
import { getAnalytics } from "../fb/analytics.js";
import { getFirestore, addDoc, collection, updateDoc, doc, getDoc } from "../fb/firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-6ZVFyT6q4v43UMSPJL8nmCy2FKSTsH8",
    authDomain: "focusin-5fc10.firebaseapp.com",
    projectId: "focusin-5fc10",
    storageBucket: "focusin-5fc10.appspot.com",
    messagingSenderId: "607053709442",
    appId: "1:607053709442:web:d90379970f693e6b25b49b",
    measurementId: "G-ZYQHPG79PC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const collectionRef = collection(database, "users");

function createFriendList() {
    chrome.storage.local.get(['friends'], function (result) {
        if (result.friends == null) {
            chrome.storage.local.set({ friends: [] }, function () {
            });
        }
    });
}

function handleDataUpdate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;
    chrome.storage.local.get(['currentDay'], function (result) {
        if (result.currentDay == null) {
            chrome.storage.local.set({ currentDay: today }, function () {
            });
        }
        if (result.currentDay != today) {
            updateStats();
            chrome.storage.local.set({ currentDay: today }, function () {
            });
        }
    });
}

async function updateStats() {
    chrome.storage.local.get(['id'], function (result) {
        var time = document.getElementById("totalTime").innerHTML;
        var timeToday = document.getElementById("timeToday").innerHTML;
        const docRef = doc(database, "users", result.id);
        updateDoc(docRef, { totalTime: time, timeToday: timeToday })
            .then(docRef => {
                console.log("Stats updated.");
            })
            .catch(error => {
                alert(error);
            })
    });
}

async function addFriend() {
    chrome.storage.local.get(['friends'], function (result) {
        var db = result.friends;
        var newFriend = document.getElementById("add-friend-input").value;
        if (result.friends.indexOf(newFriend) == -1 && newFriend != "") {
            db.push(newFriend)
        }
        else {
            alert("Friend is already added or invalid input!")
            document.getElementById("add-friend-input").value = "";
            return;
        }
        chrome.storage.local.set({ friends: db }, function () {
            alert("Friend added!")
            document.getElementById("add-friend-input").value = "";
        });
    });
}

async function clearAllFriends() {
    chrome.storage.local.get(['friends'], function (result) {
        chrome.storage.local.set({ friends: [] }, function () {
            alert("Friend list cleared!")
        });
    });
}

async function setUsername() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;
    var totalTime = document.getElementById("totalTime").innerHTML;
    var timeToday = document.getElementById("timeToday").innerHTML;
    var username = document.getElementById("username-input").value;
    const docRef = await addDoc(collection(database, "users"), {
        username: username,
        totalTime: totalTime,
        timeToday: timeToday,
        created: today
    });
    chrome.storage.local.set({ id: docRef.id }, function () {
        username = document.getElementById("username-input").value = "";
        alert("Your username is set!")
    });
    chrome.storage.local.set({ username: username }, function () {
    });
}

function checkIfUsername() {
    chrome.storage.local.get(['username'], function (result) {
        document.getElementById("username").innerHTML = "Username: " + result.username;
        if (result.username.length >= 1) {
            document.getElementById("username-input").style.display = "none";
            document.getElementById("set-username").style.display = "none";
        }
    });
}

function removeFriend() {
    var removeIndex;
    var g = document.getElementById('friend-data');
    for (var i = 0, len = g.children.length; i < len; i++) {
        (function (index) {
            g.children[i].onclick = function () {
                removeIndex = index / 2;
            }
        })(i);
    }
    chrome.storage.local.get(['friends'], function (result) {
        var db = result.friends;
        db.splice(removeIndex, 1);
        chrome.storage.local.set({ friends: db }, function () {
        });
    })
    location.reload();
    alert("Friend removed.");
}

function setFriendStats (){
    var advancedData = document.getElementById("friend-data");
    advancedData.innerHTML = "";
    chrome.storage.local.get(['friends'], function (result) {
        var db = result.friends;
        var username;
        var totalTime;
        var timeToday
        var advancedData = document.getElementById("friend-data");
        for (var i = 0; i < db.length; i++) {
            var id = db[i];
            const docRef = doc(database, "users", id)
            getDoc(docRef).then((doc) => {
                username = doc.data().username;
                totalTime = doc.data().totalTime;
                timeToday = doc.data().timeToday;
                advancedData.innerHTML += "<div style = 'display: inline'>@" + username + " | time in total: " + totalTime + " | last 24HR: " + timeToday + " | " + "<h4 id = 'removeFriend' style = 'display:inline; font-weight: 100' class = 'remove-friend-x'> remove</h4></div><br>";
            }).then(setTimeout(setRemoveFriend, 500)).then(setTimeout(setRemoveFriend, 500)).then(setTimeout(setRemoveFriend, 500));
        }
    });
};



function setRemoveFriend() {
    var arr = [];
    var lol = document.getElementsByClassName('remove-friend-x');
    for (var i = 0; i < lol.length; i++) {
        arr.push(lol[i]);
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", removeFriend)
    }

}

function friendsAndUpdate() {
    setFriendStats();
    updateStats();
}

window.onload = function () {
    var refButton = document.getElementById('set-username');
    refButton.onclick = setUsername;
    var refButton = document.getElementById('add-friend-button');
    refButton.onclick = addFriend;
    var refButton = document.getElementById('clear-friend-button');
    refButton.onclick = clearAllFriends;
    var refButton = document.getElementById('stat-box-friends-stats');
    refButton.onmouseover = friendsAndUpdate;
    checkIfUsername();
    createFriendList();
    handleDataUpdate();
    chrome.storage.local.get(['id'], function (result) {
        var refButton = document.getElementById('user-id');
        refButton.innerHTML = "Friend code: " + result.id;
    });
}