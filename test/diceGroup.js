var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , DiceGroup = require('../src/DiceGroup')
    , cases = require('./cases/diceGroup.json')
    ;

describe('DiceGroup', function() {
    for (test in cases.success)
        (function(test) {
            var results = cases.success[test];
            describe("With " + test + " (" + results.def + ")", function() {
                it ("Should successfully construct with new", function() {
                    expect(function() {
                        new DiceGroup(results.def);
                    }).to.not.throw("Not a valid DiceGroup Definition.");
                });
                describe("Results:", function() {
                    beforeEach(function(){
                        this.group = new DiceGroup(results.def);
                    });
                    it("Should Identify the correct Multiplier", function() {
                        expect(this.group.multiplier).to.equal(results.multiplier);
                    });
                    it("Should Identify the correct number of dice", function() {
                        expect(this.group.dice).to.equal(results.dice);
                    });
                    it("Should Identify the correct number of dice to drop", function() {
                        expect(this.group.drop).to.equal(results.drop);
                    });
                    it("Should Identify the correct die size", function() {
                        expect(this.group.size).to.equal(results.size);
                    });
                    it("Should correctly calculate the minimum possible roll", function() {
                        expect(this.group.min()).to.equal(results.min);
                    });
                    it("Should correctly calculate the maximum possible roll", function() {
                        expect(this.group.max()).to.equal(results.max);
                    });
                });
            });
        })(test);
    for (test in cases.erroneous)
        (function(test) {
            it("Should fail when given " + test, function() {
                expect(function() {
                    new DiceGroup(cases.erroneous[test]);
                }).to.throw("Not a valid DiceGroup Definition.");
            });
        })(test);
});
