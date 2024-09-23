// require('dotenv').config();
import 'dotenv/config'
import { Secret } from 'jsonwebtoken'
// TODO should throw an error if there's no secret set??
const secret: Secret = process.env.SECRET || 'test'

import bcrypt from 'bcrypt'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'

import sql from '../util/db'

const app = express()
const port = process.env.PORT || 3001

// TODO make this more selective, allows cors from anywhere! uh oh
app.use(cors());

// TODO process.env.NODE_ENV == 'test'
app.use(express.json())


app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  // TODO there should be some validation at the start, here
  // I need to figure out how I want to do validation
  if (!('username' in req.body && 'password' in req.body)) {
    return res.status(400).end();
  }
  const user = (await sql`SELECT * FROM users WHERE email = ${username}`)[0];
  if (!user) {
    return res.status(401).end();
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordCorrect) {
    return res.status(401).end();
  }
  const payload = {
    username: user.email,
    id: user.id
  }
  const token = jwt.sign(
    payload,
    secret,
    { expiresIn: 60*60 }
  )
  sql`UPDATE users SET last_login = now() WHERE id = ${user.id}`.execute();
  res.status(200).json({ username: user.email, token });
})

// TODO this endpoint is still rough
app.post('/user', async (req, res) => {
  // TODO there should be some validation at the start, here
  console.log('creating a user!');
  const { username, password } = req.body
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await sql`INSERT INTO users (email, password_hash) VALUES (${username}, ${hashedPassword})`;
  // TODO need to return of new user's ID
  res.status(201).end();
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
