import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import {validate} from "../../actions/validateAction";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
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


const theme = createMuiTheme({
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor:"#f5f5f5",
                "&:hover":{
                    background:"#f5f5f5 !important",
                },
                '&:before': {
                    borderBottom: "none"
                },
                '&:disabled':{
                    backgroundColor:"#f5f5f5",
                }
            },
            disabled:{
                backgroundColor:"#f5f5f5 !important",
            },
            underline:{
                "&:hover":"1px solid #4DAF7C !important",
                '&:before': {
                    borderBottom: "none"
                },
                '&:after':{
                    borderBottom:"1px solid #4DAF7C !important"
                }
            },
            focused:{
                backgroundColor:"#f5f5f5 !important"
            },
        },
        MuiFormLabel: {
            root:{
                "&:focused":{
                    color:"#4daf7c !important"
                }
            },
            focused:{
                color:"#4daf7c !important"
            }

        }

    },
});

class TextFields extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Cat in the Hat',
            age: '',
            message: "",
            error: false,
        };
    }





    handleChange = (e) => {

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
        const {classes, InputLabelName, defaultValue, nameIn, disabled, error, ...others} = this.props;

        return (
            <div>
                <MuiThemeProvider theme={theme}>

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
                        onBlur: this.onBlur.bind(this),
                    }}
                    variant="filled"
                    fullWidth
                    type={this.props.password ? "password" : ""}
                    error={this.state.error}
                    inputRef={this.props.inputRef}
                />
                </MuiThemeProvider>
                <Typography color="error">{this.state.message}</Typography>
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);