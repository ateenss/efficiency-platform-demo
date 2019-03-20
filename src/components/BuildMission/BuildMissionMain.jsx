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
import {openBuildMission,buildSaveMissionDispatch,closeBuildMission} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import CheckBox from "../SelfComponent/CheckBoxDouble"
import SingleSelect from "../SelfComponent/SingleSelect"
import RadioButton from "../SelfComponent/RadioButton"


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

class BuildMissionMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            missionContent:{
            },

        }
    }

    handleClose = () => {
        store.dispatch(closeBuildMission());
    };
    handleSave=()=>{
        store.dispatch(closeBuildMission());
        const temp=this.state.missionContent;
        let tempNum=parseInt((Math.random()*(500000)+10),10);
        temp["missionID"]=tempNum;
        temp["MissionStatus"]="进行中";
        store.dispatch(buildSaveMissionDispatch(temp));
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
        const {classes, onClose, selectedValue,initialData,buttonStyle,buildMissionShow,randomNum,hintMessage, ...other} = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8}>
                            <InputField
                                nameIn="MissionName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                InputLabelName="任务ID"
                                nameIn="MissionID"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="所属项目"
                                nameIn="BelongProject"
                                nameArray={initialData.BelongProject}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务类型"
                                nameIn="MissionType"
                                nameArray={initialData.MissionType}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务级别"
                                nameIn="MissionLevel"
                                nameArray={initialData.MissionLevel}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="任务负责人"
                                nameIn="MissionHead"
                                nameArray={initialData.MissionHead}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务优先级"
                                nameIn="MissionPriority"
                                nameArray={initialData.MissionPriority}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="AssociatedVersion"
                                nameArray={initialData.AssociatedVersion}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="涉及模块"
                                nameIn="InvolveModule"
                                nameArray={initialData.InvolveModule}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="关联需求"
                                nameIn="AssociatedDemand"
                                nameArray={initialData.AssociatedDemand}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="关联任务"
                                nameIn="AssociatedMission"
                                nameArray={initialData.AssociatedMission}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                onChange={this.getContent}
                                InputLabelName="模块提交负责人"
                                nameIn="ModulePushHead"
                                nameArray={initialData.ModulePushHead}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                nameIn="MissionDeadLine"
                                InputLabelName="截止时间"
                                onDateChange={this.getContent}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="EstimateWorkHours"
                                onChange={this.getContent}
                                InputLabelName="预估投入工时"
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="BranchTag"
                                onChange={this.getContent}
                                InputLabelName="模块branchtag号"
                            />
                        </Grid>

                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput  onChange={this.getContent} InputLabelName="任务描述" nameIn="MissionDescription"/>
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

BuildMissionMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData:state.reducer.buildMission.initialData,
        buildMissionShow:state.reducer.buildMission.buildMissionShow,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildMissionMain));
