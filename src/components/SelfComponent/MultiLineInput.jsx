import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

});


class MultiLineInput extends React.Component {
    state = {

        multiline: 'Controlled',
    };



    onBLUR=event=>{
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    judgeDefaultValue=(name,value)=>!!value?(!!value[name] ? value[name] : ""):"";

    render() {
        const { classes ,InputLabelName,content,defaultValue,nameIn, ...others} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">


                <TextField
                    id="outlined-multiline-static"
                    label={InputLabelName}
                    multiline
                    rows="4"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBLUR
                    }}
                    defaultValue={!!defaultValue ? defaultValue : ""}
                    {...others}
                />



            </form>
        );
    }
}

MultiLineInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineInput);