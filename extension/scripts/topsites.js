export function mostVisited(urls)
{   
    var url= document.getElementById('most-visted-sites-content');
    for (var i = 0; i < 5; i++) 
    {
        url.innerHTML += urls[i].url + "<br>";      
    }
}

chrome.topSites.get(mostVisited);