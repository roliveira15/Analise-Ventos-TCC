const dimensionWind_0 = require('../services/wind/dimension')

const indexWind = ((req, res) => {
    return res.render('index')
});

const SeparetedDimensional = ((req, res) => {
    // const oi= 'oi'
    const Dimension = dimensionWind_0.teste(20,10,5)
    // console.log(Dimension)
    return res.json(Dimension)
});

const DimensionAngleHeight = ((req, res) => {



})


module.exports = {
    indexWind,
    SeparetedDimensional,
    DimensionAngleHeight
}

