const express = require('express')
const SocketServer = require('ws').Server
const uuid = require('uuid/v4')
const querystring = require('querystring')
const fetch = require('node-fetch')
const htmlColors = require('html-colors')
// Set the port to 3001
const PORT = 3001

// Create a new express server
const server = express()
  
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Generate a random color for a users username
let randomColours

// Initialize a counter for websocket connections
let counter = 0

// Make an object to allow us to reference its keys in the client side "type" and "count"
const countConnections = {
  type: 'counting connections'
}

// Broadcast to every user connected to same host
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data))
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected')

  // Initiate the function for each unique connection
  randomColours = htmlColors.random()
  
  // On message submit, call this function
  ws.on('message', handleMessage)
  
  // Increment
  counter++
  
  // Set key to be counter
  countConnections.count = counter
  console.log(countConnections.count)
  
  // Send it off
  wss.broadcast(countConnections)
  
  // Connection close
  ws.on('close', () => {
    counter--
    countConnections.count = counter
    console.log(countConnections.count)
    
    wss.broadcast(countConnections)
    console.log('Client disconnected')
  })
})

// This function handles what happens on message submit
function handleMessage(message) {
  let parsedMessage = JSON.parse(message)
  
  // Generate unique user ID
  parsedMessage.id = uuid()

  // Pass random color to client
  parsedMessage.randomColours = randomColours
  console.log(message)

  // If the content matches "/giphy", display something from giphy
  if (matches = parsedMessage.content.match(/^\/giphy (.+)$/)) {
    let qs = querystring.stringify({
      api_key: 'FHIiLMHz4VuWvnXvdlUBAtI61kEqEuN4',
      tag: matches[1]
    })

    // Fetch this site (giphy)
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then(resp => {
        return resp.json()
      })

      // Grab a random image from Giphys JSON and display it
      .then(json => {
        parsedMessage.content = `<img style="width:40%;height:50%;" src="${json.data.image_url}" alt=""/>`
        wss.broadcast(parsedMessage)
        console.log(`Sent: ${parsedMessage}`)
      })

  // Here we grab any jpg, gif, png file    
  } else if (matches = parsedMessage.content.match(/\.jpg$|\.gif$|\.png$/)) {
      parsedMessage.content = `<img style="width:40%;height:50%;" src="${parsedMessage.content}" alt=""/>`
      wss.broadcast(parsedMessage)
      console.log(`Sent: ${parsedMessage}`)
  
  // Otherwise, just display the message
  } else {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(parsedMessage))
      console.log('message send', JSON.stringify(parsedMessage))
    })
  }
}