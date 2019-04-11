import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import store from '../../stores/index';
import {hintPopUp} from "../../actions/BuildProjectAction"
import Typography from "@material-ui/core/Typography";

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
        this.setTextInputRef = element =>{
            this.textInput = element;
        }
    }





    handleChange = (rules, e) => {
        // this.setState({ [name]: event.target.value });

        this.props.onChange({keyNote: e.target.name, value: e.target.value})
    };

    onBLUR = (rules, e) => {

        if (rules.required) {
            if (!e.target.value) {
                this.setState({message: "必填", error: true});
                this.props.validate({name:e.target.name , hasError:true});

                return false;
            }
        }

        if (rules.maxLength && e.target.value) {
            let maxLength = parseInt(rules.maxLength);
            if (e.target.value.length > maxLength) {
                this.setState({message: "长度超限，最大[" + rules.maxLength + "]", error: true});
                this.props.validate({name:e.target.name , hasError:true});
                return false;
            }
        }

        if (rules.expr && e.target.value) {
            let regex = new RegExp(rules.expr);
            if (!regex.test(e.target.value)) {
                this.setState({message: "格式校验错误", error: true});
                this.props.validate({name:e.target.name , hasError:true});
                return false;
            }
        }

        this.setState({message: "", error: false});

        console.log(e.target.name);

        this.props.validate({name:e.target.name , hasError:false});

        return true;
    };

    render() {
        const {classes, InputLabelName, defaultValue, nameIn, disabled, error} = this.props;
        let rules = {
            required: this.props.required,
            expr: this.props.expr,
            maxLength: this.props.maxLength
        };
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    disabled={disabled}
                    id="standard-name"
                    label={InputLabelName}
                    defaultValue={!!defaultValue ? defaultValue : ""}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange.bind(this, rules)}
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBLUR.bind(this, rules)
                    }}
                    fullWidth
                    type="email"
                    error={this.state.error}
                    ref={this.setTextInputRef}
                />
                <Typography color="error">{this.state.message}</Typography>
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);