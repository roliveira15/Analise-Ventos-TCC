const Dimension = require('../services/wind/dimension')

const indexWind = ((req, res) => {
    return res.render('index')
});

const DimensionAngle = ((req, res) => {
    const {width, heightRoof} = req.body
    const GetDimension = Dimension.getAngle(width, heightRoof)
    return res.json(GetDimension)
})

const DimensionShedWind = ((req, res) => {
    const {height, width, length } = req.body

    const GetDimension = Dimension.getDimensionsShed(width,length, height)
    return res.json(GetDimension)
})

const WallCoefficients = ((req, res) => {

    const {heightRoof, height, width, length } = req.body
    
    const GetWallCoefficients = Dimension.getWallCoefficients(width,length, height)
    return res.json(GetWallCoefficients)
})


module.exports = {
    indexWind,
    DimensionAngle,
    DimensionShedWind,
    WallCoefficients
}

