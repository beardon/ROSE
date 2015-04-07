var Promise = require('bluebird');

var http = require('http');

var Primus = require('primus');

var server = http.createServer();
var request = Promise.promisifyAll(require('request'));
var primus = new Primus(server, { transformer: 'sockjs' });

primus.use('emit', require('primus-emit'));

primus.save(__dirname + '/primus.js');

var url = 'https://api.spark.io/v1/devices/51ff6f065082554929450887/readPort?access_token=b279656edfe41881ecc1ad7a42a149f90a115447';

var lastValue = 0;

var loop = Promise.method(function () {
    return request.postAsync({url: url, json: { args: 'port_a' }})
    .spread(function (res, data) {
        if (data.return_value != null && data.return_value !== lastValue) {
            lastValue = data.return_value;

            primus.forEach(function (spark) {
                spark.emit('rose', lastValue);
            });
        }
    })
    .catch(console.log)
    .delay(100)
    .then(loop);
});

loop();

primus.on('connection', function (spark) {
    spark.emit('rose', lastValue);
});

server.listen(3420);
