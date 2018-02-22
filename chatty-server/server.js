const express = require('express')
const SocketServer = require('ws').Server
const uuid = require('uuid/v4')
const querystring = require('querystring')
const fetch = require('node-fetch')
// Set the port to 3001
const PORT = 3001

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

let counter = 0

const countConnections = {
  type: 'counting connections'
}

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data))
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', handleMessage)

  counter++
  countConnections.count = counter
  console.log(countConnections.count)
  wss.broadcast(countConnections)

  ws.on('close', () => {
    counter--
    countConnections.count = counter
    console.log(countConnections.count)

    wss.broadcast(countConnections)
    console.log('Client disconnected')
  })
})

function handleMessage(message) {
  let parsedMessage = JSON.parse(message)
  parsedMessage.id = uuid()
  console.log(message)

  if (matches = parsedMessage.content.match(/^\/giphy (.+)$/)) {
    let qs = querystring.stringify({
      api_key: 'FHIiLMHz4VuWvnXvdlUBAtI61kEqEuN4',
      tag: matches[1]
    })
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then(resp => {
        return resp.json()
      })
      .then(json => {
        parsedMessage.content = `<img style="width:40%;height:50%;" src="${json.data.image_url}" alt=""/>`
        wss.broadcast(parsedMessage)
        console.log(`Sent: ${parsedMessage}`)
      })
  } else if (matches = parsedMessage.content.match(/\.jpg$|\.gif$|\.png$/)) {
    parsedMessage.content = `<img style="width:40%;height:50%;" src="${parsedMessage.content}" alt=""/>`
    wss.broadcast(parsedMessage)
    console.log(`Sent: ${parsedMessage}`)
  } else {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(parsedMessage))
      console.log('message send', JSON.stringify(parsedMessage))
    })
  }
}