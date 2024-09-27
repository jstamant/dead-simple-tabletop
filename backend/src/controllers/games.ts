import express from 'express';
const router = express.Router();

import sql from '../../util/db'

router.get('/', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  const sheets = await sql`
SELECT *
FROM games g
JOIN games_users gu ON g.id = gu.game_id
WHERE gu.user_id = ${user.id}`;
  res.send(sheets);
})

router.post('/', async (req, res) => {
  const user = req.user;
  // TODO make this validation everywhere, pretty much, or make user not optional?
  if (!user) return res.status(400).end(); // is this actually 401?
  await sql`
WITH new_game AS (
INSERT INTO games (name) VALUES ('test')
RETURNING id
)
INSERT INTO games_users (game_id, user_id)
SELECT id, ${user.id} FROM new_game`
  res.send(true);
})

// not done
router.get('/:id', (req, res) => {
  const message = `getting the game with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

export default router;
