// DO YOUR MAGIC
const {getAll,getById,create} = require('./cars-model')
const {checkCarId,checkCarPayload,checkVinNumberUnique,checkVinNumberValid} = require('./cars-middleware')
const express = require('express')
const router = express.Router()

router.use(express.json())

//Select *
router.get('/',(req,res,next)=>{
    getAll()
        .then(result=>res.json(result))
        .catch(error=>next(error))
})

//Select * where id
router.get('/:id',checkCarId,(req,res,next)=>{
    res.json(req.car)
})

//Post
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique,(req,res,next)=>{
    create(req.body)
        .then(result=>{
            res.json(result)
        })
        .catch(error=>next(error))
})

router.use((error, req, res, next)=>{
    if(error){
        res.status(error.status || 500).json({message: error.message || 'Server error'})
    }
})

module.exports= router