import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store from '../../stores/index';
import {validate} from "../../actions/validateAction";
import Typography from "@material-ui/core/Typography";
import Grid from "../Iteration/CascadeSelect";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: 0,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    label: {
        background: "#f5f5f5",
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "12px",
        padding: "7px 7px 0 7px"
    },
    labelShow:{
        height:"35px"
    },
    labelHide:{
        height:"49px"
    }
});


const theme = createMuiTheme({
    overrides: {
        MuiSelect:{
            selectMenu:{
                paddingLeft:"10px"
            }
        },
        MuiInput: {
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


/**
 * select有几种情况
 * 1，新增的时候，有时候要有默认值，有时候不能有默认值
 * 2，编辑的时候，要有默认值
 *
 * 简单做的话：
 * 1，新增的时候，要求必填，但是不设置默认值，这样可以保证在select的时候content的内容有值
 * 2，编辑的时候，要求必填，设置默认值
 */
class SingleSelect extends React.Component {
    state = {
        value: '',
        name: 'hai',
        labelWidth: 0,
    };

    componentDidMount() {

        let value = this.props.defaultValue;

        if (this.props.defaultValue !== undefined && this.props.defaultValue !== "" && this.props.defaultValue !== null) {
console.log(this.props.nameIn + "|||" + value)
            this.setState({
                value: value
            });

            this.props.onChange({keyNote: this.props.nameIn, value: value})

        }

    }


    handleChange = event => {
        this.setState({value: event.target.value});
        !!this.props.funcArray && this.props.funcArray.map((value, key) => {
            value.name === event.target.value && store.dispatch(value.func(this.props.giveContent))
        });
        this.props.onChange({keyNote: event.target.name, value: event.target.value})
    };


    onBlur = (e) => {
        let ret = validate(this.props.validateEl, e.target.value);

        if (!ret.result) {
            this.setState({message: ret.message, error: true});
        } else {
            this.setState({message: "", error: false});
        }

        return true;
    };

    selected = (e) => {

        console.log(e.target.value)

    }

    render() {
        const {classes, InputLabelName, nameArray, nameIn, disabled} = this.props;
        let showLabel = true;
        let labelClass = classes.labelShow;

        if (this.props.defaultValue !== undefined && this.props.defaultValue !== "" && this.props.defaultValue !== null) {
            showLabel = false;
            labelClass = classes.labelHide;
        }
        return (
            <div>
                <FormControl className={classes.formControl} fullWidth disabled={disabled}>
                    <Typography className={classes.label}>{showLabel ? InputLabelName : ""}</Typography>
                    <MuiThemeProvider theme={theme}>

                    <Select style={{width: "100%", background: "#f5f5f5", borderBottom:"none !important"}} className={labelClass}
                            value={this.state.value}
                            onChange={this.handleChange}
                            name={nameIn}
                            inputProps={{
                                /*name: {nameIn},*/
                                id: 'age-simple',
                                onBlur: this.onBlur.bind(this),
                                style : {paddingLeft:"10px"}
                            }}
                            inputRef={this.props.inputRef}
                    >
                        {
                            nameArray.map((value, index) => {
                                return (
                                    <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    </MuiThemeProvider>
                    <Typography color="error">{this.state.message}</Typography>

                </FormControl>
            </div>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SingleSelect);