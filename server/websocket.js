const socket = require('socket.io');
const { News } = require('./models');

const io = socket();

module.exports = function(server) {
    io.attach(server);
    io.on('connection', function(socket) {
        socket.on('action', (action) => {
            if (action.type === 'socket/FETCH_NEWS') {
                const page = Number(action.payload.page);
                if (isNaN(page) || page < 1) {
                    socket.emit('action', {
                        type:'FETCH_NEWS_ERROR',
                        payload: 'Invalid page'
                    });
                } else {
                    News.findAll({
                        raw: true,
                        offset: (page-1)*10,
                        limit: 10
                    }).then(res => {
                        socket.emit('action', {
                            type: 'FETCH_NEWS_FULFILLED',
                            payload: res
                        });
                    });
                }
            }
        })
    });
};