const express = require('express');

const { getUSerById, getUSerByAvatar, getUserList, addUserItem, updateUserItem, patchUserItem, removeUserItem } = require('../services/users');

const router = express.Router();

const PREFIX = '/users';

router.get('/:id', async (req, res) => {
const user = await getUSerById(req.params.id);
  
    if (!user) {
      res.sendStatus(404);
      return;
    }
  
    res.send(user);
});

router.get('/avatar ', async (req, res) => {
const user = await getUSerByAvatar(req.params.avatar);
      
    if (!user) {
      res.sendStatus(404);
      return;
    }
      
    res.send(user);
});
  
router.get('/', async (req, res) => {
    const users = await getUserList();
  
    res.send(users);
});
  
router.post('/public/avatars', async (req, res) => {
    await addUserItem(req.body);
  
    res.sendStatus(201);
});
  
router.put('/:id', async (req, res) => {
    await updateUserItem(req.params.id, req.body);
  
    res.sendStatus(200);
});
  
router.patch('/:id', async (req, res) => {
    await patchUserItem(req.params.id, req.body);
  
    res.sendStatus(200);
});
  
router.delete('/:id', async (req, res) => {
    await removeUserItem(req.params.id);
  
    res.sendStatus(200);
});
  
module.exports = [PREFIX, router];