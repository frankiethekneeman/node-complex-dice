var DiceGroup = require('./DiceGroup')
    , utils = require('./utils');

function Roll(definition) {
    var match = definition.match(Roll.defPattern);
    if (match) {
        this.groups = new Array(match.length);
        var defLength = 0;
        for (var i = 0; i < match.length; i++) {
            this.groups[i] = new DiceGroup(match[i]);
            defLength += match[i].length;
        }
        if (defLength != definition.length)
            throw "Not a valid Roll Definition.";
    } else {
        throw "Not a valid Roll Definition.";
    }
    this.getDefinition = function() {
        return definition;
    }
}

var src = DiceGroup.defPattern.source.replace(/^\^|\$$/g, '');
Roll.defPattern = new RegExp(src, 'g');

Roll.prototype = {
    groups: []
    , max: function() {
        return utils.pushdown(this.groups, 'max');
    }
    , min: function() {
        return utils.pushdown(this.groups, 'min');
    }
    , roll: function() {
        return utils.pushdown(this.groups, 'roll');
    }
}

module.exports = Roll;
