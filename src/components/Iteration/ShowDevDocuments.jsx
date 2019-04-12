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
import {closeDevelopPlan, getDevelopPlan, ProvePlan} from "../../actions/IterationAction";
import {CLOSE_DEVELOP_PLAN, GET_DEVELOP_PLAN} from "../../actions/types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DevelopPlan from "./DevelopPlan";
import TestCase from "./TestCase";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DevelopPlanMenuList from "./DevelopPlanMenuList";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow: "none",
        color: "#292929",
        background: "#f5f5f5"
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

    handleProvePlan = (id) => {
        ProvePlan(id);
        console.log("developPlanProved" + id);
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
            this.setState({
                planContent: nextProps.developPlan,
                testCase: nextProps.testCase,
                demandId: nextProps.demandId
            });
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
                    open={!!openDevelopPlan ? openDevelopPlan : false}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >

                    <AppBar className={classes.appBar}>
                        <DevelopPlanMenuList icon={<MoreVertIcon/>}
                                             useId={this.state.demandId}
                                             handleProvePlan={this.handleProvePlan}
                                             handleClosePlan={this.handleClose}/>

                        <Tabs value={tabValue} onChange={this.handleChange}>
                            <Tab label="开发方案"/>
                            <Tab label="内部联调测试案例"/>
                            <Tab label="问题记录"/>
                        </Tabs>
                    </AppBar>
                    {/*{tabValue === 0 &&
                    <DevelopPlan content={this.state.planContent}/>
                    }*/}
                    {tabValue === 0 &&
                    <DevelopPlan content={this.state.planContent}/>
                    }
                    {tabValue === 1 &&
                    <TestCase content={this.state.testCase}/>
                    }
                    {tabValue === 2 &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <MultiLineInput fullWidth
                                            InputLabelName="问题记录"
                                            nameIn="suggestion"
                                            onChange={this.getContent}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" fullWidth>
                                保存
                            </Button>
                        </Grid>
                    </Grid>

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
    return {
        developPlan: state.reducer.iteration.developPlan,
        testCase: state.reducer.iteration.testCase,
        demandId: state.reducer.iteration.demandId,
        action: state.reducer.iteration.action,
        openDevelopPlan: state.reducer.iteration.openDevelopPlan,
        wantKey: state.reducer.iteration.wantKey,
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ShowDevDocuments));