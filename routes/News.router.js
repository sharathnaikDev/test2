const express = require("express");
const {
    getNews,
    createNews,
    getSingleNews,
    deleteNews,
    UpdateNews,
} = require("../controller/news.controller");

const router = express.Router();

const {protect, authorize} = require('../middleware/auth.middleware')


router.route("/").get(getNews).post( createNews); //post(protect, authorize('admin'), createNews)

router.route('/:id').get(getSingleNews).delete(protect, authorize('admin'), deleteNews).put(protect, authorize('admin'),UpdateNews); 

module.exports = router;
