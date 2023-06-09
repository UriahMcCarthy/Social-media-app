const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
  getUsers,
  updateUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').put(updateUser).get(getSingleUser).delete(deleteUser);

router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;