
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const uuidv1 = require('uuid/v1');

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class PostPeople extends Component {

    

    handleSubmit = (e) => {
        e.preventDefault();
        const eventName = this.getEventName.value;
        const eventDesc = this.getEventDesc.value;
        const eventDate = this.getEventDate.value;
        const eventTime = this.getEventTime.value;
        const createdDate = moment().format('DD-MM-YYYY');
        const createdTime = moment().format('h:mm:ss a');


        const data = {
            id: uuidv1(),
            eventName,
            eventDesc,
            eventDate,
            eventTime,
            createdDate,
            createdTime,
        }
        this.props.dispatch({
            type: 'ADD_POST',
            data
        });

        this.getEventName.value = '';
        this.getEventDesc.value = '';
        this.getEventDate.value = moment().format('MM-DD-YYYY');
        this.getEventTime.value = moment().format('h:mm:ss a');

        this.props.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}
                >
                    <input required type="text" ref={(input) => this.getEventName = input}
                        placeholder="Event Name" />
                    <br /><br />

                    <input required type="text" ref={(input) => this.getEventDesc = input}
                        placeholder="Description" />
                    <br /><br />
                    <input required type="date"  ref={(input) => this.getEventDate = input}
                        placeholder="Date" />
                    <br /><br />
                    <input required type="text" val = "12:00 am" ref={(input) => this.getEventTime = input}
                        placeholder="Time" />
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}
                        className={classes.button}>
                        ADD
                     </Button>
                </form>
            </div>
        );
    }
}

PostPeople.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(PostPeople));