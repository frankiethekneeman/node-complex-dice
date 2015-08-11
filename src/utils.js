var utils = {
    pushdown: function(groups, funcName) {
        var toReturn = 0;

        for (var i = 0; i < groups.length; i++) {
            var ret = groups[i][funcName]();
            toReturn += ret;
        }
        return toReturn;
    }

    , die: function(size) {
        return Math.floor(Math.random() * size) + 1;
    }

    , rollSimple: function(dice, size, multiplier) {
        var toReturn = 0;
        for (var i = 0; i < dice; i++)
            toReturn += utils.die(size);
        return Math.floor(toReturn * multiplier);
    }

    , rollComplex: function(dice, drop, size, multiplier) {
        var rolls = new Array(dice);
        for (var i = 0; i < dice; i++) {
            rolls[i] = utils.die(size);
        }
        rolls.sort(function(a, b) {
            return (a - b) * -multiplier;
        });
        var toReturn = 0;
        for (var i = 0; i < dice - drop; i++) {
            toReturn += rolls[i];
        }
        return Math.floor(toReturn * multiplier);
    }
}

module.exports = utils;
