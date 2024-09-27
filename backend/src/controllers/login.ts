import express from 'express'
const router = express.Router()

import sql from '../../util/db'

router.post('/', async (req, res) => {
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
    { expiresIn: 60*60 } // 1 hour
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

export default router
