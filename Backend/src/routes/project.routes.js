const express = require('express');
const router = express.Router();
const projectController = require("../controllers/project.controller")


router.post('/create', projectController.create)

router.get('/list', projectController.list)


module.exports = router;