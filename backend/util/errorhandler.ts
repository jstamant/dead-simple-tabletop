import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('AN ERROR WAS RAISED!')
    console.log(err)
    const errorName = err.name
    const payload = { error: `${err.name}: ${err.message}` }
    switch (errorName) {
        case 'TokenExpiredError':
            // Happens when a JWT is decoded, and found to be expired
            res.status(401).send(payload)
            break;
        case 'JsonWebTokenError':
            // Happens when ??
            res.status(400).send(payload)
            break;
    }
    next(err)
}

export default errorHandler
