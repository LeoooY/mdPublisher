const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' })


export default (req, res) => {
    res.statusCode = 200
    // console.log(res.files)
    // res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe' }))
}