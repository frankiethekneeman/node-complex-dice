#Complex Dice Roller
====================

A Roller for increasingly complex die patterns.  There are two Objects - DiceGroups, and Rolls.

##DiceGroup
-----------

A dice group is of the format:

    N-DdSxM/V

All numbers must be integers.

###N

Roll N dice.  This is the only required portion of the definition.

###D

Drop the lowest D dice. Defaults to `0`

###dS

All dice roll between 1 and S.  Defaults to `d1`.

###xM

Multiply the sum of the chosen Dice by the multiplier M. Defaults to `x1`.

Note that this means `2-1x2` is equal to `2`, not `0`.

###/V

Divide the sum of the chosen Dice by the divisor V, rounding down. Defaults to `/1`.

Note that this means `2-1x2` is equal to `2`, not `0`.

##Roll
------

A roll is just a series of DiceGroups, joined by `+` or `-`.  You can mix or match pluses or minuses, and different types of DiceGroups.

Note that this matching is greedy - `4-1d6` will be interpreted as a single DiceGroup, not `4` and `-1d6`.

##Usage
-------

    var DiceGroup = require('complex-dice').DiceGroup
    var Roll = require('complex-dice').Roll
    
    var dg = new DiceGroup('4-1d6'); //Stats
    console.log(dg.max()); //18
    console.log(dg.min()); //3
    console.log(dg.roll()); //somewhere between 3 and 18
    console.log(dg.getDefinition()); //4-1d6

    var roll = new Roll('1d4+1'); //Magic Missile!
    console.log(roll.max()); //5
    console.log(roll.min()); //2
    console.log(roll.roll()); //Something between 2 and 5
    console.log(roll.getDefinition()); //1d4+1

##Testing
---------

If you're attempting to test _this code_ you can do so with `mocha`.  Just run it.  It'll be great!

If you're using this code in your application, you can use the Mocks that are packaged with this application.  All you have do to is install `sinon`:

    npm install --save-dev sinon

Then you can grab our bundled Mocks:

    var DiceGroup = require('complex-dice').mock.DiceGroup
    var Roll = require('complex-dice').mock.Roll
    
    var dg = new DiceGroup('4-1d6'); //Stats
    console.log(dg.max()); //1
    console.log(dg.min()); //1
    console.log(dg.roll()); //1
    dg.reset();
    console.log(dg.max.callCount) //0
    console.log(dg.getDefinition()); //4-1d6

    var roll = new Roll('1d4+1'); //Magic Missile!
    console.log(roll.max()); //1
    console.log(roll.min()); //1
    console.log(roll.roll()); //1
    roll.reset();
    console.log(roll.max.callCount) //0
    console.log(roll.getDefinition()); //1d4+1

As you can see, our mocks support the same interface as the actual classes, with two major differences:

1. All mathematical functions (`max`, `roll`, `min`) are sinon stubs that return 1.
2. The additional reset() function resets all stubs via `stub.reset()`.

## Contributing

Please maintain the existing style - but do open a pull request if you have a bugfix or a cool feature.
Be sure to document your change.  Pull requests are preferred to bug reports (though if you submit a bug
report, you're welcome to fix your own bug).

Please be sure to update all documentation to reflect your changes - add to the Readme files and the in
code commenting.
