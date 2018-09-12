import React, { Component } from 'react';
import { connect } from 'react-redux';
 import ShowEvent from './ShowEvent';
import ButtonAppBar from './ButtonAppBar';
 import PostEvent from './PostEvent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import axios from 'axios'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function generate(element) {
    return React.cloneElement(element, {
        key: 1,
    });
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,

        color: theme.palette.text.secondary,
    },
    modelPaper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class Calendars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCalendarId: '', open: false, dense: false,
            secondary: false,
            events:[]
        }
    }

    clickHandler(id) {

        this.setState({ selectedCalendarId: id })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(id) {
        this.props.dispatch({ type: 'DELETE_POST', id: id });
    }

    componentDidMount(){
        // axios.get(`http://localhost:4000/events`)
        // .then(res => {
        //   const events = res.data;
        //   console.log('Json data'+JSON.stringify(events))
        //   //this.setState({events})
        //   this.props.dispatch({ type: 'INTIAL_EVENTS', events });
        // })

    }
    render() {

        const { classes } = this.props;
        const { dense, secondary } = this.state;
        return (
            <div className={classes.root}>
              
                    < ButtonAppBar />
                    <Grid container spacing={8} style={{ marginTop: '5px' }}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <h1>Calenders</h1>
                                <div className={classes.demo}>
                                    <List dense={dense}>
                                        {this.props.calendars.map((calendar) => {
                                            return (generate(
                                                <ListItem>

                                                    <ListItemText
                                                        primary={calendar.eventName}
                                                        secondary={secondary ? 'Secondary text' : null}
                                                        onClick={this.clickHandler.bind(this, calendar.id)}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={this.handleDelete.bind(this, calendar.id)}
                                                            aria-label="Delete" >
                                                            <DeleteIcon
                                                            />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>,
                                            ))
                                        })}
                                    </List>
                                </div>

                            </Paper>
                        </Grid>
                        <Grid item xs={7}>
                            <Paper className={classes.paper}>
                                {this.state.selectedCalendarId ? <ShowEvent id={this.state.selectedCalendarId} /> :
                                    <div > <h2> Select a Event ! </h2> </div>}

                            </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <Button onClick={this.handleOpen}>Add Event</Button>
                            </Paper>
                        </Grid>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <div style={getModalStyle()} className={classes.modelPaper}>
                                <Typography variant="title" id="modal-title">
                                    Add a Event
                                </Typography>
                                <PostEvent handleClose={this.handleClose} />
                            </div>
                        </Modal>

                    </Grid>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        calendars: state
    }
}

Calendars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Calendars));

