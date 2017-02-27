##Requirements
[Node](https://nodejs.org/en/) (tested with 6.10.0)

##Setup
Clone this repository into an empty folder. Run ``npm install`` to download node modules. 

Run ``npm run build`` to build production. Run ``npm start`` to start express server.

Start express server with ``npm start``, start development server with ``npm run dev``. 

###MySQL server setup
Recommends [MariaDB](https://downloads.mariadb.org/). Download and extract the zip file. Server can be started with this script: 

#####Windows:
```
@echo off
bin\mysqld --standalone --console
```
#####Linux
```
./bin/mysqld --standalone --console
```
Default user is ``root`` without password.

When mysql server is up and running you can configure ``server/setup.js`` to match your mysql connection.