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
import {closeDevelopPlan, closePublishTestCase, ProvePlan,closeOnlineTestCases,ProveOnLineTestCases} from "../../actions/IterationAction";
import {CLOSE_DEVELOP_PLAN, CLOSE_TEST_CASE_EDIT, GET_DEVELOP_PLAN, GET_PUBLISH_TEST_CASE} from "../../actions/types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PublishTestCase from "./PublishTestCase";
import OnlineTestCasesMenuList from "./OnlineTestCasesMenuList";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditTestCase from "./EditTestCase";

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

class ShowPublishDocument extends React.Component {
    state = {
        open: false,
        planContent: {},
        tabValue: 0,
        demandId:""
    };

    handleChange = (event, value) => {
        this.setState({tabValue: value});
    };
    //
    // handleClose = () => {
    //     closeDevelopPlan()
    // };

    handleClose = () => {
        closePublishTestCase()
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    // savePlan = () => {
    //     store.dispatch(saveBuildPlan(this.state.planContent));
    //     store.dispatch(closeBuildPlan());
    // };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === GET_PUBLISH_TEST_CASE) {

            let testCase = this.mapObjectToArray(nextProps.publishTestCase);

            this.setState({
                testCase : testCase,
                raw : nextProps.publishTestCase,
                demandId: nextProps.wantKey});

        }else if (nextProps.action ===CLOSE_TEST_CASE_EDIT){
            let tempData=nextProps.publishTestCase.map((item,index)=>{
               if (item.id===nextProps.afterEditTestCase.id){
                   return nextProps.afterEditTestCase;
               }
               return item;
            });
            let testCase = this.mapObjectToArray(tempData);
            this.setState({
                testCase : testCase,
                raw : tempData,
                demandId: nextProps.wantKey});
        }
    }

    mapObjectToArray = (result) => {

        let ret = [];

        let demandList = result;

        let parsedDemandList = [];

        for(let idx in demandList){

            let unit = demandList[idx];

            let demand = [];

            for(let i in unit){

                demand.push(unit[i]);
            }

            parsedDemandList.push(demand);
        }

        return parsedDemandList;

    };


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

    handleCloseOnlineTestCases = () => {
        closeOnlineTestCases()
    };

    handleProveOnlineTestCases=(id)=>{
        ProveOnLineTestCases(id);
    };

    render() {
        const {classes, openPublishTestCase} = this.props;
        const {tabValue} = this.state;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={!!openPublishTestCase ? openPublishTestCase : false}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <OnlineTestCasesMenuList
                            icon={<MoreVertIcon/>}
                            useId={this.state.demandId}
                            handleProveOnlineTestCases={this.handleProveOnlineTestCases}
                            handleCloseOnlineTestCases={this.handleCloseOnlineTestCases}/>
                        <Tabs value={tabValue} onChange={this.handleChange}>
                            <Tab label="上线测试案例"/>
                        </Tabs>
                    </AppBar>

                    {tabValue === 0 &&
                    <PublishTestCase content={this.state.testCase}/>
                    }
                    <EditTestCase/>

                </Dialog>
            </div>
        );
    }
}

ShowPublishDocument.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        publishTestCase: state.reducer.iteration.publishTestCase,
        action: state.reducer.iteration.action,
        openPublishTestCase: state.reducer.iteration.openPublishTestCase,
        demandId: state.reducer.iteration.demandId,
        wantKey: state.reducer.iteration.wantKey,
        afterEditTestCase: state.reducer.iteration.afterEditTestCase,
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(ShowPublishDocument));