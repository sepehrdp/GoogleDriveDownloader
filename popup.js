const dnVideo_btn = document.getElementById('downloadVideo'),
Video_sel = document.getElementById('videoQuality'),
dnAudio_btn = document.getElementById('downloadAudio'),
Audio_sel = document.getElementById('audioQuality'),
stat = document.getElementById('status');
rmcache_btn = document.getElementById('removeCache')

rmcache_btn.addEventListener("click", function(){
  stat.innerText = 'Cache removed!'
  chrome.runtime.sendMessage({action: 'rmcache'})
})

dnAudio_btn.addEventListener('click', function(){
  stat.innerText = "getting Audio..."
  chrome.runtime.sendMessage({action: "getReq", itag: Audio_sel.value}, (st)=>{stat.innerText = st})
})

dnVideo_btn.addEventListener('click', function(){
  stat.innerText = "getting Video..."
  chrome.runtime.sendMessage({action: "getReq", itag: Video_sel.value}, (st)=>{stat.innerText = st})
})