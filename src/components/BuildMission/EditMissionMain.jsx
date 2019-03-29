import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "../SelfComponent/MultiSelect";
import DatePicker from "../SelfComponent/DatePicker"
import DesciptionInput from "../SelfComponent/DescriptionInput"
import {closeEditMission,editSaveMissionDispatch} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import CheckBox from "../SelfComponent/CheckBoxDouble"
import SingleSelect from "../SelfComponent/SingleSelect"


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

};

class EditMissionMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            missionContent:{
            },

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //todo:这里面应该放入addTask，是数值放置错误，必须找到指定addTask
        nextProps.addTask.map((content,key)=>{
            if (key===this.props.tempBoardToDetail.keyNote) {
                this.setState({
                    missionContent:content
                })
            }
        });
      /*  this.setState({
                missionContent:nextProps.tempBoardToDetail
            })*/
    }

    handleClose = () => {
        store.dispatch(closeEditMission());
    };
    handleSave=()=>{
        const temp=this.state.missionContent;
        temp["keyNote"]=this.props.tempBoardToDetail.keyNote;
        store.dispatch(editSaveMissionDispatch(temp));
        store.dispatch(closeEditMission());
    };




    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.missionContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                missionContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.missionContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                missionContent:data
            })
        }
    };


    render() {
        const {classes, onClose, selectedValue,initialData,buttonStyle,editMissionShow,randomNum,hintMessage, ...other} = this.props;
        const {missionContent}=this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">编辑需求任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                                defaultValue={missionContent.taskName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                InputLabelName="任务ID"
                                nameIn="MissionID"
                                disabled={true}
                                defaultValue={missionContent.MissionID}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务状态"
                                nameIn="taskStatus"
                                nameArray={initialData.taskStatus}
                                defaultValue={missionContent.taskStatus}/>

                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务类型"
                                nameIn="taskType"
                                nameArray={initialData.taskType}
                                defaultValue={missionContent.taskType}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务级别"
                                nameIn="missionLevel"
                                nameArray={initialData.missionLevel}
                                defaultValue={missionContent.missionLevel}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="任务负责人"
                                nameIn="missionHead"
                                nameArray={initialData.missionHead}
                                defaultValue={missionContent.missionHead}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务优先级"
                                nameIn="missionPriority"
                                nameArray={initialData.missionPriority}
                                defaultValue={missionContent.missionPriority}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="associatedVersion"
                                nameArray={initialData.associatedVersion}
                                defaultValue={missionContent.associatedVersion}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                nameIn="taskDeadLine"
                                InputLabelName="截止时间"
                                onDateChange={this.getContent}
                                defaultValue={missionContent.taskDeadLine}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="estimateWorkHours"
                                onChange={this.getContent}
                                InputLabelName="预估投入工时"
                                defaultValue={missionContent.estimateWorkHours}
                            />
                        </Grid>

                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput
                                onChange={this.getContent}
                                InputLabelName="任务描述"
                                nameIn="MissionDescription"
                                defaultValue={missionContent.MissionDescription}
                            />
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                        {/*<Typography color="error">{hintMessage}</Typography>*/}
                        {/*</Grid>*/}

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

EditMissionMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData:state.reducer.buildMission.initialData,
        editMissionShow:state.reducer.buildMission.editMissionShow,
        addTask:state.reducer.buildMission.addTask,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditMissionMain));
