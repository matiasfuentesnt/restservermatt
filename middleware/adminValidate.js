const {response} = require('express');


const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }
    
    const { role, name } = req.user;
    
    if ( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - no puede realizar esa accion`
        })
    }
 
    next();
}

const getRole = ( ...role ) => {

    return (req, res= response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar'
            })
        }
        if (!role.includes(req.user.role)){
            return res.status(401).json({
                msg: `El servicio requiere de este role ${role}`
            })
        }
        next()
    }

}



module.exports = {
    isAdminRole,
    getRole
}