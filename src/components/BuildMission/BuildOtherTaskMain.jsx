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
import {closeNewOtherTask,saveOtherTask} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import permProcessor from "../../constants/PermProcessor";
import Typography from '@material-ui/core/Typography';
import EditQuill from "../SelfComponent/EditQuill"
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {init} from "../../actions/BuildProjectAction";


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
    gridStyle:{
        marginTop:"15px"
    },
    item:{
        paddingTop:"60px"
    },
    quillIn:{
        height:"300px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },
    quillContainer: {
        marginTop: "10px",
        height:"500px"
    },


};

class BuildOtherTaskMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            otherContent:{

            },
            errorList: {},
            perm: permProcessor.init('task'),
            projectList:{},
            projectMembers:{}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.initialProjectList!=null) {
            this.setState({
                projectList:nextProps.initialProjectList
            })
        }
    }




    handleClose = () => {
        store.dispatch(closeNewOtherTask());
    };
    handleSave=()=>{
        let tempData=this.state.otherContent;
        tempData.taskOwnerId=localStorage.getItem("currentUser");
        saveOtherTask(tempData)
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.otherContent, {
                [keyNote]: value
            });
            this.setState({
                otherContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.otherContent, {
                [keyNote]: value
            });
            this.setState({
                otherContent:data
            })
        }
    };

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorLitst: errorList});
    };



    render() {
        const {classes,buttonStyle} = this.props;
        let projectIdAndNameSelect = [];
        for (let i in this.state.projectList) {

            let member = this.state.projectList[i];

            let ret = {
                id: member.id,
                label: member.projectName,
            };
            projectIdAndNameSelect.push(ret);
        }

        return (
            <Dialog  aria-labelledby="simple-dialog-title" open={this.props.newOtherTaskShow} fullWidth maxWidth="lg">
                <DialogTitle id="simple-dialog-title">创建其他个人任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={6} className={classes.gridStyle}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <DatePicker
                                nameIn="taskDeadline"
                                InputLabelName="任务截至时间"
                                onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={6} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectIdAndNameSelect}
                                             onChange={this.getContent}
                                             nameIn="belongProjectId"
                                             label="所属项目"
                                             singleSelect
                            />

                        </Grid>
                    </Grid>
                    <Typography className={classes.quillLabel}>任务描述</Typography>
                    <EditQuill
                        classStyle={classes.quillContainer}
                        onChange={this.getContent}
                        nameIn="taskDescription"
                        placeholder="请输入任务描述"
                    />


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

BuildOtherTaskMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        demands:state.reducer.buildMission.demands,
        projectMembers:state.reducer.common.projectMembers,
        newOtherTaskShow:state.reducer.buildMission.newOtherTaskShow,
        initialProjectList:state.reducer.buildMission.initialProjectList,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildOtherTaskMain));
