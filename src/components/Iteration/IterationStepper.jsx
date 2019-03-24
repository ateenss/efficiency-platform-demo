import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Chip from "@material-ui/core/Chip";
import StepConnector from "@material-ui/core/StepConnector";

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
    stepContent:{
        borderLeft:"0",
        paddingLeft:"0",
        textAlign:"center"
    },
    chip:{
        marginTop:"10px"
    }
});

class IterationStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
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
            <div className={classes.root}>
                <Stepper orientation="horizontal" alternativeLabel>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip} label={steppers.developPlanSubmitDate} />}>开发方案提交</StepLabel>
                    </Step>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip}  label={steppers.codeReviewDate} />}>代码走查</StepLabel>
                    </Step>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip}  label={steppers.ciDate} />}>持续集成</StepLabel>
                    </Step>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip}  label={steppers.testDate} />}>提测</StepLabel>
                    </Step>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip}  label={steppers.publishDate} />}>发布</StepLabel>
                    </Step>
                    <Step className={classes.stepContent}>
                        <StepLabel optional={<Chip className={classes.chip}  label={steppers.deliveryDate} />}>上线</StepLabel>
                    </Step>

                </Stepper>
                {/*{activeStep === steps.length && (*/}
                    {/*<Paper square elevation={0} className={classes.resetContainer}>*/}
                        {/*<Typography>All steps completed - you&apos;re finished</Typography>*/}
                        {/*<Button onClick={this.handleReset} className={classes.button}>*/}
                            {/*Reset*/}
                        {/*</Button>*/}
                    {/*</Paper>*/}
                {/*)}*/}
            </div>
    )
        ;
    }
}

IterationStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(IterationStepper);