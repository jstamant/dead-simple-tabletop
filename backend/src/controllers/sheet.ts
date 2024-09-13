import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('getting the default sheet');
  res.send('getting the default sheet');
})

router.post('/', (_req, res) => {
  const message = 'creating a sheet!';
  console.log(message);
  res.send(message);
})

router.get('/:id', (req, res) => {
  const message = `getting the sheet with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

export default router;
