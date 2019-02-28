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

import ProjectPanel from "../project/ProjectPanel"
import BuildProject from "../BuildProject/BuildProjectMain"

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
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
    }
    handleClickClose=()=>{
        this.setState({popUpOpen:false});
    };

    handleClickOpen = () => {
        console.log("我是调用工程弹出按钮");
        this.setState({
            popUpOpen: true,
        });

    };
    componentDidMount() {

        getDemandTasks();

    }

    render() {
        const {classes, demands} = this.props;

        return (

            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>我当前的项目</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={40} container>
                            <Grid xs={3} item><ProjectPanel name="全渠道" desc="2019年项目"/></Grid>
                            <Grid xs={3} item><ProjectPanel name="创建新项目" desc="2019年项目"/></Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>我参与的项目</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={16} container>
                            <Grid xs={3} item><ProjectPanel name="二维码" desc="2019年项目"/></Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <BuildProject
                    open={this.state.popUpOpen}
                    onClose={this.handleClickClose}
                />
            </div>
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
