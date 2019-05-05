import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 50
    },
    formControl: {
        margin: "0",
        minWidth: 120,
        maxWidth: 500,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class MultipleSelect extends React.Component {
    state = {
        name: []
    };

    componentWillMount() {

        if (this.props.defaultValue) {
            let array = [];
            array = this.props.defaultValue;
            this.setState({
                name: array
            })
        }
    }

    onBLUR = (rules, e) =>{
        if (rules.required) {
            if (!e.target.value || e.target.value.length == 0) {
                this.setState({message: "必填", error: true});
                this.props.onBlur({name:e.target.name , hasError:true});

                return false;
            }
        }

        this.setState({message: "", error: false});

        this.props.validate({name:e.target.name , hasError:false});

    }

    handleChange = event => {
        this.setState({name: event.target.value});
        // console.log(event.target.value)
        this.props.onChange({keyNote: event.target.name, value: event.target.value})
    };

    render() {
        const {classes, InputLabelName, defaultValue, nameIn, nameArray, openMulti} = this.props;
        let rules = {required : this.props.required}
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="select-multiple-checkbox">{InputLabelName}</InputLabel>
                        multiple
                    <Select
                        name={nameIn}
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox"/>}
                        inputProps={{
                            onBlur: this.onBLUR.bind(this, rules)
                        }}
                        renderValue={selected => (
                            selected.map(value => (
                                nameArray.map((content, index) => (
                                    value === content.id ? content.name : ""
                                ))
                            ))
                        )}
                        MenuProps={MenuProps}
                    >
                        {nameArray.map((content, index) => (
                            <MenuItem key={index} value={content.id}>
                                <Checkbox checked={this.state.name.indexOf(content.id) > -1}/>
                                <ListItemText primary={content.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography color="error">{this.state.message}</Typography>

                </FormControl>
            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MultipleSelect);