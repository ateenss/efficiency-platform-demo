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
import {editSaveDispatch} from "../../actions/BuildProjectAction"
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
    }

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
        this.props.onClose(this.props.selectedValue);
    };
    handleReSave=()=>{
        this.props.onClose(this.props.selectedValue);
        console.log("以下是再编辑测试");
        store.dispatch(editSaveDispatch({keyNote:this.props.keyNote,ReContent:this.state.projectContent}));
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
        //todo:错误提示还没有和BuildProjectMain里面进行统一
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                id="name"
                                label="项目名称"
                                type="email"
                                name="name"
                                onChange={this.getContent}
                                defaultValue={projectContent.name}
                                fullWidth
                            />
                        </Grid>
                        {/*<Grid item xs={8}>
                            <InputField
                                nameIn="name"
                                onChange={this.getContent}
                                error={error1}
                                InputLabelName={hintLabel1}
                            />
                        </Grid>*/}
                        <Grid item xs={4}>
                            <InputField InputLabelName="项目编号" defaultValue={projectContent.number} disabled={true}/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="type" defaultValue={projectContent.type}
                                         nameArray={initialData.type} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="members" defaultValue={projectContent.members}
                                         nameArray={initialData.members} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="head" defaultValue={projectContent.head}
                                         nameArray={initialData.head} />
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent} defaultValue={projectContent.startTime}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent} defaultValue={projectContent.endTime}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="buildTime" InputLabelName="创建时间" onDateChange={this.getContent} defaultValue={projectContent.buildTime}/>
                        </Grid>
                        <Grid item xs={4}>
                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="projectState" defaultValue={projectContent.projectState} disabled={false} nameArray={initialData.projectState}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DesciptionInput onChange={this.getContent} nameIn="description" defaultValue={projectContent.description}/>
                        </Grid>



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleReSave} color="primary">
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
