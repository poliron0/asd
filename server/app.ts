import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { deserialize, serialize } from 'serializer.ts/Serializer';

import IdGenerator from '../common/auxiliary/IdGenerator';
import { isLogValid } from '../common/auxiliary/Validators';
import { Log } from '../common/models/Log';
import { LogList } from '../common/models/LogList';

let app = express()
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let logList: LogList = new LogList([
    new Log('a', '/a'),
    new Log('b', '/b'),
    new Log('c', '/c')
])

app.get('/api/log', (req, res, next) => {
    res.send(serialize(logList))
})
app.get('/api/log/:id', (req, res, next) => {
    const id = req.params.id
    try {
        res.send(serialize(logList.get(id)))
    } catch(err) {
        res.status(400).send({err: err.message})
    }
})
app.delete('/api/log/:id', (req, res, next) => {
    const id = req.params.id
    try {
        let log = logList.get(id)
        logList.remove(id)
        res.send(serialize(log))
    } catch(err) {
        res.status(400).send({err: err.message})
    }
})
app.put('/api/log', (req, res, next) => {
    const log:Log = deserialize<Log>(Log, req.body.log)
    if(!isLogValid(log)) {
        res.status(400).send({err: 'Invalid log'})
    } else {
        try {
            logList.update(log.id, log)
            res.send(log)
        } catch(err) {
            res.status(400).send({err: err.message})
        }
    }   
})
app.post('/api/log', (req, res, next) => {
    const log:Log = deserialize<Log>(Log, req.body.log)
    if(!isLogValid(log)) {
        res.status(400).send({err: 'Invalid log'})
    } else {
        //Don't trust the client - put your own id
        log.id = IdGenerator.generateId()
        logList.add(log)
        res.send(log)
    }
})

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

