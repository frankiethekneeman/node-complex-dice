var DiceGroup = require('../../src/DiceGroup')
    , Roll = require('../../src/Roll')
    , sinon = require('sinon')
    ;

function MockRoll(definition) {
    this.getDefinition = function() {
        return definition;
    }
    this.max = sinon.stub().returns(1);
    this.min = sinon.stub().returns(1);
    this.roll = sinon.stub().returns(1);
}

MockRoll.defPattern = Roll.defPattern;

MockRoll.prototype = {
    groups: []
    , max: sinon.stub().returns(1)
    , min: sinon.stub().returns(1)
    , roll: sinon.stub().returns(1)
    , reset: function() {
        delete this.groups;
        this.max.reset();
        this.min.reset();
        this.roll.reset();
    }
}

module.exports = MockRoll;
