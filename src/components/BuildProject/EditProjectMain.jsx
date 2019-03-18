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
import {editSaveDispatch,closeEditProject} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "../SelfComponent/MultiSelect";
import DatePicker from "../SelfComponent/DatePicker"
import DesciptionInput from "../SelfComponent/DescriptionInput"
import {connect} from "react-redux";
import SingleSelect from "../SelfComponent/SingleSelect"
import InputField from "../SelfComponent/InputField"

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

class EditProjectMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent:{
                }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.keyNote>-1){
            this.setState({
                projectContent:nextProps.addProjects[nextProps.keyNote]
            })
        }
    }


    handleClose = () => {
        store.dispatch(closeEditProject());
    };
    handleEditSave=()=>{
        store.dispatch(editSaveDispatch({keyNote:this.props.keyNote,ReContent:this.state.projectContent}));
        store.dispatch(closeEditProject());
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                projectContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                projectContent:data
            })
        }
    };



    render() {
        const {classes, onClose, selectedValue,keyNote,buttonStyle, initialData,addProjects,...other} = this.props;
        const {projectContent}=this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="ProjectName"
                                onChange={this.getContent}
                                InputLabelName="项目名称"
                                defaultValue={projectContent.ProjectName}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField InputLabelName="项目编号" nameIn="ProjectID" defaultValue={projectContent.ProjectID} disabled={true}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="ProjectType" defaultValue={projectContent.ProjectType}
                                         nameArray={initialData.ProjectType} />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="ProjectMembers" defaultValue={projectContent.ProjectMembers}
                                         nameArray={initialData.ProjectMembers} />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="ProjectHead" defaultValue={projectContent.ProjectHead}
                                         nameArray={initialData.ProjectHead} />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="ProjectStartTime" InputLabelName="开始时间" onDateChange={this.getContent} defaultValue={projectContent.ProjectStartTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="ProjectEndTime" InputLabelName="结束时间" onDateChange={this.getContent} defaultValue={projectContent.ProjectEndTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="ProjectBuildTime" InputLabelName="创建时间" onDateChange={this.getContent} defaultValue={projectContent.ProjectBuildTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="ProjectStatus" defaultValue={projectContent.ProjectStatus} disabled={false} nameArray={initialData.ProjectStatus}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput onChange={this.getContent} nameIn="ProjectDescription" defaultValue={projectContent.ProjectDescription}/>
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
        addProjects:state.reducer.buildProject.addProjects,
        initialData:state.reducer.buildProject.initialData
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditProjectMain));
