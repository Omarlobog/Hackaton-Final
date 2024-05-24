const { request, response} = require ("express");
const jwt = require("jsonwebtoken");


const { models } = require('../libs/sequelize');

const validateJwt = async (req = request, res = response, next) => {

    try {
        if(!req.headers.authorization){
            return res.status(401).json({
                message:"acceso denegado."
            })
        }
    
        const token = req.headers.authorization.split(" ");
        const decoded = jwt.decode(token[1],process.env.SECRET_TOKEN);
    
        const userFound = await models.Usuario.findByPk(decoded.id)
        if(!userFound){
            return res.status(401).json({
                message: "acceso denegadoooooo"
            });
        }

        req.userAuth = userFound.dataValues;
        
        next();
    } catch (err) {
        return res.status(401).json({
            message: "acceso denegadoooooo"
        });
    }
}

module.exports = {
    validateJwt
}