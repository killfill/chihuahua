function loadScript(src){
    var el = document.createElement('script')
    el.setAttribute('type','text/javascript')
    el.setAttribute('src', src)
    document.getElementsByTagName('head')[0].appendChild(el)
}

loadScript('//localhost:3001/livereload.js')

console.log('---> With Live Reload!')