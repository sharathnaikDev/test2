const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  UpdateUser,
  deleteUser,
} = require("../controller/users.controller");

const router = express.Router();

const {protect, authorize} = require('../middleware/auth.middleware')

// router.use(protect);
// router.use(authorize('admin'));

router.route("/")
 .get(getUsers)
 .post(createUser); // .post(authorize('admin'), createUser);

router.route('/:id')
.get(authorize('admin'), getUser)
.delete( deleteUser) //delete(authorize('admin'), deleteUser)
.put( UpdateUser); // put(authorize('admin'), UpdateUser) 

module.exports = router;
