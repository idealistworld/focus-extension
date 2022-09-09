export function mostVisited(urls)
{   
    var url= document.getElementById('topSites');
    for (var i = 0; i < 3; i++) 
    {
        var site = urls[i];
        var input = site.url.substring(8, site.url.length-1);
        url.innerHTML += input + " ";      
    }
    var data = document.getElementById('top-sites-data');
    for (var i = 0; i < 5; i++) 
    {
        var site = urls[i];
        var input = site.url.substring(8, site.url.length-1);
        var position = i + 1;
        data.innerHTML += position + ". " + input + "<br>";      
    }
}

chrome.topSites.get(mostVisited);