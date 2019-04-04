import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "./SingleSelect";


const styles = {
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    letter:{
        fontSize:"0.6",
        color:"#9e9e9e",
        position:"relative",
        bottom:0,
        width:"100%"
    },
    label1:{
        position:"absolute",
        top:"10px",
        left:"0",
        marginRight:"20px"
    },
    label0:{
        position:"absolute",
        top:"10px",
        right:"0",
        left:"80px",
        marginRight:"0"
    }
};

class RadioButtons extends React.Component {
    state = {
        value: '是',
    };

    componentWillMount() {
        if (this.props.defaultValue){
            this.setState({
                value:this.props.defaultValue
            })
        }
    }

    handleChange = event => {
        console.log({keyNote:event.target.name,value:event.target.value});
        this.setState({ value: event.target.value });
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    render() {
        const { classes,InputLabelName,labelArray,nameIn ,defaultValue} = this.props;

        return (
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.letter}>{InputLabelName}</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name={nameIn}
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {
                            labelArray.map((value, index) => {
                                return (
                                    <FormControlLabel key={index} value={value.id} control={<Checkbox />} label={value.name} className={classes["label"+value.id]}/>
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);