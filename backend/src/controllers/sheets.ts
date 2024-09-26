import express from 'express';
const router = express.Router();

import sql from '../../util/db'

router.get('/', async (_req, res) => {
  const sheets = await sql`SELECT * FROM sheets`;
  res.send(sheets);
})

router.post('/', async (_req, res) => {
  await sql`INSERT INTO sheets (user_id) VALUES (1)`;
  res.send(true);
})

router.get('/:id', (req, res) => {
  const message = `getting the sheet with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

export default router;
