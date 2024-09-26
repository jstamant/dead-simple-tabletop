// require('dotenv').config();
import 'dotenv/config'
import { Secret } from 'jsonwebtoken'
// TODO should throw an error if there's no secret set??
const secret: Secret = process.env.SECRET || 'test'

import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors';
import jwt from 'jsonwebtoken'

import sql from '../util/db'

const port = process.env.PORT || 3001

const app = express()
// TODO make this more selective, allows cors from anywhere! uh oh
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// TODO implement secret for cookie parser, and signed cookies
app.use(cookieParser());

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
  if (!user) return res.status(401).end();
  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordCorrect) return res.status(401).end();
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
  // Set the JWT as an HttpOnly cookie
  res.cookie('token', token);
  // res.cookie('token', token, {
  //   httpOnly: true,  // Prevent access via JavaScript
  //   secure: false, // this must be false for local development over http
  //   // secure: process.env.NODE_ENV === 'production',  // Set to true if using HTTPS
  //   sameSite: 'none',  // Prevent CSRF - nvm, bypassed with none, preffered to be set to 'strict'
  //   maxAge: 3600000  // 1 hour in milliseconds
  // });
  res.send('')
  // res.status(200).json({ username: user.email, token });
})
//
// Route that requires JWT verification
app.get('/protected', (req, res) => {
  const token = req.cookies.token;  // Get the token from the cookie
  if (!token) return res.status(401).end();
  const user = jwt.verify(token, secret);
  res.json({ message: 'Protected data', user });
});

// TODO this endpoint is still rough
// TODO change endpoints to /users???
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

import sheets from './controllers/sheets'
app.use('/sheets', sheets);

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
})
