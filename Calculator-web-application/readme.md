Before we start creating our Calculator website, we'll need to set up a new project. Follow the steps below using your Hyper Terminal to complete this challenge:

- Make a new folder called Calculator on your Desktop

- Change Directory to this new folder

- Inside the Calculator folder, create a new file called calculator.js: ```touch calculator.js```

- Set up a new NPM package ```npm init```

- Open the project folder in VScode. ``` code .```

- Using NPM install the express module ``` npm install express```

- Require express in your calculator.js. ```const express = require('express')```

- Setup express ```const app = express()```

- Create a root route get method with app.get(). 

- Send the words Hello World from the root route as the response. ```app.get("/", function(req, res) {
    res.send("<h1>Hello World!</h1>")
})```

- Spin up our server on port 3000 with app.listen. ```app.listen(port, function() {
    console.log(`listen on ${port}.`);
})```

- Run server with nodemon. ```nodemon calculator.js```

- ```npm install body-parser``` this allow us to parse the information that we sent.