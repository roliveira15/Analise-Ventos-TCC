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

    const {height, width, length } = req.body
    
    const GetWallCoefficients = Dimension.getWallCoefficients(width,length, height)
    return res.json(GetWallCoefficients)
})

const roofCoefficients = ((req, res) => {

    const {heightRoof, height, width, length } = req.body
    
    const GetRoofCoefficients = Dimension.getRoofCoefficients(heightRoof, width,length, height)
    return res.json(GetRoofCoefficients)
})

const cpiCoefficients = ((req, res) => {
    
    const GetCpiCoefficients = Dimension.getCpiCoefficients(req.body)
    return res.json(GetCpiCoefficients)
})

module.exports = {
    indexWind,
    DimensionAngle,
    DimensionShedWind,
    WallCoefficients,
    roofCoefficients,
    cpiCoefficients
}

