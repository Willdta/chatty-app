Chatty App
=====================

A chat app built with websockets, allowing users to communicate with each other on the same host

### Main Folder Usage

1. Fork and clone
2. npm install
3. run npm start
3. open on http://localhost:3000

### Chatty-Server Folder Usage

1. npm install
2. run npm start inside that folder

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

* For uuid, please require your version: 'uuid/v(your version)'

### Main Folder Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
