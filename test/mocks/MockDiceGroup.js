var DiceGroup = require('../../src/DiceGroup')
    , sinon = require('sinon')
    ;
function MockDiceGroup(definition) {
    this.getDefinition = function() {
        return definition;
    }
    this.max = sinon.stub().returns(1);
    this.min = sinon.stub().returns(1);
    this.roll = sinon.stub().returns(1);
}

MockDiceGroup.defPattern = DiceGroup.defPattern;

MockDiceGroup.prototype = {
    multiplier: 1
    , dice: 1
    , drop: 0
    , size: 1
    , max: sinon.stub().returns(1)
    , min: sinon.stub().returns(1)
    , roll: sinon.stub().returns(1)
    , reset: function() {
        delete this.multiplier;
        delete this.dice;
        delete this.drop;
        delete this.size;
        this.max.reset();
        this.min.reset();
        this.roll.reset();
    }
}
module.exports = MockDiceGroup;
