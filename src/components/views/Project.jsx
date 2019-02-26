/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Demand from '../demand/Demand';
import {getDemandTasks} from '../../actions/DemandTasksAction';
import {connect} from "react-redux";

import TaskEditor from "../Task/TaskEditor";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'
import showCard from '../../components/experiment/showCard';
import PanelShow from '../experiment/PanelShow';
import ProjectPanel from "../project/ProjectPanel"
import ProjectSubmitt from "../experiment/ProjectSubmit";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import store from "../../stores";
import CardBody from '../Card/CardBody';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            popUpOpen:false,
            value: 0
        };
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };
    handleClickClose=()=>{
        this.setState({popUpOpen:false});
    };
    handleClickOpen = () => {
        this.setState({
            popUpOpen: true,
        });
        console.log("我是调用工程弹出按钮");
    };

    componentDidMount() {

        getDemandTasks();

    }

    render() {
        const {classes, demands} = this.props;

        return (

            <Grid spacing={16} container>
                <div className={classes.root}>
                    <AppBar position="static" color="default" style={{marginBottom:"10px"}}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            <Tab value={0} label="我的项目"/>
                            <Tab value={1} label="其他项目"/>
                        </Tabs>
                    </AppBar>
                    {this.state.value === 0 &&
                    <Grid spacing={16} container>
                        <Grid xs={3} item><ProjectPanel name="全渠道" desc="2019年项目"/></Grid>
                        <Grid xs={3} item><ProjectPanel name="二维码" desc="2019年项目"/></Grid>

                        <Grid xs={3} item><ProjectPanel name="创建新项目" desc="2019年项目" onClick={this.handleClickOpen}/></Grid>
                    </Grid>
                    }
                    {this.state.value === 1 && <div>2</div>}
                </div>
                <ProjectSubmitt
                    open={this.state.popUpOpen}
                    onClose={this.handleClickClose}
                />
                <PanelShow/>
            </Grid>
        );


    }
}


// 从store里面取数据给组件
const mapStateToProps = (state) => {
    console.log(333333);
    return {
        demands: state.reducer.task.demands
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Project));
