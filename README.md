Chatty App
=====================

A chat app built with websockets, allowing users to communicate with each other on the same host

### Images

["Main UI"](https://github.com/Willdta/chatty-app/blob/master/docs/Main%20UI.PNG?raw=true)
["Chat with Giphys"](https://github.com/Willdta/chatty-app/blob/master/docs/giphy%20communication.PNG?raw=true)

### Main Folder Usage

1. Fork and clone
2. `npm install`
3. `npm start`
4. open on http://localhost:3000
open on http://localhost:3000

### Chatty-Server Folder Usage

Please install dependencies inside `chatty-server` folder

1. `npm install`
2. `npm start`

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Chatty-Server Folder Dependencies

* express
* ws
* uuid
* querystring
* node-fetch

* For uuid, please require your version:

```
const 
```

### Main Folder Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
