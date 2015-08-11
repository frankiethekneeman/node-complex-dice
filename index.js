var DiceGroup = require('./src/DiceGroup')
    , Roll = require('./src/Roll')
    , MockDiceGroup = null
    , MockRoll = null
    ;

try {
    MockDiceGroup = require('./test/mocks/MockDiceGroup')
    MockRoll = require('./test/mocks/MockRoll')
} catch (e) {
    //Don't do anything here, it's clear that there's some missing dev dependencies.
}
module.exports = {
    DiceGroup: DiceGroup
    , Roll: Roll
    , mock: {
        DiceGroup: MockDiceGroup
        , Roll: MockRoll
    }
};
