/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid'

import ProjectPanel from "../project/ProjectPanel"
import BuildProject from "../BuildProject/BuildProjectMain"
import EditProject from "../BuildProject/EditProjectMain"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {
    init,
    openEditProject,
    addProject, openProject
} from "../../actions/BuildProjectAction"
import {BUILD_SAVE_PROJECT} from "../../actions/types";
import {getProjectMembers, startLoading, stopLoading} from "../../actions/CommonAction";
import permProcessor from "../../constants/PermProcessor";

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

const projectType = [{name: "业务需求项目", id: 1}, {name: "系统架构优化", id: 2}];
const projectStatus = [{name: "进行中", id: 1}, {name: "已完成", id: 2}];
class Project extends React.Component {
    constructor(props) {
        super(props);



        this.state = {
            expanded: false,
            value: 0,
            perm: permProcessor.init('project')
        };
    }


    componentWillMount() {

        startLoading();
    }

    handleClickClose = () => {
        this.setState({popUpOpen: false});
    };

    handleClickOpen = (e) => {
        e.stopPropagation()
        e.preventDefault();
        addProject();

    };

    componentDidMount() {

        let self = this;
        init(function (projects, members) {

            self.setState({projectList: projects, projectMembers : members});

            stopLoading();

        });

    }

    handleEdit = (id) => {

        console.log(id);
        openEditProject(id)

    };

    handleOpen = (id) =>{

        openProject(id);


    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === BUILD_SAVE_PROJECT) {
            let projectList = JSON.parse(JSON.stringify(this.state.projectList));
            projectList.push(nextProps.newProject);
            this.setState({projectList: projectList})
        }
    }


    render() {
        const {classes, buildProjectShow, editProjectShow} = this.props;
        let showProjects = [];
        let currentProject = [];
        if (!!this.state.projectList) {


            currentProject = this.state.projectList.map((content, key) => {
                if (content.currentProject) {
                    return (
                        <Grid key={key} xs={3} item><ProjectPanel editable={content.editableProject}
                                                                  name={content.projectName} desc={key}
                                                                  handleEdit={this.handleEdit.bind(this, content.id)} handleOpen={this.handleOpen.bind(this, content.id)}/></Grid>
                    )
                }

            });

            showProjects = this.state.projectList.map((content, key) => {
                if(!content.currentProject){

                return (
                    <Grid key={key} xs={3} item><ProjectPanel editable={content.editableProject}
                                                              name={content.projectName} desc={key}
                                                              handleEdit={this.handleEdit.bind(this, content.id)} handleOpen={this.handleOpen.bind(this, content.id)}/></Grid>
                )
                }
            });

        }
        return (

            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true} style={{boxShadow:"none"}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>我当前的项目</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={40} container>
                            {currentProject}
                            {permProcessor.bingo('save', this.state.perm) ?
                                <Grid xs={3} item>
                                    <Tooltip title="创建新项目" aria-label="创建新项目" placement="right-start">

                                        <Button variant="fab" className={classes.createProject}
                                                onClick={this.handleClickOpen}>
                                            <AddIcon className={classes.addIcon}/>
                                        </Button>
                                    </Tooltip>
                                </Grid> : ""
                            }
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={true}  style={{boxShadow:"none"}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>我参与的项目</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={40} container>
                            {showProjects}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <EditProject projectMembers={this.state.projectMembers} teams={this.state.teams}
                             open={editProjectShow}
                />

                <BuildProject projectMembers={this.state.projectMembers} teams={this.state.teams}
                              open={buildProjectShow}
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
        newProject: state.reducer.buildProject.newProject,
        buildProjectShow: state.reducer.buildProject.buildProjectShow,
        editProjectShow: state.reducer.buildProject.editProjectShow,
        action: state.reducer.buildProject.action
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Project));
