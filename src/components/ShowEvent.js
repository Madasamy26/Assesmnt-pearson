import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = {
    row: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },

    label: {
        color: 'blue'
    }
};

class ShowEvent extends Component {

    render() {

        const { classes } = this.props;
        const calendars = this.props.calData.filter((calendar) => calendar._id === this.props._id)

        return <div>
            <h2>Event Details:</h2>
            {calendars.map((calendar) => {
                return (<div key={calendar._id} className={classes.row}>


                    <Typography variant="body2" gutterBottom>

                        <span className={classes.label}> Event  Name:</span> {calendar.eventName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>

                        <span className={classes.label}> Event  Description:</span> {calendar.eventDesc}
                    </Typography>


                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Event Date: </span> {calendar.eventDate}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Event Time: </span> {calendar.eventTime}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Created Date: </span>  {calendar.createdDate}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <span className={classes.label}>  Created Time: </span> {calendar.createdTime}
                    </Typography>

                </div>);
            })}

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        calendars: state
    }
}

ShowEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ShowEvent));