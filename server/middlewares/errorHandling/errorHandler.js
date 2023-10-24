const errorHandler = (err, req, res, next) =>{
    const error = {
        title: err.constructor.name,
        code: err.code || 500,
        message: err.message,
        //stackTrace: err.stack
    }

    res.status(err.code).json(
        {
            error: error
        }
    )
}

module.exports = errorHandler