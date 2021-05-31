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

const Definitionfators1 = ((req, res) => {
    
    const GetfatorS1 = Dimension.getfatorS1(req.body)

    return res.json(GetfatorS1)
})

const Definitionfators2 = ((req, res) => {
    
    const GetfatorS2 = Dimension.getfatorS2(req.body)

    return res.json(GetfatorS2)
})

const Definitionfators3 = ((req, res) => {
    
    const GetfatorS3 = Dimension.getfatorS3(req.body)

    return res.json(GetfatorS3)
})

const Definition_vk_pressure = ((req, res) => {
    
    const GetVkPressure = Dimension.getDynamicWindPressure(req.body)

    return res.json(GetVkPressure)
})

const effort = ((req, res) => {
   
    const GetEffort = Dimension.getEffort(req.body)

    return res.json(GetEffort)
})

module.exports = {
    indexWind,
    DimensionAngle,
    DimensionShedWind,
    WallCoefficients,
    roofCoefficients,
    cpiCoefficients,
    Definitionfators1,
    Definitionfators2,
    Definitionfators3,
    Definition_vk_pressure,
    effort
}

