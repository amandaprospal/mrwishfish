var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var should = chai.should();
import Wishlist, {getWishlist} from '../../v1/src/models/Wishlist.js';
import * as wishlistDAO from '../../v1/src/db/mysql/dao/wishlistDAO.js';

const SAILOR_MOON = {
    ID: 1,
    WISHLIST_ID: 1,
    NAME: 'Sailor Moon\'s Wishlist',
    IS_PRIVATE: 0,
    CREATED_DATE: '2018-01-01 00:00:00',
    UPDATED_DATE: '2018-01-02 01:01:01'
};
let sailorMoonWishlist = new Wishlist(SAILOR_MOON.WISHLIST_ID, SAILOR_MOON.NAME, SAILOR_MOON.IS_PRIVATE);

const SAILOR_MERCURY = {
    ID: 2,
    WISHLIST_ID: 2,
    NAME: 'Sailor Mercury\'s Wishlist',
    IS_PRIVATE: 1,
    CREATED_DATE: '2018-02-02 00:00:00',
    UPDATED_DATE: '2018-02-03 02:02:02'
};
let sailorMercuryWishlist = new Wishlist(null, null, null);

const SAILOR_MARS = {
    ID: 3,
    WISHLIST_ID: 3,
    NAME: 'Sailor Mars\'s Wishlist',
    IS_PRIVATE: 0,
    CREATED_DATE: '2018-03-03 00:00:00',
    UPDATED_DATE: '2018-03-04 03:03:03'
};
let sailorMarsWishlist = new Wishlist(SAILOR_MARS.WISHLIST_ID, SAILOR_MARS.NAME, SAILOR_MARS.IS_PRIVATE);

describe("Wishlist", function() {
    describe("#getUserId()", function() {
        it("should retrieve the user id of the wishlist", function (done) {
            var userId = sailorMoonWishlist.getUserId();
            expect(userId).to.be.equal(SAILOR_MOON.WISHLIST_ID);
            done();
        });
    });
    describe("#getName()", function() {
        it("should retrieve the name of the wishlist", function (done) {
            var name = sailorMoonWishlist.getName();
            expect(name).to.be.equal(SAILOR_MOON.NAME);
            done();
        });
    });
    describe("#getIsPrivate()", function() {
        it("should retrieve the privacy flag of the wishlist", function (done) {
            var isPrivate = sailorMoonWishlist.getIsPrivate();
            expect(isPrivate).to.be.equal(SAILOR_MOON.IS_PRIVATE);
            done();
        });
    });

    describe("#setId()", function() {
        it("should set the id of the wishlist", function (done) {
            sailorMercuryWishlist.setId(SAILOR_MERCURY.ID);
            var id = sailorMercuryWishlist.id;
            expect(id).to.be.equal(SAILOR_MERCURY.ID);
            done();
        });
    });
    describe("#setUserId()", function() {
        it("should set the user id of the wishlist", function (done) {
            sailorMercuryWishlist.setUserId(SAILOR_MERCURY.WISHLIST_ID);
            var userId = sailorMercuryWishlist.getUserId();
            expect(userId).to.be.equal(SAILOR_MERCURY.WISHLIST_ID);
            done();
        });
    });
    describe("#setName()", function() {
        it("should set the name of the wishlist", function (done) {
            sailorMercuryWishlist.setName(SAILOR_MERCURY.NAME);
            var name = sailorMercuryWishlist.getName();
            expect(name).to.be.equal(SAILOR_MERCURY.NAME);
            done();
        });
    });
    describe("#setIsPrivate()", function() {
        it("should set the privacy flag of the wishlist", function (done) {
            sailorMercuryWishlist.setIsPrivate(SAILOR_MERCURY.IS_PRIVATE);
            var isPrivate = sailorMercuryWishlist.getIsPrivate();
            expect(isPrivate).to.be.equal(SAILOR_MERCURY.IS_PRIVATE);
            done();
        });
    });
    describe("#setCreatedDate()", function() {
        it("should set the creation date of the wishlist", function (done) {
            sailorMercuryWishlist.setCreatedDate(SAILOR_MERCURY.CREATED_DATE);
            var createdDate = sailorMercuryWishlist.createdDate;
            expect(createdDate).to.be.equal(SAILOR_MERCURY.CREATED_DATE);
            done();
        });
    });
    describe("#setUpdatedDate()", function() {
        it("should set the updated date of the wishlist", function (done) {
            sailorMercuryWishlist.setUpdatedDate(SAILOR_MERCURY.UPDATED_DATE);
            var updatedDate = sailorMercuryWishlist.updatedDate;
            expect(updatedDate).to.be.equal(SAILOR_MERCURY.UPDATED_DATE);
            done();
        });
    });

    describe("#toString()", function() {
        it("should return a string representation of the wishlist", function (done) {
            var toString = sailorMercuryWishlist.toString();
            expect(toString).to.be.equal('ID: 2, Name: Sailor Mercury\'s Wishlist, User ID: 2, Is Private: 1, Created Date: 2018-02-02 00:00:00, Updated Date: 2018-02-03 02:02:02');
            done();
        });
    });

    describe("#getWishlist()", function() {
        it("should retrieve the specified wishlist", function (done) {
            var getWishlist = sinon.stub(wishlistDAO, 'getWishlist');
            var wishlistId = SAILOR_MARS.WISHLIST_ID;
            getWishlist(wishlistId, done());
            getWishlist.restore();
            sinon.assert.calledWith(getWishlist, wishlistId);
        });
    });
});