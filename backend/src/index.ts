// require('dotenv').config();
import 'dotenv/config'
import { Secret } from 'jsonwebtoken'
// TODO should throw an error if there's no secret set??
const secret: Secret = process.env.SECRET || 'test'

import express from 'express'
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import sql from '../util/db'

const app = express()
const port = process.env.PORT || 3001


// TODO process.env.NODE_ENV == 'test'

app.use(express.json())


app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  // TODO there should be some validation at the start, here
  // if (!('user' in req.body && 'password' in req.body)) {
  //   return res.status(400).end();
  // }
  // const user = await User.findOne({ username })
  // const isPasswordCorrect = user === null
  //   ? false
  //   : await bcrypt.compare(password, user.password)
  // if (!user || !isPasswordCorrect) {
  //   const error = new Error('Invalid username or password')
  //   error.name = 'InvalidCredentials'
  //   return next(error)
  // }
  const payload = {
    // username: user.username,
    // id: user._id
    username,
    id: 1001
  }
  const token = jwt.sign(
    payload,
    secret,
    { expiresIn: 60*60 }
  )
  if (username !== 'admin' || password !== 'test') {
    return res.status(401).end();
  }
  res.status(200).json({ username, token });
  // response.status(200).json({ username: user.username, token })
})

app.post('/user', async (req, res) => {
  console.log('creating a user!');
  const user = await sql`select * from users limit 1`;
  console.log(user);
  res.status(400).send(req.body);
})

import sheet from './controllers/sheet'
app.use('/sheet', sheet);

app.get('/game', (_req, res) => {
  const message = 'getting the default game';
  console.log(message);
  res.send(message);
})

app.post('/game', (_req, res) => {
  const message = 'creating a game!';
  console.log(message);
  res.send(message);
})

app.get('/game/:id', (req, res) => {
  const message = `getting the game with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
})
