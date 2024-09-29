import express from 'express';
const router = express.Router();

import sql from '../util/db'

router.get('/', async (req, res) => {
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
  const defaultSheetName = `Character${Math.floor(Math.random()*100)}`
  const sheet = await sql`INSERT INTO sheets (user_id, title) VALUES (${user.id}, ${defaultSheetName}) RETURNING *`;
  res.send(sheet[0]);
})

// not done
router.get('/:id', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const sheet = await sql`SELECT * FROM sheets WHERE id = ${req.params.id} AND user_id = ${user.id}`;
  res.send(sheet[0]);
})

router.delete('/:id', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  await sql`DELETE FROM sheets WHERE id = ${req.params.id} AND user_id = ${user.id}`;
  res.status(204).end();
})

router.get('/:id/elements', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const elements = await sql`
SELECT sf.*
FROM sheet_elements sf
JOIN sheets s ON s.id = sf.sheet_id
WHERE s.id = ${req.params.id}
AND s.user_id = ${user.id}`;
  res.send(elements);
})

router.post('/:id/elements', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const element = await sql`
INSERT INTO sheet_elements (sheet_id, type_id)
VALUES (${req.params.id}, 1)
RETURNING *`;
  res.send(element[0]);
})

router.delete('/:id/elements/:element', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  // TODO implement sheet id and user to prevent deleting ANY element
  await sql`DELETE FROM sheet_elements WHERE id = ${req.params.element}`;
  res.status(204).end();
})

export default router;
