import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class RadioButtonsGroup extends React.Component {
    state = {
        value: 'femal',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        // this.props.onChange(event)
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    componentWillMount() {
        if(this.props.defaultValue){
            this.setState({
                value:this.props.defaultValue
            })
        }
    }

    render() {
        const { classes} = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    {/*<FormLabel component="legend">状态</FormLabel>*/}
                    <RadioGroup
                        aria-label="Gender"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="projectState"
                    >
                        <FormControlLabel value="doing" control={<Radio />} label="进行中" />
                        <FormControlLabel
                            value="finish"
                            control={<Radio color="primary" />}
                            label="已完成"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);