import express from 'express'
const app = express()
const port = process.env.PORT || 3001

// TODO process.env.NODE_ENV == 'test'

app.use(express.json())


app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  if (!('user' in req.body && 'password' in req.body)) {
    return res.status(400).end();
  }
  if (req.body.user === 'admin' && req.body.password === 'test') {
    res.status(201).send('supposed to send an id, or something');
  }
  res.status(401).send(req.body);
})

app.post('/user', (req, res) => {
  console.log('adding a user!');
  res.status(400).send(req.body);
})

app.get('/sheet', (_req, res) => {
  console.log('getting the default sheet');
  res.send('getting the default sheet');
})

app.post('/sheet', (_req, res) => {
  const message = 'creating a sheet!';
  console.log(message);
  res.send(message);
})

app.get('/sheet/:id', (req, res) => {
  const message = `getting the sheet with id ${req.params.id}`;
  console.log(message);
  res.send(message);
})

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
  console.log(`Backend listening on port ${port}`)
})
