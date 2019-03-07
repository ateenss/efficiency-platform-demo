import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

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

class SingleSelect extends React.Component {
    state = {
        projectState: '',
        labelWidth: 20,
        name: 'hai'
    };


    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({
                projectState: this.props.defaultValue
            })
        }
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    render() {
        const { classes,nameIn,disabled ,InputLabelName} = this.props;

        return (
            <form className={classes.root} autoComplete="off" >
                <FormControl className={classes.formControl} fullWidth disabled={disabled}>
                    <InputLabel htmlFor="projectState-simple">{InputLabelName}</InputLabel>
                    <Select
                        value={this.state.projectState}
                        onChange={this.handleChange}
                        name={nameIn}
                        inputProps={{
                            name: 'projectState',
                            id: 'projectState-simple',
                        }}
                    >
                        <MenuItem value="正在进行" >正在进行</MenuItem>
                        <MenuItem value="已完成" >已完成</MenuItem>
                    </Select>
                </FormControl>
            </form>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSelect);