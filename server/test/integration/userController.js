var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var should = chai.should();
var userController = require("../../src/controllers/userController.js");

var wishlistServer = require('../../server');

chai.use(chaiHttp);

describe("User Controller", function() {
    describe("#createUser()", function() {
        it("should create a new user", function (done) {
            var user = {
                first_name: "Test",
                last_name: "Bunny",
                email_address: "testbunny@wishlist.com"
            }
            chai.request(wishlistServer)
                .post('/user')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(200);
                done();
            });
        });

        it("should not create a new user without a first name", function (done) {
            var user = {
                last_name: "Bunny",
                email_address: "testbunny@wishlist.com"
            }
            chai.request(wishlistServer)
                .post('/user')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new user without a last name", function (done) {
            var user = {
                first_name: "Test",
                email_address: "testbunny@wishlist.com"
            }
            chai.request(wishlistServer)
                .post('/user')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new user without an email address", function (done) {
            var user = {
                first_name: "Test",
                last_name: "Bunny"
            }
            chai.request(wishlistServer)
                .post('/user')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });
    });
});