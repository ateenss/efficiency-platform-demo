import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});


class MultiLineInput extends React.Component {
    state = {
        /*name: 'Cat in the Hat',
        age: '',*/
        multiline: 'Controlled',
    };

    handleChange = event => {
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    render() {
        const { classes ,InputLabelName,defaultValue,nameIn} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">


                <TextField
                    id="outlined-multiline-static"
                    label={InputLabelName}
                    multiline
                    rows="4"
                    defaultValue={defaultValue}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={nameIn}
                    onChange={this.handleChange}
                />



            </form>
        );
    }
}

MultiLineInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineInput);