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
import {closeBuildModule, init, saveBuildModule} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import permProcessor from "../../constants/PermProcessor";


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

};

class BuildDevTaskMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            moduleContent:{

            },
            errorList: {},
            perm: permProcessor.init('task')
        }
    }




    handleClose = () => {
        store.dispatch(closeBuildModule());
    };
    handleSave=()=>{
        let saveContent=this.state.moduleContent;
        saveContent["taskId"]=this.props.demands.taskId;
        if (permProcessor.bingo('saveNewDevTask', this.state.perm)) {
            saveBuildModule(saveContent,this.props.demands.taskId);
        }else{
            console.log("您没有此项权限");
        }
        store.dispatch(closeBuildModule());
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value
            });
            this.setState({
                moduleContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value
            });
            this.setState({
                moduleContent:data
            })
        }
    };

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };



    render() {
        const {classes, onClose, selectedValue,initialData,buttonStyle,randomNum,hintMessage,projectMembers, ...other} = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建开发任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                                validate={this.validate}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="开发人员"
                                validate={this.validate}
                                nameIn="taskOwner"
                                nameArray={projectMembers}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="taskDeadline" InputLabelName="任务截至时间"  onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField InputLabelName="涉及模块"  nameIn="involveModule"  validate={this.validate} onChange={this.getContent}/>
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

BuildDevTaskMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        initialData:state.reducer.buildDemand.initialData,
        hintMessage:state.reducer.buildDemand.hintMessage,
        buildDemandShow:state.reducer.buildDemand.buildDemandShow,
        demands:state.reducer.buildMission.demands,
        projectMembers:state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildDevTaskMain));
