const Dimension = require('../services/wind/dimension')

const indexWind = ((req, res) => {
    return res.render('index')
});

// const SeparetedDimensional = ((req, res) => {
    // const oi= 'oi'
    // const Dimension = dimensionWind_0.teste(20,10,5)
    // console.log(Dimension)
    // return res.json(Dimension)
// });

const DimensionAngle = ((req, res) => {
    const {width, height} = req.body
    const GetDimension = Dimension.get(width, height)
    return res.json(GetDimension)

})

module.exports = {
    indexWind,
    DimensionAngle
}
