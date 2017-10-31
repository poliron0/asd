import { Button, Card, CardActions, CardContent } from 'material-ui';
import TextFormat from 'material-ui-icons/TextFormat';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import Typography from 'material-ui/Typography';
import * as React from 'react';

import { Log } from '../../models/Log';

export interface LogCardProps {
    log: Log
    onSetEditMode()
    onRemove()
}

interface LogCardState {

}

export default class LogCard extends React.Component<LogCardProps, LogCardState> {
    render() {

        const log = this.props.log
        const regularExpressionsList = log.regexList.getAll().length ?
            <List dense>
                {log.regexList.getAll().map((logRegex, index) =>
                    <ListItem key={logRegex.id}>
                        <ListItemIcon>
                            <TextFormat />
                        </ListItemIcon>
                        <ListItemText primary={logRegex.exp} style={{ paddingLeft: '1px' }} />
                    </ListItem>
                )}
            </List> : <i>No regular espressions added yet!</i>

        const cardContent =
            <CardContent style={{ paddingBottom: '1px' }}>
                <Typography type='headline' component='h2'>
                    Log summary
                </Typography>
                <Typography type='body1'>
                    <b>Does the log contain a special line?</b> {log.isSpecialLine ? 'yes' : 'no'}
                    <br />
                    <b>Is is a rotating log:</b> {log.isRotating ? 'yes' : 'no'}
                    <br />
                    <b>Name:</b> {log.name}
                    <br />
                    <b>Location:</b> {log.location}
                    <br />
                </Typography>
                <b>Regular expressions to capture:</b> {regularExpressionsList}
            </CardContent>

        const cardAction =
            <CardActions>
                <Button raised color='primary' onClick={this.props.onSetEditMode}>
                    Edit
                </Button>
                <Button raised color="accent" onClick={this.props.onRemove}>
                    Remove
                </Button>
            </CardActions>


        return (
            <Card style={{ width: 300}}>
                {cardContent}
                {cardAction}
            </Card>
        );
    }
}