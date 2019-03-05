/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {getDemandTasks} from '../../actions/DemandTasksAction';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid'

import ProjectPanel from "../project/ProjectPanel"
import BuildProject from "../BuildProject/BuildProjectMain"

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import MuiTable from '../BuildProject/MuiTable'
import ShowCard from "../BuildProject/showCard"
import Task from "../TaskBoard/Task"

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightMedium,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    margin: {
        padding: "3px"
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    createProject: {
        width: "100%",
        height: "100%",
        borderRadius: "0",
        boxShadow: "none",
        background: "rgba(199, 199, 199, 0.65)",
        color: "#FFFFFF"
    },
    addIcon: {
        fontSize: "42px"
    }
});

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            popUpOpen: false,
            value: 0
        };
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    }
    handleClickClose = () => {
        this.setState({popUpOpen: false});
    };

    handleClickOpen = (e) => {
        e.stopPropagation()
        e.preventDefault();
        // console.log("我是调用工程弹出按钮");
        this.setState({
            popUpOpen: true,
        });
        return false;

    };

    componentDidMount() {

        getDemandTasks();

    }

    render() {
        const {classes, demands,addProjects} = this.props;
        let showProjects = addProjects.map((content, key) => {
            return (
                <Grid xs={3} item><ProjectPanel name={content.name} desc={key} keyNote={key}/></Grid>
            )
        });

        return (

            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>我当前的项目</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={40} container>
                            <Grid xs={3} item><ProjectPanel name="全渠道" desc="2019年项目"/></Grid>
                            <Grid xs={3} item>
                                <Tooltip title="创建新项目" aria-label="创建新项目" placement="right-start">

                                <Button variant="fab" color="link" className={classes.createProject}
                                        onClick={this.handleClickOpen}>
                                    <AddIcon className={classes.addIcon}/>
                                </Button>
                                </Tooltip>
                            </Grid>
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
                            {showProjects}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <BuildProject
                    open={this.state.popUpOpen}
                    onClose={this.handleClickClose}
                />
               {/* <NativeTable/>*/}
            </div>
        );


    }
}


// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        demands: state.reducer.task.demands,
        addProjects:state.reducer.buildProject.addProjects
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Project));
