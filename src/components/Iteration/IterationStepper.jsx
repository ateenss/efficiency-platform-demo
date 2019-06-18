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



class IterationStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    format = (date, fmt) => { //author: meizz
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };

    gt = (s1,s2) =>{
        if(!!s1 && !!s2){
            return ((new Date(s1.replace(/-/g,"\/")))>(new Date(s2.replace(/-/g,"\/"))));
        }

        return false;
    };


    render() {
        const {classes, steppers} = this.props;

        var today = this.format(new Date(),"yyyy-MM-dd");



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
                <MuiThemeProvider theme={theme}>
                    <Stepper orientation="horizontal" alternativeLabel>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.developPlanSubmitDate)} active={!this.gt(today, steppers.developPlanSubmitDate)}>
                            <StepLabel optional={<Chip className={classes.chip} label={steppers.developPlanSubmitDate}/>}>开发方案提交</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.codeReviewDate)} active={!this.gt(today, steppers.codeReviewDate) && this.gt(today, steppers.developPlanSubmitDate)}>
                            <StepLabel optional={<Chip className={classes.chip} label={steppers.codeReviewDate}/>}>代码走查</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.ciDate)} active={!this.gt(today, steppers.ciDate) && this.gt(today, steppers.codeReviewDate)}>
                            <StepLabel
                                optional={<Chip className={classes.chip} label={steppers.ciDate}/>}>持续集成</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.testDate)} active={!this.gt(today, steppers.testDate) && this.gt(today, steppers.ciDate)}>
                            <StepLabel
                                optional={<Chip className={classes.chip} label={steppers.testDate}/>}>提测</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.publishDate)} active={!this.gt(today, steppers.publishDate) && this.gt(today, steppers.testDate)}>
                            <StepLabel
                                optional={<Chip className={classes.chip} label={steppers.publishDate}/>}>发布</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.greyDate)} active={!this.gt(today, steppers.greyDate) && this.gt(today, steppers.publishDate)}>
                            <StepLabel
                                optional={<Chip className={classes.chip} label={steppers.greyDate}/>}>灰度</StepLabel>
                        </Step>
                        <Step className={classes.stepContent} completed={this.gt(today, steppers.deliveryDate)} active={!this.gt(today, steppers.deliveryDate) && this.gt(today, steppers.greyDate)}>
                            <StepLabel
                                optional={<Chip className={classes.chip} label={steppers.deliveryDate}/>}>上线</StepLabel>
                        </Step>

                    </Stepper>
                </MuiThemeProvider>
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