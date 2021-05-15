const Dimension = require('../services/wind/dimension')

const indexWind = ((req, res) => {
    return res.render('index')
});

const DimensionAngle = ((req, res) => {
    const {width, height} = req.body
    const GetDimension = Dimension.getAngle(width, height)
    return res.json(GetDimension)

})


// const DimensionShedWind = ((req, res) => {

//     const GetDimension = Dimension.getDimensionsShed(width, height)

// })

module.exports = {
    indexWind,
    DimensionAngle
}

