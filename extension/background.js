//Get the URL and clip it
function removeWww (urlvar) {
  if (urlvar.indexOf("www.") === -1) {
      return urlvar;
  } else {
    return urlvar.substring(4);
  }
}
var url = removeWww(window.location.host);



//Check what the current page is every second
var currentTime = 0;
const currentPage = () =>
{
  var currentUrl = removeWww(window.location.host);
  currentTime++;
  alert(`OG: ${url} Current: ${currentUrl} Time: ${currentTime}`);
}

setInterval(currentPage, 1000);