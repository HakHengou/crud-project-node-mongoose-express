const router = require('express').Router();
const profileController = require('../controllers/profiles');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname);
    }
})

const upload = multer({
    // dest: 'images',
    storage: storage
});

// router.post('/upload',upload.single('upload'), async ( req, res) => {
    
//     console.log('Buffer ',req.file, req.body)
//     return res.send({message: 'Uploaded !'});
// });
router.get('/profile', asyncHandler(profileController.getProfile));
router.post('/profile', upload.single('upload'), asyncHandler(profileController.createProfile));
router.delete('/profile/:id', asyncHandler(profileController.deleteProfile));
router.patch('/profile/:id', asyncHandler(profileController.updateProfile));

module.exports = router;



// const storage = multer.diskStorage({
//     // destination: function(req, file, cb){
//     //     cb(null, './upload/image');
//     // },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString()+file.originalname);
//     }
// })
// const upload = multer({
//     dest: 'images',
//     storage: storage
// });

// router.post('/upload',upload.single('upload'), async ( req, res) => {
    
//     console.log('Buffer ',req.file, req.body)
//     return res.send({message: 'Uploaded !'});
// });