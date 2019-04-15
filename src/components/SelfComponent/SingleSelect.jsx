import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store from '../../stores/index';
import {validate} from "../../actions/validateAction";
import Typography from "@material-ui/core/Typography";

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
        console.log(this.props.nameIn + "++++" + value)
        if(this.props.defaultValue){
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

        if(!ret.result){
            this.setState({message: ret.message, error: true});
        }else{
            this.setState({message : "", error: false});
        }

        return true;
    };

    render() {
        const {classes, InputLabelName, nameArray, nameIn, disabled} = this.props;

        return (
            <div>
                <FormControl className={classes.formControl} fullWidth disabled={disabled}>
                    <InputLabel htmlFor="age-simple">{InputLabelName}</InputLabel>
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        name={nameIn}
                        inputProps={{
                            /*name: {nameIn},*/
                            id: 'age-simple',
                            onBlur: this.onBlur.bind(this)
                        }}
                    >
                        {
                            nameArray.map((value, index) => {
                                return (
                                    <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                                )
                            })
                        }

                    </Select>
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