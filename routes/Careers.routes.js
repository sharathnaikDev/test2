const express = require("express");
const {
  getCareer,
  getCareers,
  createCareer,
  UpdateCareer,
  deleteCareer,
} = require("../controller/career.controller");

const router = express.Router();

router.route("/").get(getCareers).post(createCareer);

router.route('/:id').get(getCareer).delete(deleteCareer).put(UpdateCareer); 

module.exports = router;
