import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class SingleSelect extends React.Component {
    state = {
        value: '',
        name: 'hai',
        labelWidth: 0,
    };

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            })
        }
    }


    handleChange = event => {
        // console.log(event.target.name);
        this.setState({ value: event.target.value });
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    render() {
        const { classes,InputLabelName,nameArray,nameIn,disabled } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl} fullWidth disabled={disabled}>
                    <InputLabel htmlFor="age-simple">{InputLabelName}</InputLabel>
                    <Select
                        value={this.state.value}
                        onChange={this.handleChange}
                        name={nameIn}
                        inputProps={{
                            /*name: {nameIn},*/
                            id: 'age-simple',
                        }}
                    >
                        {
                            nameArray.map((value,index)=>{
                                return(
                                    <MenuItem value={value} key={index} >{value}</MenuItem>
                                )
                            })
                        }
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