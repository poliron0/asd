import * as express from 'express'
import * as path from 'path'

let app = express()
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

//In case no other route found return 
//index.html(for react routing to handle)
app.get('/*', (req,res,next) => {
    res.sendFile(path.join(publicPath, '/index.html'))
})

app.listen(3000, (err) => {
    if(err) {
        throw new Error(err)
    }
    console.log("Listening on port 3000")
})

