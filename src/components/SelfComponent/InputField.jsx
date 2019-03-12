import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import store from '../../stores/index';
import {hintPopUp} from "../../actions/BuildProjectAction"

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        marginTop:0
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});



class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        message: ""
    };

    handleChange = event => {
        // this.setState({ [name]: event.target.value });
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    onBLUR = e => {
        const regex = GlobalValidateRegex[e.target.name];
        if (!regex.ok(e.target.value)) {
            this.setState({message : regex.message});
            store.dispatch(hintPopUp({[e.target.name]:regex.message}));
        }else{
            // this.setState({message:""})
            store.dispatch(hintPopUp({[e.target.name]:""}));
        }


    };

    render() {
        const { classes ,InputLabelName,defaultValue,nameIn,disabled,error} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    disabled={disabled}
                    id="standard-name"
                    label={InputLabelName}
                    defaultValue={defaultValue}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBLUR
                    }}
                    fullWidth
                    type="email"
                    error={error}
                />
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);