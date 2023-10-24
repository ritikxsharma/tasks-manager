const auth_model = require('../models/auth_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {
    BAD_REQUEST_ERROR,
    FORBIDDEN_ERROR,
    NOT_FOUND_ERROR,
    UNAUTHORIZED_ERROR,
    CONFLICT_ERROR,
    SERVER_ERROR
} = require('../middlewares/errorHandling/errors')

const getUsers = async(req, res) =>{
    try {
        const users = await auth_model.find()
        res.send(users)
    } catch (error) {
        res.send(`Error: ${error}`)
    }
}

const login = async(req, res, next) =>{
    try {
        const {
            email,
            password
        } = req.body
    
        if(!email || !password){
            throw new BAD_REQUEST_ERROR('All fields are mandatory')
        }
    
        const findUser = await auth_model.findOne({email: email})
        if(findUser && await bcrypt.compare(password, findUser.password)){
            const accessToken = jwt.sign(
                {
                    user:{
                        id: findUser.id,
                        email: findUser.email,
                    }
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '15m'
                }
            )
            res.status(200).json({"user": findUser, "token": accessToken })
        }
        else{
           throw new NOT_FOUND_ERROR('Email or Password is invalid!!')
        }
    
    } catch (error) {
        next(error)
    }
}

const register = async(req, res, next) =>{
    try {
        const{
            id,
            name,
            email,
            password
        } = req.body
    
        if(!name || !email || !password){
            res.send(`All fields are mandatory`)
        }
    
        const isEmail = await auth_model.findOne({email: email})
        if(!isEmail){
            await auth_model.create(
                {
                    id: id,
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 10)
                }
            )
            res.json(
                {
                    msg:`Register successfull`,
                    user: req.body
                }
            )
        }
        else{
            throw new CONFLICT_ERROR('Email address already registered')
        }
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req, res) =>{
    try {
        
        const id = req.params.id

        if(!id){
            res.send("Not sure what to delete")
        }
    
        await auth_model.deleteOne({
            id: id
        })

        res.send(`Deleted:${id}`)

    } catch (error) {
        res.send(`Error:${error}`)
    }
}

const currentUser = async(req, res, next) =>{
    try {
        res.status(200).json(
            {
                current_user: req.user
            }
        )
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getUsers,
    login,
    register,
    deleteUser,
    currentUser
}