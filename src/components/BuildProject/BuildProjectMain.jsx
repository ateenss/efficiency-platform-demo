import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import DatePicker from "../SelfComponent/DatePicker"
import {hintDelete, buildSaveProjectDispatch, closeBuildProject, saveProject} from "../../actions/BuildProjectAction"
import {connect} from "react-redux";
import SingleSelect from "../SelfComponent/SingleSelect"
import InputField from "../SelfComponent/InputField"
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle: {
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    gridStyle: {
        marginTop: "15px"
    },

};

const projectType = [{name: "业务需求项目", id: 1}, {name: "系统架构优化", id: 2}];
const projectStatus = [{name: "进行中", id: 1}, {name: "已完成", id: 2}];

class BuildProjectMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent: {},
            errorList: {}
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }
    //todo:由于dialog的开关是通过props传进来的，如果在这里组织渲染的话，就不能改变dialog的弹出状态
    //todo:目前发现，将初始化函数放入到本实例中，导致通过connect方式无法正常获取初始化数据


    handleClose = () => {
        store.dispatch(closeBuildProject());
    };
    handleSave = () => {


        let ret = validating(this.state.projectContent, "projectProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }


        saveProject(this.state.projectContent)
    };


    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value
            });
            this.setState({
                projectContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value
            });
            this.setState({
                projectContent: data
            })
        }
    };




    render() {
        const {classes, onClose, selectedValue, initialData, buttonStyle, hintMessage, randomNum} = this.props;
        let projectMember4MultiSelect = [];
        for (let i in this.props.projectMembers) {

            let unit = this.props.projectMembers[i];

            let ret = {
                id: unit.id,
                label: unit.name + "(" + unit.username + ")",
                group:unit.deptName

            };

            projectMember4MultiSelect.push(ret);
        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} maxWidth="xl" fullWidth>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="projectName"
                                onChange={this.getContent}
                                InputLabelName="项目名称"
                                validateEl={Rules.projectProps.projectName}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="类型" nameIn="projectType"
                                          nameArray={projectType}
                                          validateEl={Rules.projectProps.projectType}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>

                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="status"
                                          nameArray={projectStatus}
                                          validateEl={Rules.projectProps.status}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent}
                                        validateEl={Rules.projectProps.startTime}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent}
                                        validateEl={Rules.projectProps.endTime}

                            />
                        </Grid>

                        <Grid item xs={6} className={classes.gridStyle}>

                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="projectOwnerId"
                                             label="负责人"
                                             singleSelect
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="projectMembers"
                                             label="项目参与人"

                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

BuildProjectMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.initialData.head);
    return {
        initialData: state.reducer.buildProject.initialData,
        action: state.reducer.buildProject.action
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildProjectMain));