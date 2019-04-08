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
    pullBuildProjectInitial,
    openBuildProject,
    init,
    openEditProject,
    addProject
} from "../../actions/BuildProjectAction"
import {BUILD_SAVE_PROJECT} from "../../actions/types";
import {getProjectMembers} from "../../actions/CommonAction";
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

class Project extends React.Component {
    constructor(props) {
        super(props);
        pullBuildProjectInitial();



        getProjectMembers();
        this.state = {
            expanded: false,
            value: 0,
            perm: permProcessor.init('project')
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
        addProject();

    };

    componentDidMount() {

        let self = this;
        init(function (ret) {

            self.setState({projectList: ret})

        });

    }

    handleEdit = (id) => {

        console.log(id);
        openEditProject(id)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === BUILD_SAVE_PROJECT) {
            let projectList = this.state.projectList;
            projectList.push(nextProps.newProject);
            this.setState({projectList: projectList})
        }
    }


    render() {
        const {classes, buildProjectShow, editProjectShow} = this.props;
        let showProjects = [];
        let currentProject = [];
        if (!!this.state.projectList) {
            showProjects = this.state.projectList.map((content, key) => {
                return (
                    <Grid key={key} xs={3} item><ProjectPanel editable={content.editableProject}
                                                              name={content.projectName} desc={key}
                                                              handleEdit={this.handleEdit.bind(this, content.id)}/></Grid>
                )
            });

            currentProject = this.state.projectList.map((content, key) => {
                if (content.currentProject) {
                    return (
                        <Grid key={key} xs={3} item><ProjectPanel editable={content.editableProject}
                                                                  name={content.projectName} desc={key}
                                                                  handleEdit={this.handleEdit.bind(this, content.id)}/></Grid>
                    )
                }

            });
        }
        return (

            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true}>
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
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>我参与的项目</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid spacing={40} container>
                            {showProjects}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <EditProject projectMembers={this.props.projectMembers}
                             open={editProjectShow}
                />

                <BuildProject projectMembers={this.props.projectMembers}
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
        action: state.reducer.buildProject.action,
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Project));
