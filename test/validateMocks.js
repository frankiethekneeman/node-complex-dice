var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , MockDiceGroup = require('./mocks/MockDiceGroup')
    , MockRoll = require('./mocks/MockRoll')
    , DiceGroup = require('../src/DiceGroup')
    , Roll = require('../src/Roll')
    ;

var dgDef = "1d1"
    , rDef = "1d1"
    , mdg = new MockDiceGroup(dgDef)
    , mr = new MockRoll(rDef)
    , dg = new DiceGroup(dgDef)
    , r = new Roll(rDef)
    ;
chai.use(require('sinon-chai'));

function objectSimilarity(p1, p2) {
    for (property in p1) 
        (function(property) {
            it('should have a property ' + property, function() {
                expect(p2[property]).to.exist;
            }); 
            it ('should have property ' + property + ' be of Type ' + (typeof p1[property]), function() {
                expect(typeof p2[property]).to.equal(typeof p1[property]);
            }); 
        })(property);
}
function stubPrep(func, def) {
    this.subj1 = new func(def);
    this.subj2 = new func(def);
}
function stubs(clazz, def) {
    ['min', 'max', 'roll'].forEach(function(func) {
        describe(func, function() {
            beforeEach(function(){ stubPrep.call(this, clazz, def);});
            it('Is a function', function() {
                expect(this.subj1[func]).to.be.an.instanceof(Function);
            });
            it('Can be reset using reset()', function() {
                this.subj1[func]();
                expect(this.subj1[func]).to.have.been.called;
                this.subj1.reset();
                expect(this.subj1[func]).to.not.have.been.called;
            });
            it('Instantiantes the spies separately', function() {
                this.subj1[func]();
                expect(this.subj1[func]).to.have.been.called;
                expect(this.subj2[func]).to.not.have.been.called;
            });
            it('Returns 1', function() {
                expect(this.subj1[func]()).to.equal(1);
            });
        });
    });
}

describe('Validate Mocks', function() {
    describe('Prototypes', function() {
        describe('MockDiceGroup', function() {
            objectSimilarity(DiceGroup.prototype, MockDiceGroup.prototype);
        });
        describe('Roll', function() {
            objectSimilarity(Roll.prototype, MockRoll.prototype);
        });
    });
    describe('Functions', function() {
        describe('MockDiceGroup', function() {
            objectSimilarity(DiceGroup, MockDiceGroup);
            it('Should have the same definition', function() {
                expect(MockDiceGroup.defPattern).to.equal(DiceGroup.defPattern);
            });
        });
        describe('Roll', function() {
            objectSimilarity(Roll, MockRoll);
            it('Should have the same definition', function() {
                expect(MockRoll.defPattern).to.equal(Roll.defPattern);
            });
        });
    });
    describe('Instances', function() {
        describe('MockDiceGroup', function() {
            objectSimilarity(dg, mdg);
            describe('Stubs', function() {
                stubs(MockDiceGroup, dgDef);
            });
        });
        describe('Roll', function() {
            objectSimilarity(dg, mdg);
            describe('Stubs', function() {
                stubs(MockRoll, rDef);
            });
        });
    });
});
