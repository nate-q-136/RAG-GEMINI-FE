const serverUrls = {
    http: 'http://localhost:8000',
    ws: 'ws://localhost:8000',
}

if (process.env.NODE_ENV === 'production') {
    serverUrls.http = 'https://api.gechat.nateq-dev.io.vn'
    serverUrls.ws = 'wss://api.gechat.nateq-dev.io.vn'
}

export default serverUrls