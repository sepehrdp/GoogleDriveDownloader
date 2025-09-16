let ReqList = [];
chrome.webRequest.onBeforeRequest.addListener((details) => {
  if (details.url.includes('.drive.google.com/videoplayback') && (details.url.includes('mime=video') || details.url.includes('mime=audio'))) {
    ReqList.unshift(details.url.split('&range')[0])
  }
}, { urls: ["<all_urls>"] })

function get_fname(itag) {
  let name = undefined;
  switch (itag) {
    case '134': name = 'videoplayback.mp4'; break;
    case '135': name = 'videoplayback.mp4'; break;
    case '136': name = 'videoplayback.mp4'; break;
    case '137': name = 'videoplayback.mp4'; break;
    case '140': name = 'videoplayback.m4a'; break;
    case '141': name = 'videoplayback.m4a'; break;

  }
  return name
}

function download(url, fname) {
  chrome.downloads.download({ url: url, filename: fname, saveAs: true })
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getReq') {
    let in_ = false;
    for (const el of ReqList) {
      if (el.includes(`&itag=${request.itag}`)) {
        download(el, get_fname(request.itag))
        sendResponse('downloading file...')
        in_ = true
        return
      }
    }
    if (!in_) {
      sendResponse('File Not Found!')
    }
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {if (request.action === 'rmcache'){ReqList = [];}})