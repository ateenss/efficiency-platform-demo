import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import ReactQuill from "react-quill";
import {saveTask} from "../../actions/DemandTasksAction";
import TigerInput from "../Input/TigerInput"
import store from "../../stores";
import {SAVE_TASK, SHOW_NOTIFICATION} from "../../actions/types";


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    dialogContainer: {
        margin: "24px"
    },
    taskInput: {
        fontSize: 20,
        marginTop: 10
    },
    taskLabel: {
        fontSize: 22
    },
    quillContainer: {
        marginTop: "10px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    }

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class TaskEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {}
        }
    }

   /* componentWillReceiveProps(nextProps, nextStatus) {
        if(nextProps.action === "saveTask"){
            this.setState({
                openTask: nextProps.openTask
            });
            setTimeout(function(){

                store.dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: "保存成功"
                });

            }, 500);

            return false;
        }
        if (!!nextProps.task) {
            this.setState({
                openTask: nextProps.openTask,
                data: {taskName: nextProps.task.taskName, taskContent: nextProps.task.taskContent}
            });
        }

    }*/

    handleClose = () => {
        this.setState({openTask: false})
    };

    handleInput = (e) =>{
        const key = e.target.name;
        this.state.data[key] = e.target.value;
        this.setState(this.state.data);
    };

    onSubmit = () => {
        saveTask(this.state.data);
    };

    render() {
        const {classes} = this.props;

        return (

            <div>
                <Dialog  fullScreen open={this.state.openTask} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                编辑任务
                            </Typography>
                            <Button color="inherit" onClick={this.onSubmit}>
                                保存
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <Grid container spacing={16}>
                            <Grid xs={9} item>
                                <TigerInput
                                    id="outlined-name"
                                    label="任务名称"
                                    value={this.state.data.taskName}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.taskInput,
                                        },
                                        name:"taskName"
                                    }
                                    }
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.taskLabel,
                                        }
                                    }}
                                    onChange={this.handleInput}
                                />
                            </Grid>
                            <Grid xs={3} item>
                                <TigerInput
                                    id="outlined-name"
                                    label="负责人"
                                    value={this.state.data.taskName}
                                    margin="normal"
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.taskInput,
                                        },
                                        name:"taskOwner"
                                    }
                                    }
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.taskLabel,
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Typography className={classes.quillLabel}>开发方案</Typography>
                        <ReactQuill value={this.state.data.taskContent} theme="snow"
                                    className={classes.quillContainer}
                                    onChange={this.handleChange}/>

                    </DialogContent>
                </Dialog>
            </div>
        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        action : state.reducer.task.action,
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask
    }
};

export default connect(mapStateToProps)(withStyles(styles)(TaskEditor));
