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
import {editReSave} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "./MultiSelect";
import DataPicker from "./DataPicker"
import DesciptionInput from "./DescriptionInput"
import RadioButton from "./RadioButton"
import {connect} from "react-redux";

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle:{
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    }

};

class ProjectPopupReEdit extends React.Component {
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
        store.dispatch(editReSave({keyNote:this.props.keyNote,ReContent:this.state.projectContent}));
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


    getState=e=>{
        this.setState({
            projectState:e.target.value
        })
    };

    render() {
        const {classes, onClose, selectedValue,keyNote,buttonStyle, addProjects,...other} = this.props;
        const {projectContent}=this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="项目名称"
                                type="email"
                                name="name"
                                onChange={this.getContent}
                                defaultValue={projectContent.name}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <DesciptionInput onChange={this.getContent} nameIn="description" defaultValue={projectContent.description}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.quillLabel}>
                                类型
                            </Typography>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="type" defaultValue={projectContent.type}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.quillLabel}>
                                成员
                            </Typography>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="members" defaultValue={projectContent.members}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.quillLabel}>
                                负责人
                            </Typography>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="head" defaultValue={projectContent.head}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.quillLabel}>
                                选择时间
                            </Typography>
                            <DataPicker onStartChange={this.getContent} onEndChange={this.getContent} startValue={projectContent.startTime} endValue={projectContent.endTime}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.quillLabel}>
                                状态
                            </Typography>
                            <RadioButton onChange={this.getContent} defaultValue={projectContent.projectState}/>
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

ProjectPopupReEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        addProjects:state.reducer.buildProject.addProjects
    }
};

export default connect(mapStateToProps)(withStyles(styles)(ProjectPopupReEdit));
