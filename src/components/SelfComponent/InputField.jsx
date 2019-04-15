import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import store from '../../stores/index';
import {hintPopUp} from "../../actions/BuildProjectAction"
import Typography from "@material-ui/core/Typography";
import {validate} from "../../actions/validateAction";
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        marginTop: 0
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class TextFields extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Cat in the Hat',
            age: '',
            message: "",
            error: false
        };
    }





    handleChange = (e) => {
        // this.setState({ [name]: event.target.value });

        this.props.onChange({keyNote: e.target.name, value: e.target.value})
    };

    onBlur = (e) => {
        let ret = validate(this.props.validateEl, e.target.value);

        if(!ret.result){
            this.setState({message: ret.message, error: true});
        }else{
            this.setState({message : "", error: false});
        }

        return true;
    };

    render() {
        const {classes, InputLabelName, defaultValue, nameIn, disabled, error} = this.props;

        return (
            <div>
                <TextField
                    disabled={disabled}
                    id="standard-name"
                    label={InputLabelName}
                    defaultValue={!!defaultValue ? defaultValue : ""}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange.bind(this)}
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBlur.bind(this)
                    }}
                    fullWidth
                    type={this.props.password ? "password" : ""}
                    error={this.state.error}
                />
                <Typography color="error">{this.state.message}</Typography>
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);