import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import { logRouter } from './routers/api/log';

let app = express()
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/api/log', logRouter)


//In case no other route found return 
//index.html(for react routing to handle)
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(publicPath, '/index.html'))
})

app.listen(3000, (err) => {
    if (err) {
        throw new Error(err)
    }
    console.log("Listening on port 3000")
})

