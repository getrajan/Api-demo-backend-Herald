const express = require('express');
const multer = require('multer');

const tourController = require('./tourController');

const router = express.Router();

router.use(express.static(__dirname+"./upload"));
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});
var upload = multer({storage:storage});

router.post('/createTour',tourController.createTour);
router.get('/getTours',tourController.getTours);
router.get('/getTour',tourController.getTour);
router.post('/deleteTour',tourController.deleteTour);
router.patch('/updateTour/:id',tourController.updateTour);

module.exports = router;