// GLOBAL ERROR HANDLING FUNCTION
const errorHandler = (error,req,res,next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'

    res.status(error.statusCode).json({
        status : error.statusCode,
        message : error.message
    })
}

// FOR UNDEFINED ROUTES
const notFound = (req,res,next) => {

    // CREATE THE ERROR OBJECT FOR UNDEFINED ROUTES
    const err = Error(`Cant find ${req.originalUrl} on the server`)
    err.status = 'fail'
    err.statusCode = 404

    // CALL THE GLOBAL ERROR FUNCTION
    next(err)
}


module.exports = {errorHandler,notFound}