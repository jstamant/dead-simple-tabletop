// require('dotenv').config(); // TODO is this working??
import 'dotenv/config'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors';

// TODO consider moving util to the src folder??? and will need to remove from tsc settings
import {authentication} from '../util/authentication'
import errorHandler from '../util/errorHandler'

const port = process.env.PORT || 3001

const app = express()
// TODO make this more selective, allows cors from anywhere! uh oh
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// TODO implement secret for cookie parser, and signed cookies
app.use(cookieParser());

// TODO process.env.NODE_ENV == 'test'
app.use(express.json())

// TODO Should I rename controller to authentication?
import {login, logout} from './controllers/login'
// TODO should the authentication be at the router level??
app.use('/login', login);
// TODO not implemented
app.use('/logout', logout);

import users from './controllers/users'
app.use('/users', users)

import sheets from './controllers/sheets'
// TODO should the authentication be at the router level??
app.use('/sheets', authentication);
app.use('/sheets', sheets);

import games from './controllers/games'
// TODO should the authentication be at the router level??
app.use('/games', authentication);
app.use('/games', games);

app.use(errorHandler);

// TODO consider moving most of this into an app.ts file
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
})
