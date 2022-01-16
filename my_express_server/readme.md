Building a server using express.js

1) create a directory
2) create a file called server.js
3) initialized npm, run the command on powershell: npm init
4) then install expressjs from [express.js.com](https://expressjs.com/en/starter/installing.html): npm install express
 for creating a HelloWrold server

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

5) Nodemon is a utility depended on by over 1.5 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development. 
```
npm install -g nodemon
```