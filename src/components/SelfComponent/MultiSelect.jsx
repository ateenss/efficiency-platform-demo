import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: "0",
        minWidth: 120,
        maxWidth: 300,
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


function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class MultipleSelect extends React.Component {
    state = {
        name: []
    };

    componentWillMount() {
        if (this.props.defaultValue){
            let array=[];
            array=this.props.defaultValue.split(",");
            this.setState({
                name:array
            })
        }
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
        // console.log(event.target.value)
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            name: value,
        });

    };

    render() {
        const { classes,InputLabelName,defaultValue ,nameIn,nameArray,openMulti} = this.props;

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="select-multiple-checkbox">{InputLabelName}</InputLabel>
                    <Select
                        multiple
                        name={nameIn}
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}

                    >
                        {nameArray.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);