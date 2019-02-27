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
import ReactQuill from "react-quill";
// import {doSave} from "../../actions/experimentAction"
import store from '../../stores/index';
import NativeSelect from "./NativeSelect"
import Grid from '@material-ui/core/Grid';
import NativeQuill from './NativeQuill'
import MultiSubmit from "./MultiSelect";
import DataPicker from "./DataPicker"
import DesciptionInput from "./DescriptionInput"

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

class ProjectPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            name: "",
            organize: [],
            taskContent:"",
            quillContent:null,
            MultiSelectContent:[]
        }
    }
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleSave=()=>{
        this.props.onClose(this.props.selectedValue);
        // store.dispatch(doSave({name:this.state.name,description: this.state.quillContent,organize:this.state.organize}));
    };

    reactQuillContent=e=>{
        console.log(e.target)
    };

    getProjectName=e=>{
        console.log(e.target.value);
        this.setState({
            name:e.target.value
        })
    };

    nativeSelectContent = (selectedOption) => {
        this.setState({
            selectedOption
        });
        console.log(`Option selected:`, selectedOption);
        // if selection change, send request to server => get response as new options.
    };

    getQuillContent=content=>{
        console.log(content);
        this.setState({
            quillContent:content
        })
    };

    getMultiSelectContent=content=>{
        console.log(content);
        this.setState({
            MultiSelectContent:content
        })
    };

    render() {
        const {classes, onClose, selectedValue,buttonStyle, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="项目名称"
                                type="email"
                                onChange={this.getProjectName}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={classes.quillLabel}>
                                react-quill描述
                            </Typography>
                            <ReactQuill value={this.state.taskContent} theme="snow"
                                        className={classes.quillContainer}
                                        onChange={this.reactQuillContent}/>
                            <Typography className={classes.quillLabel}>
                                原生quill描述
                            </Typography>
                            <NativeQuill onChange={this.getQuillContent}/>
                        </Grid>
                        {/*<OrganizeSelect onChange={this.onSelectChang}/>*/}
                        <Grid item xs={10}>
                            <Typography className={classes.quillLabel}>
                                原生select
                            </Typography>
                            <NativeSelect onChange={this.nativeSelectContent}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={classes.quillLabel}>
                                material-ui多选select
                            </Typography>
                            <MultiSubmit onChange={this.getMultiSelectContent}/>
                        </Grid>
                        <Grid item xs={10}>
                            <DataPicker/>
                        </Grid>
                        <Grid item xs={10}>
                            <DesciptionInput/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        重置
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ProjectPopup.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const ProjectPopupWrapped = withStyles(styles)(ProjectPopup);
export default ProjectPopupWrapped