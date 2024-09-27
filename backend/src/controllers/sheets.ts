import express from 'express';
const router = express.Router();

import sql from '../../util/db'

router.get('/', async (req, res) => {
  console.log('getting sheets user', req.user);
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const sheets = await sql`SELECT * FROM sheets WHERE user_id = ${user.id}`;
  res.send(sheets);
})

router.post('/', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const sheet = await sql`INSERT INTO sheets (user_id) VALUES (${user.id}) RETURNING *`;
  res.send(sheet[0]);
})

// not done
router.get('/:id', (req, res) => {
  const message = `getting the sheet with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

router.delete('/:id', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  await sql`DELETE FROM sheets WHERE id = ${req.params.id} AND user_id = ${user.id}`;
  res.status(204).end();
})

export default router;
