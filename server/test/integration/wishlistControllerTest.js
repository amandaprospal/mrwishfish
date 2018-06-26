var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var should = chai.should();

var wishlistServer = require('../../server');
var endpoint = '/api/v1/wishlists';

chai.use(chaiHttp);

describe("Wishlist Controller", function() {
    describe("#createWishlist()", function() {
        it("should create a new wishlist", function (done) {
            var wishlist = {
                userId: 1,
                name: "Bunny's Wishlist",
                isPrivate: 1
            };
            chai.request(wishlistServer)
                .post(endpoint)
                .send(wishlist)
                .end( function (err, res) {
                    res.should.have.status(201);
                done();
            });
        });

        it("should not create a new wishlist without a user id", function (done) {
            var wishlist = {
                name: "Bunny's Wishlist",
                isPrivate: 1
            };
            chai.request(wishlistServer)
                .post(endpoint)
                .send(wishlist)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new wishlist without a name", function (done) {
            var wishlist = {
                userId: 1,
                isPrivate: 1
            };
            chai.request(wishlistServer)
                .post(endpoint)
                .send(wishlist)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });

        it("should not create a new wishlist without a privacy indicator", function (done) {
            var wishlist = {
                userId: 1,
                name: "Bunny's Wishlist"
            };
            chai.request(wishlistServer)
                .post(endpoint)
                .send(wishlist)
                .end( function (err, res) {
                    res.should.have.status(500);
                done();
            });
        });
    });
});