const {getById} = require('./cars-model')
const vinValid = require('vin-validator')
const db = require('../../data/db-config')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  getById(req.params.id)
    .then(result=>{
      if(result){
        req.car = result
        next()
      }else{
        return res.status(404).json({ message: `car with id ${req.params.id} is not found` })
      }
    })
    .catch(error=>next(error))
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = {status:400}
  const {vin, make, model, mileage} = req.body
  let errCheck = []

  if(vin === undefined || vin.trim() === ''){
    errCheck.push('vin')
  }
  if(make === undefined || make.trim() === ''){
    errCheck.push('make')
  }
  if(model === undefined || model.trim() === ''){
    errCheck.push('model')
  }
  if(mileage === undefined || typeof mileage !== 'number'){
    errCheck.push('mileage')
  }

  if(errCheck.length > 0){
    error.message = errCheck.join(', ') + ' is missing'
    next(error)
  }else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body
  const error = {status:400}
  if(vinValid.validate(vin)){
    next()
  }else{
    error.message = `vin ${vin} is invalid`
    next(error)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const check = await db('cars').where('vin', req.body.vin)
  const error = {status:400}

  if(check.length > 0){
    error.message = `vin ${req.body.vin} already exists`
  }

  error.message ? next(error) : next()
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid 
}