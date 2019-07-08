// implement your API here

const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
      console.log(users);
    })
    .catch(err => {
      res.status(500).json({
        error: 'The users information could not be retrieved.'
      });
    });
});

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;
  const newUser = {
    name,
    bio
  };

  db.insert(newUser)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'Please provide name and bio for the user.' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.remove(id)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
      res.status(200).json({
        message: 'user has been deleted successfully'
      });
    })
    .catch(() =>
      res.status(500).json({ error: 'The user could not be removed' })
    );
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const newUser = {
    name,
    bio
  };

  db.update(id, newUser)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'Please provide name and bio for the user.' });
    });
});

server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
