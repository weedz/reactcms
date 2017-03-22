## Requirements
[Node](https://nodejs.org/en/) (tested with 6.10.0)

If you are on windows you might need to install ``windows-build-tools`` in order to compile dependencies for [brotli](https://www.npmjs.com/package/brotli-webpack-plugin):
```
npm install windows-build-tools
```

## Setup
Clone this repository into an empty folder. Set ``NODE_ENV`` to development (on windows: ``set NODE_ENV=development``, on linux: ``export NODE_ENV=development``) then run ``npm install`` to download node modules. 

Run ``npm run build`` to build production. Run ``npm start`` to start express server.

## Development
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
SQLite by default. Database config is located in ``config/[env].json`` under "dbConfig". See [Sequelize](http://docs.sequelizejs.com/en/v3/) for config setup.

### TLS Encryption
Backend uses http2 by default. Path to key and certificate can be configured in ``config/[env].json`` under "tlsOptions"
