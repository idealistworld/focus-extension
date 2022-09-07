import {mostVisited} from "../../scripts/topsites.js";

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
    document.getElementById("stat-box-total-time").addEventListener("mouseover", displayTotalTime);
    document.getElementById("stat-box-total-time").addEventListener("mouseout", hideTotalTime);

    document.getElementById("stat-box-time-today").addEventListener("mouseover", displayTimeToday);
    document.getElementById("stat-box-time-today").addEventListener("mouseout", hideTimeToday);

    document.getElementById("stat-box-top-sites").addEventListener("mouseover", displayTopSites);
    document.getElementById("stat-box-top-sites").addEventListener("mouseout", hideTopSites);

    document.getElementById("stat-box-friends-stats").addEventListener("mouseover", displayFriendsStats);
    document.getElementById("stat-box-friends-stats").addEventListener("mouseout", hideFriendsStats);
}

window.onload(onLoad());