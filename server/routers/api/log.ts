import { serialize, deserialize } from 'serializer.ts/Serializer';
import * as express from 'express'
import { isLogValid } from '../../../common/auxiliary/Validators';
import { Log } from '../../../common/models/Log';
import IdGenerator from '../../../common/auxiliary/IdGenerator';
import { LogList } from '../../../common/models/LogList';

let logList: LogList = new LogList([
    new Log('a', '/a'),
    new Log('b', '/b'),
    new Log('c', '/c')
])

export let logRouter: express.Router = express.Router()

logRouter.get('/', (req, res, next) => {
    res.send(serialize(logList))
})

logRouter.get('/:id', (req, res, next) => {
    const id = req.params.id
    try {
        res.send(serialize(logList.get(id)))
    } catch(err) {
        res.status(400).send({err: err.message})
    }
})

logRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id
    try {
        let log = logList.get(id)
        logList.remove(id)
        res.send(serialize(log))
    } catch(err) {
        res.status(400).send({err: err.message})
    }
})

logRouter.put('/', (req, res, next) => {
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

logRouter.post('/', (req, res, next) => {
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