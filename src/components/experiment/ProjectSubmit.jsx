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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactQuill from "react-quill";
import OrganizeSelect from "./OrganizeSelect.jsx";
import {doSave} from "../../actions/experimentAction"
import store from '../../stores/index';
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class ProjectPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            name: "",
            description: "",
            organize: ""
        }
    }
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleSave=()=>{
        this.props.onClose(this.props.selectedValue);
        store.dispatch(doSave(this.state.name));
    };




    handleListItemClick = value => {
        this.props.onClose(value);
    };

    onBLUR=e=>{
        console.log(e.target.value);
        this.setState({
            name:e.target.value
        })
    };

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="项目名称"
                        type="email"
                        onChange={this.onBLUR}
                    />
                    <Typography className={classes.quillLabel}
                                color="primary"
                                variant="h3">
                        描述
                    </Typography>
                    <ReactQuill value={this.state.taskContent||''} theme="snow"
                                className={classes.quillContainer}
                                onChange={this.handleChange}/>

                    <OrganizeSelect/>
                    <DialogContentText>
                        To subscribe to this website.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
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