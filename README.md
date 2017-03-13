##Requirements
[Node](https://nodejs.org/en/) (tested with 6.10.0)

##Setup
Clone this repository into an empty folder. Run ``npm install`` to download node modules. 

Run ``npm run build`` to build production. Run ``npm start`` to start express server.

Start express server with ``npm start``, start development server with ``npm run dev``. 

##Development
Install ``webpack`` as global. Then you can run 
```
webpack --config server-dev/webpack.dev.config.js --watch
``` 
or ``npm run dev-webpack`` to pack react components. 

Install ``nodemon`` as global then run
```
nodemon --watch server server-dev/index.js
```
or ``npm run dev-server`` to start http server and listen for changes in server directory.

### Database setup
SQLite by default. Database config is located in config/\[env\].json under "dbConfig". See [Sequelize](http://docs.sequelizejs.com/en/v3/) for config setup.
