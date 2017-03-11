##Requirements
[Node](https://nodejs.org/en/) (tested with 6.10.0)

##Setup
Clone this repository into an empty folder. Run ``npm install`` to download node modules. 

Run ``npm run build`` to build production. Run ``npm start`` to start express server.

Start express server with ``npm start``, start development server with ``npm run dev``. 

### Database setup
SQLite by default. Database config is located in config/\[env\].json under "dbConfig". See [Sequelize](http://docs.sequelizejs.com/en/v3/) for config setup.