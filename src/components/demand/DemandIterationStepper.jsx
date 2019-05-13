import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Chip from "@material-ui/core/Chip";
import StepConnector from "@material-ui/core/StepConnector";
import {createMuiTheme} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        width: '100%',
    },
    connectorActive: {
        '& $connectorLine': {
            borderColor: theme.palette.secondary.main,
        },
    },
    connectorCompleted: {
        '& $connectorLine': {
            borderColor: theme.palette.primary.main,
        },
    },
    connectorDisabled: {
        '& $connectorLine': {
            borderColor: theme.palette.grey[100],
        },
    },
    connectorLine: {
        transition: theme.transitions.create('border-color'),
    },
    stepContent: {
        borderLeft: "0",
        paddingLeft: "0",
        textAlign: "center",
    },
    stepIcon: {
        '&$active': {
            color: "#121212"
        },
        color: "#121212",
        fontSize: "34px"
    },
    StepIcon: {
        color: "#121212"
    },
    chip: {
        marginTop: "10px"
    },
});

const theme = createMuiTheme({
    overrides: {
        MuiStepIcon: {
            root: {
                '&$active': {
                    color: "#4DAF7C"
                },
            },
        },
    },
});


class DemandIterationStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };


    render() {
        const {classes, steppers} = this.props;
        const {activeStep} = this.state;
        const connector = (
            <StepConnector
                classes={{
                    active: classes.connectorActive,
                    completed: classes.connectorCompleted,
                    disabled: classes.connectorDisabled,
                    line: classes.connectorLine,
                }}
            />
        );
        return (
            <Grid container>
                <Grid item xs={12}>
                    <MuiThemeProvider theme={theme}>
                        <Stepper orientation="horizontal" alternativeLabel>

                            <Step className={classes.stepContent}>
                                <StepLabel
                                    optional={<Chip className={classes.chip}
                                                    label={!!steppers.testDate ? steppers.testDate : "未指定"}/>}>提测</StepLabel>
                            </Step>
                            <Step className={classes.stepContent}>
                                <StepLabel
                                    optional={<Chip className={classes.chip}
                                                    label={!!steppers.publishDate ? steppers.publishDate : "未指定"}/>}>发布</StepLabel>
                            </Step>
                            <Step className={classes.stepContent}>
                                <StepLabel
                                    optional={<Chip className={classes.chip}
                                                    label={!!steppers.deliveryDate ? steppers.deliveryDate : "未指定"}/>}>上线</StepLabel>
                            </Step>

                        </Stepper>
                    </MuiThemeProvider>
                </Grid>
            </Grid>

        )
            ;
    }
}

DemandIterationStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(DemandIterationStepper);