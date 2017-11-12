import { serialize, deserialize } from 'serializer.ts/Serializer';
import * as express from 'express';
import { isLogValid } from '../../../common/auxiliary/Validators';
import { Log } from '../../../common/models/Log';
import IdGenerator from '../../../common/auxiliary/IdGenerator';
import { LogList } from '../../../common/models/LogList';
import { LogDb } from '../../db/log';

export let logRouter: express.Router = express.Router()

logRouter.get('/', async (req, res, next) => {
    res.send(await LogDb.getAll())
})

logRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        res.send(await LogDb.get(id))
    } catch(err) {
        res.status(400).send({err: err.message})
    }
})

logRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        let log = await LogDb.get(id)
        await LogDb.remove(id)
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
            LogDb.update(log)
            res.send(log)
        } 
        catch(err) {
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
        LogDb.add(log)
        res.send(log)
    }
})