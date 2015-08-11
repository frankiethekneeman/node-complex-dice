var utils = require('./utils');

function DiceGroup(definition) {
    var match = definition.match(DiceGroup.defPattern);
    if (match) {
        this.multiplier = (match[1] == '-' ? -1 : 1) * +(match[5] || 1) / +(match[6] || 1);
        this.dice = +match[2];
        this.drop = +(match[3] || 0);
        this.size = +(match[4] || 1);
    } else {
        throw "Not a valid DiceGroup Definition.";
    }
    this.getDefinition = function() {
        return definition;
    }
}

DiceGroup.defPattern = /^([+-])?(\d+)(?:-(\d+))?(?:d(\d+))?(?:x([-+]?\d+))?(?:\/([-+]?\d+))?$/;

DiceGroup.prototype = {
    multiplier: 1
    , dice: 1
    , drop: 0
    , size: 1
    , max: function() {
        return Math.floor(this.multiplier > 0 ? 
            (this.dice - this.drop) * this.size * this.multiplier
            :
            (this.dice - this.drop) * this.multiplier
            );
    }
    , min: function() {
        return Math.floor(this.multiplier < 0 ? 
            (this.dice - this.drop) * this.size * this.multiplier
            :
            (this.dice - this.drop) * this.multiplier
            );
    }
    , roll: function() {
        if (this.size == 1)
            return Math.floor((this.dice - this.drop) * this.multiplier);
        if (this.drop == 0)
            return utils.rollSimple(this.dice, this.size, this.multiplier);
        return utils.rollComplex(this.dice, this.drop, this.size, this.multiplier);
    }
}
module.exports = DiceGroup;
