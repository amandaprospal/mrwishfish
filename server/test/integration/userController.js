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
                firstName: "Test",
                lastName: "Bunny",
                emailAddress: "testbunny@wishlist.com"
            };
            chai.request(wishlistServer)
                .post('/users')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(201);
                done();
            });
        });

        it("should not create a new user without a first name", function (done) {
            var user = {
                lastName: "Bunny",
                emailAddress: "testbunny@wishlist.com"
            };
            chai.request(wishlistServer)
                .post('/users')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new user without a last name", function (done) {
            var user = {
                firstName: "Test",
                emailAddress: "testbunny@wishlist.com"
            };
            chai.request(wishlistServer)
                .post('/users')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new user without an email address", function (done) {
            var user = {
                firstName: "Test",
                lastName: "Bunny"
            };
            chai.request(wishlistServer)
                .post('/users')
                .send(user)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });
    });
});