//Get the URL and clip it
function removeWww (urlvar) {
  if (urlvar.indexOf("www.") === -1) {
      return urlvar;
  } else {
    return urlvar.substring(4);
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      if (request.func === "ping") {
        console.log(request.message)
          sendResponse({farewell: "ping"});
      }
  }
);



//Check what the current page is every second
var currentTime = 0;
const currentPage = () =>
{
  var currentUrl = "hi";
  currentTime++;
  console.log(`OG: ${currentUrl} Current: ${currentUrl} Time: ${currentTime}`);
}

setInterval(currentPage, 1000);

