var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , mockery = require('mockery')
    , Roll = require('../src/Roll')
    , DiceGroup = require('../src/DiceGroup')
    , MockDiceGroup = require('./mocks/MockDiceGroup')
    , dgcases = require('./cases/diceGroup.json')
    , rcases = require('./cases/roll.json')
    ;
mockery.enable({
    warnOnReplace: false
    , warnOnUnregistered: false
    , useCleanCache: true
});
mockery.registerMock('./DiceGroup', MockDiceGroup);
var TestableRoll = require('../src/Roll')
mockery.disable;

function testMinMaxRoll() {
    ['min', 'max', 'roll'].forEach(function(f) {
        it("Should correctly calculate via the " + f + " function.", function() {
            /**
             *  All the functions in the MockDiceGroup return 1, all the time, so all of these functions should equal the group length;
             */
            expect(this.roll[f]()).to.equal(this.roll.groups.length);
        });
        it("Should pushdown to each group for the " + f + " function.", function() {
            this.roll[f]();
            this.roll.groups.forEach(function(group) {
                expect(group[f]).to.have.been.calledOnce;
            });
        });
    });
}
describe('Roll', function() {
    describe('DiceGroup Regression', function() {
        for (test in dgcases.success)
            (function(test) {
                var results = dgcases.success[test];
                describe("With " + test + " (" + results.def + ")", function() {
                    it ("Should successfully construct with new", function() {
                        expect(function() {
                            new TestableRoll(results.def);
                        }).to.not.throw("Not a valid DiceGroup Definition.");
                    });
                    describe("Results:", function() {
                        beforeEach(function(){
                            this.roll = new TestableRoll(results.def);
                        });
                        it ("Should successfully identify the correct number of Groups.", function() {
                            expect(this.roll.groups.length).to.equal(1);
                        });
                        testMinMaxRoll();
                    });
                });
            })(test);
        for (test in dgcases.erroneous)
            if (test != "multiple groups")
                (function(test) {
                    it("Should fail when given " + test, function() {
                        expect(function() {
                            new TestableRoll(dgcases.erroneous[test]);
                        }).to.throw("Not a valid Roll Definition.");
                    });
                })(test);
    });
    for (test in rcases.success)
        (function(test) {
            var results = rcases.success[test];
            describe("With " + test + " (" + results.def + ")", function() {
                it ("Should successfully construct with new", function() {
                    expect(function() {
                        new TestableRoll(results.def);
                    }).to.not.throw("Not a valid DiceGroup Definition.");
                });
                describe("Results:", function() {
                    beforeEach(function(){
                        this.roll = new TestableRoll(results.def);
                    });
                    it ("Should successfully identify the correct number of Groups.", function() {
                        expect(this.roll.groups.length).to.equal(results.groups.length);
                    });
                    it ("Should exctract the correct groups.", function() {
                        for(var i = 0; i < results.groups.length; i++) {
                            expect(this.roll.groups[i]).to.exist;
                            expect(this.roll.groups[i].getDefinition()).to.equal(results.groups[i]);
                        }
                    });
                    testMinMaxRoll();
                });
            });
        })(test);
    for (test in rcases.erroneous)
        (function(test) {
            it("Should fail when given " + test, function() {
                expect(function() {
                    new TestableRoll(rcases.erroneous[test]);
                }).to.throw("Not a valid Roll Definition.");
            });
        })(test);
    describe("Integration Testing", function() {
        for (test in rcases.success)
            (function(test) {
                var results = rcases.success[test];
                describe("With " + test + " (" + results.def + ")", function() {
                    describe("Results:", function() {
                        beforeEach(function(){
                            this.roll = new Roll(results.def);
                            sinon.stub(Math, "random").returns(.5);
                        });
                        ["min", "max", "roll"].forEach(function(f) {
                            it ("Should correctly calculate: " + f, function() {
                                expect(this.roll[f]()).to.equal(results[f]);
                            });
                        });
                        afterEach(function() {
                            Math.random.restore();
                        });
                    });
                });
            })(test);
    });
});
