const { Router } = require('express')
const multer = require('multer')
const {home, compareFiles} = require('./controller.js')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/files/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '.pdf')
  }
})

const uploadHandler = multer({  storage})

const router = Router()
router.get('/', home)
router.post('/', [uploadHandler.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 }
])], compareFiles)

module.exports = router