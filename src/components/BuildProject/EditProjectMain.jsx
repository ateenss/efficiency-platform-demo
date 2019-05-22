import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {editSaveDispatch, closeEditProject, saveProject} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import DatePicker from "../SelfComponent/DatePicker"
import DesciptionInput from "../SelfComponent/DescriptionInput"
import {connect} from "react-redux";
import SingleSelect from "../SelfComponent/SingleSelect"
import InputField from "../SelfComponent/InputField"
import {OPEN_EDIT_PROJECT} from "../../actions/types";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle:{
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    time:{
        top:30
    },
    gridStyle:{
        marginTop:"15px"
    },

};

const projectType = [{name: "业务需求项目", id: 1}, {name: "系统架构优化", id: 2}];
const projectStatus = [{name: "进行中", id: 1}, {name: "已完成", id: 2}];

class EditProjectMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent:{},
            errorList:{}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // this.setState({projectContent : !!nextProps.project ? nextProps.project : {}} );
        if(nextProps.action === OPEN_EDIT_PROJECT){
            this.setState({projectContent : nextProps.project} );
        }
    }


    handleClose = () => {
        store.dispatch(closeEditProject());
    };
    handleEditSave=()=>{

        let ret = validating(this.state.projectContent, "projectProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }

        saveProject(this.state.projectContent)
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value
            });
            this.setState({
                projectContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value
            });
            this.setState({
                projectContent:data
            })
        }
    };

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };



    render() {
        const {classes, buttonStyle} = this.props;
        const {projectContent}=this.state;
        let projectUnit = {};
        if(!!this.props.project){
            projectUnit = this.props.project;
        }

        let muiSelectMembers = [];
        let projectMembers4muiSelect = [];

        let owner4muiSelect=[];
        for(let j in this.props.projectMembers) {
            let member = this.props.projectMembers[j];

            let ret = {
                id : member.id,
                label: member.name + "(" + member.username + ")",
                group: member.deptName
            }

            projectMembers4muiSelect.push(ret);
            for(let idx in projectContent.projectMembers){
                let unit = projectContent.projectMembers[idx];
                if(unit  === member.id){

                    muiSelectMembers.push(ret)
                }

            }

            if(projectContent.projectOwnerId === member.id){
                owner4muiSelect.push(ret);
            }

        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth maxWidth="lg">
                <DialogTitle id="simple-dialog-title">编辑项目 - {projectUnit.projectCode}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="projectName"
                                onChange={this.getContent}
                                InputLabelName="项目名称"
                                defaultValue={projectContent.projectName}
                                validateEl={Rules.projectProps.projectName}

                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="类型" nameIn="projectType" defaultValue={projectContent.projectType} nameArray={projectType}
                                          validateEl={Rules.projectProps.projectType}

                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="status" defaultValue={projectContent.status}  nameArray={projectStatus}
                                          validateEl={Rules.projectProps.status}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent} defaultValue={projectContent.startTime}
                                        validateEl={Rules.projectProps.startTime}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent} defaultValue={projectContent.endTime}
                                        validateEl={Rules.projectProps.endTime}

                            />
                        </Grid>

                        <Grid item xs={6} className={classes.gridStyle}>

                            <TrueMuitiSelect data={projectMembers4muiSelect} onChange={this.getContent}
                                             nameIn="projectOwnerId"
                                             label="负责人"
                                             defaultValue={owner4muiSelect}
                                             singleSelect
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMembers4muiSelect} onChange={this.getContent}
                                             nameIn="projectMembers"
                                             label="项目参与人"
                                             defaultValue={muiSelectMembers}
                            />
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleEditSave} color="primary">
                        保存修改
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

EditProjectMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        initialData:state.reducer.buildProject.initialData,
        project : state.reducer.buildProject.project,
        action : state.reducer.buildProject.action
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditProjectMain));
