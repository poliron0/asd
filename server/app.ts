import * as express from 'express'
import * as path from 'path'

let app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.listen(3000, (err) => {
    if(err) {
        throw new Error(err)
    }
    console.log("Listening on port 3000")
})