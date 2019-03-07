import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

function TimePicker(props) {
    const { classes ,InputLabelName} = props;

    return (
        <form className={classes.container} noValidate >
            <TextField
                id="date"
                label={InputLabelName}
                type="date"
                defaultValue="2019-03-24"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

TimePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePicker);