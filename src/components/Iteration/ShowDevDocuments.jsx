import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import store from '../../stores/index';
import {closeBuildPlan, saveBuildPlan} from "../../actions/BuildMissionAction"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EditQuill from "../SelfComponent/EditQuill"
import MultiLineInput from "../SelfComponent/MultiLineInput"
import {closeDevelopPlan} from "../../actions/IterationAction";
import {CLOSE_DEVELOP_PLAN, GET_DEVELOP_PLAN} from "../../actions/types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DevelopPlan from "./DevelopPlan";
import TestCase from "./TestCase";

const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow:"none",
        color:"#292929",
        background:"#f5f5f5"
    },
    flex: {
        flex: 1,
    },
    RightWrapper: {
        position: "relative",
        // marginTtop:"px",
        height: "900px",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "0px",
    },
    quillWrapper: {
        // marginLeft: "8px",
        marginTop: "18px",
        // marginRight: "8px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: "563px"
    },
    quillIn: {
        height: "500px"
    },
    LeftBottom: {
        position: "relative",
        top: "80px",
        left: "12px"
    },
    title: {
        paddingTop: "5px",
        paddingBottom: "10px",
        fontSize: "19px",
        fontWeight: "20",
        align: "center"
    }

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ShowDevDocuments extends React.Component {
    state = {
        open: false,
        planContent: {},
        tabValue: 0
    };

    handleChange = (event, value) => {
        this.setState({tabValue: value});
    };
    //
    // handleClose = () => {
    //     closeDevelopPlan()
    // };

    handleClose = () => {
        closeDevelopPlan()
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    // savePlan = () => {
    //     store.dispatch(saveBuildPlan(this.state.planContent));
    //     store.dispatch(closeBuildPlan());
    // };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === GET_DEVELOP_PLAN) {
            this.setState({planContent: nextProps.developPlan, testCase: nextProps.testCase});
        }
    }


    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                planContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                planContent: data
            })
        }
    };

    render() {
        const {classes, openDevelopPlan} = this.props;
        const {tabValue} = this.state;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={openDevelopPlan}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close"
                                    style={{position: "absolute", right: "0", top: "0", "zIndex": "9999"}}>
                            <CloseIcon/>
                        </IconButton>
                        <Tabs value={tabValue} onChange={this.handleChange}>
                            <Tab label="开发方案"/>
                            <Tab label="内部联调测试案例"/>
                        </Tabs>
                    </AppBar>
                    {tabValue === 0 &&
                    <DevelopPlan content={this.state.planContent}/>
                    }
                    {tabValue === 1 &&
                    <TestCase content={this.state.testCase}/>
                    }

                </Dialog>
            </div>
        );
    }
}

ShowDevDocuments.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("map数据111:" + JSON.stringify(state.reducer.iteration.testCase));
    return {
        developPlan: state.reducer.iteration.developPlan,
        testCase: state.reducer.iteration.testCase,
        action: state.reducer.iteration.action,
        openDevelopPlan: state.reducer.iteration.openDevelopPlan
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ShowDevDocuments));