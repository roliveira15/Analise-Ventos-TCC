const Dimension = require('../services/wind/dimension')

const indexWind = ((req, res) => {
    return res.render('index')
});

const DimensionAngle = ((req, res) => {
    const {width, height} = req.body
    const GetDimension = Dimension.getAngle(width, height)
    return res.json(GetDimension)
})

const DimensionShedWind = ((req, res) => {
    const {height, width, length } = req.body
    const GetDimension = Dimension.getDimensionsShed(width,length, height)
    console.log(GetDimension)
    return res.json(GetDimension)
})

module.exports = {
    indexWind,
    DimensionAngle,
    DimensionShedWind
}

