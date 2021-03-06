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
                    News.scope('archive',{
                        method: ['page',page]
                    }).findAndCountAll().then(res => {
                        socket.emit('action', {
                            type: 'FETCH_NEWS_FULFILLED',
                            payload: {
                                articles: res.rows.map(article => article.get()),
                                count: res.count
                            }
                        });
                    });
                }
            }
        })
    });
};