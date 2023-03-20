### Execution-
Here, it is assumed node.js and MongoDB have been pre-installed.

To run the code, make sure MongoDB is running, by going to its bin directory through the command prompt/terminal and running:   mongo

In newer versions this may not work; use this instead:   mongod

Usually, the path is, C:\Program Files\MongoDB\Server\5.0\bin

Once mongo is running in the background, open a terminal in the code’s root folder/directory, for running the server-side code, and install the dependencies/modules specified in the package.json file on the terminal before running the script :-  
Install dependencies -   npm install  
Run the script via -   node app.js  

Once the script is running, the application can be viewed via entering in the web browser,   localhost:3000
