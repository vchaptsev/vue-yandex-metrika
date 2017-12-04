import config from './config'

export function loadScript () {
    return new Promise((resolve, reject) => {
        var head = document.head || document.getElementsByTagName('head')[0]
        const script = document.createElement('script')

        script.async = true
        script.charset = 'utf8'
        script.src = 'https://mc.yandex.ru/metrika/watch.js'

        head.appendChild(script)

        script.onload = resolve
        script.onerror = reject
    })
}

export function merge (obj, src) {
    Object.keys(src).forEach(function (key) {
        if (obj[key] && typeof obj[key] === 'object') {merge(obj[key], src[key]); return}
        obj[key] = src[key]
    })

  return obj
}
