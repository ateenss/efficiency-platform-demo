import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        background:"#f5f5f5"
    },
    dense: {
        marginTop: 16,
    },
    customInput:{
        backgroundColor:"#f5f5f5 !important"
    }

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

                <MuiThemeProvider theme={theme}>

                <TextField
                    id="outlined-multiline-static"
                    label={InputLabelName}
                    multiline
                    rows="2"
                    margin="normal"
                    variant="filled"
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBLUR
                    }}
                    defaultValue={!!defaultValue ? defaultValue : ""}
                    {...others}
                />

                </MuiThemeProvider>

            </form>
        );
    }
}

MultiLineInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiLineInput);