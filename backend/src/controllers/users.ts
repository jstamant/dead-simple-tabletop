import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
import sql from '../../util/db'

// TODO this endpoint is still rough
router.post('/users', async (req, res) => {
  // TODO there should be some validation at the start, here
  console.log('creating a user!');
  const { username, password } = req.body
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await sql`INSERT INTO users (email, password_hash) VALUES (${username}, ${hashedPassword})`;
  // TODO need to return of new user's ID
  res.status(201).end();
})

export default router
