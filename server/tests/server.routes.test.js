var should = require('should'),
    request = require('supertest'),
    express = require('../config/express');
    

var app;
var agent;

describe('server', function () {
    this.timeout(10000);

    before(function (done) {
        app = express.init();
        agent = request.agent(app);

        done();
    });

    it('getFiles', function (done) {
        agent.get('/getFiles')
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                //console.log(res);
                done();
            });
    });

    it('uuid', function (done) {
        agent.post('/uuid')
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

	
})