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
            projectContent:{}
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
        saveProject(this.state.projectContent)
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
        const {classes, onClose, selectedValue,keyNote,buttonStyle, initialData} = this.props;
        const {projectContent}=this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">编辑项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                nameIn="projectName"
                                onChange={this.getContent}
                                InputLabelName="项目名称"
                                defaultValue={projectContent.projectName}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField InputLabelName="项目编号" nameIn="projectCode" defaultValue={projectContent.projectCode} disabled={true}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="类型" nameIn="projectType" defaultValue={projectContent.projectType} nameArray={initialData.projectType} />
                        </Grid>
                        {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                            {/*<MultipleSelect onChange={this.getContent} InputLabelName="成员" nameIn="ProjectMembers" defaultValue={projectContent}*/}
                                         {/*nameArray={initialData.ProjectMembers} />*/}
                        {/*</Grid>*/}
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="负责人" nameIn="projectOwnerId" defaultValue={projectContent.projectOwnerId}
                                         nameArray={this.props.projectMembers} />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent} defaultValue={projectContent.startTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent} defaultValue={projectContent.endTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="createTime" InputLabelName="创建时间" onDateChange={this.getContent} disabled={true} defaultValue={projectContent.createTime}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="status" defaultValue={projectContent.status}  nameArray={initialData.projectStatus}/>
                        </Grid>
                        {/*<Grid item xs={12} className={classes.gridStyle}>*/}
                            {/*<DesciptionInput onChange={this.getContent} nameIn="ProjectDescription" defaultValue={projectContent.ProjectDescription}/>*/}
                        {/*</Grid>*/}



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
