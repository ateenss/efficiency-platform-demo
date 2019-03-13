import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    // rgb(0, 0, 0, 0.54)
    letter:{
        fontSize:"0.6",
        color:"#9e9e9e",
        position:"relative",
        bottom:0,
        width:"100%"
    },
    label:{
        position:"relative",
        paddingBottom:0,
        marginBottom:0,
        alignItems:"center",
        marginTop: 0,
        paddingTop: 0,
    },
    checkB:{

    },
    Boxchecked:{
        heiht:"60%",
        paddingTop:4,
        marginTop:0
    }
};

//todo:checkBox需要修改样式和两个复选框联动选择
class CheckboxLabels extends React.Component {
    state = {
        checkedA: true,
        checkedB: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes,nameIn,InputLabelName } = this.props;

        return (
            <FormGroup row>
                <Typography className={classes.letter} >
                    {InputLabelName}
                </Typography>
                        <FormControlLabel
                            className={classes.label}
                            control={
                                <Checkbox
                                    name={nameIn}
                                    className={classes.Boxchecked}
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange('checkedA')}
                                    value="1"
                                />
                            }
                            label="是"
                        />
                        <FormControlLabel
                            className={classes.label}
                            control={
                                <Checkbox
                                    name={nameIn}
                                    className={classes.Boxchecked}
                                    checked={this.state.checkedB}
                                    onChange={this.handleChange('checkedB')}
                                    value="0"
                                    color="primary"
                                />
                            }
                            label="否"
                        />
            </FormGroup>
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);