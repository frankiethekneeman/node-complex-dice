var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , utils = require('../src/utils');

describe('Utility Functions', function() {
    describe('die', function() {
        beforeEach(function() {
            sinon.stub(Math, "random").returns(.5);
        });
        it('Should use "Math.random"', function() {
            utils.die(15);
            expect(Math.random).to.have.been.calledOnce;
        });
        it('Should round down', function() {
            expect(utils.die(15)).to.equal(8);
        });
        it('Should never exceed passed value', function() {
            Math.random.restore();
            sinon.stub(Math, "random").returns(.9999999);
            expect(utils.die(15)).to.equal(15);
        });
        it('Should always return at least 1', function() {
            Math.random.restore();
            sinon.stub(Math, "random").returns(0);
            expect(utils.die(15)).to.equal(1);
        });
        afterEach(function() {
            Math.random.restore();
        });
    });
    describe('rollSimple', function() {
        beforeEach(function() {
            sinon.stub(utils, "die").returns(1);
        });
        it('Should call die once for every die', function() {
            utils.rollSimple(5, 1, 1);
            expect(utils.die).to.have.callCount(5);
        });
        it('Should always use the correct die size', function() {
            utils.rollSimple(5, 7, 1);
            utils.rollSimple(5, 7, -1);
            expect(utils.die).to.always.have.been.calledWith(7);
        });
        it('Should match the sign of the multiplier', function() {
            expect(utils.rollSimple(1,1,-1)).to.be.lessThan(0);
            expect(utils.rollSimple(1,1,1)).to.be.greaterThan(0);
        });
        afterEach(function() {
            utils.die.restore();
        });
    });
    describe('rollComplex', function() {
        beforeEach(function() {
            sinon.stub(utils, "die").returns(1);
        });
        it('Should call die once for every die', function() {
            utils.rollComplex(5, 1, 1, 1);
            expect(utils.die).to.have.callCount(5);
        });
        it('Should always use the correct die size', function() {
            utils.rollComplex(5, 1, 7, 1);
            utils.rollComplex(5, 1, 7, -1);
            expect(utils.die).to.always.have.been.calledWith(7);
        });
        it('Should match the sign of the multiplier', function() {
            expect(utils.rollComplex(1,0,1,-1)).to.be.lessThan(0);
            expect(utils.rollComplex(1,0,1,1)).to.be.greaterThan(0);
        });
        it('Should drop the lowest dice', function() {
            expect(utils.rollComplex(9,3,1,1)).to.equal(6);
        });
        afterEach(function() {
            utils.die.restore();
        });
    });
    describe('pushdown', function() {
        beforeEach(function() {
            this.subjugates = [
                { test: sinon.stub().returns(1) }
                ,{ test: sinon.stub().returns(1) }
                ,{ test: sinon.stub().returns(1) }
                ,{ test: sinon.stub().returns(1) }
            ];
        });
        it('should call the requested function on each object exactly once', function() {
            utils.pushdown(this.subjugates, "test");
            for (var i = 0; i < this.subjugates.length; i++) {
                expect(this.subjugates[i].test).to.have.been.calledOnce;
            }
        });
        it('Should sum the responses', function() {
            expect(utils.pushdown(this.subjugates, "test")).to.equal(this.subjugates.length);
        });
    });
});
