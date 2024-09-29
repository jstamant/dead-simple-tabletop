// TODO add express types
const errorHandler = (err, req, res, next) => {
    console.log('AN ERROR WAS RAISED!')
    console.log(err)
    next(err)
}

export default errorHandler
