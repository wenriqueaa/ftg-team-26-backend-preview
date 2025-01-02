const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const user = require('../controllers/user.controller')

const getUserIdToken = async (req, res) => {
    //buscar el token desde authorization bearer
    //signo ? indica que si trae informacion ejecuta el split 
    const token = req.header('Authorization')?.split(' ')[1]
    try {
        //trae la variable de la llave secreta
        const secret = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secret)
        console.log(`get User Id --> token es:${token} y el decoded es:${decoded}`)

        return decoded
    } catch (error) {
        console.log(`Error validating token ${error}`)
        return res.status(500).json({
            ok: false,
            message: `Fatal error validating token Error ${error}`
        })

    }
}

module.exports = { getUserIdToken }