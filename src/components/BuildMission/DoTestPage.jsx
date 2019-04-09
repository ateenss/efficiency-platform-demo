import React,{ useState } from 'react';
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
import store from "../../stores";
import {closeGoTestDetail,finishTest,init} from "../../actions/BuildMissionAction"
import {SHOW_NOTIFICATION} from "../../actions/types";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import permProcessor from "../../constants/PermProcessor";



const styles = {
    appBar: {
        position: 'relative',
        boxShadow:"none",
        color:"#292929",
        background:"#f5f5f5"
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
    },
    cardStyle:{
        margin:"100px",
        marginLeft:"400px"
    }

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const AlertDialogSlide=props=>{
    return (
        <div>
            <Dialog
                open={props.openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"确定已经走查完成吗?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        注意此过程不可回退
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        未完成
                    </Button>
                    <Button onClick={props.handleChangeAndClose} color="primary">
                        已完成
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};


class MissionDetailMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            openAlert:false,
            perm: permProcessor.init('task')
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
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

    }

    handleChangeAndClose=()=>{
        if (permProcessor.bingo('finishTest', this.state.perm)) {
            finishTest(this.props.tempBoardToDetail.taskId);
        }else{
            console.log("您没有此权限");
        }


        this.setState({
            openAlert:false
        })
    };

   openAlert=()=>{
        this.setState({
            openAlert:true
        })
   };

    closeAlert=()=>{
        this.setState({
            openAlert:false
        })
    };


    handleClose = () => {
        init();
        store.dispatch(closeGoTestDetail());
    };

    handleInput = (e) =>{
        const key = e.target.name;
        this.state.data[key] = e.target.value;
        this.setState(this.state.data);
    };

    onSubmit = () => {
        store.dispatch(closeGoTestDetail());
    };

    render() {
        const {classes,demands,detailGoTestShow,tempBoardToDetail} = this.props;


        return (

            <div>
                <Dialog  fullScreen open={detailGoTestShow} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                走查任务详情
                            </Typography>
                            <Button color="inherit" onClick={this.onSubmit}>
                                保存
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        {/*<MyPage tempBoardToDetail={tempBoardToDetail}/>*/}
                        <Grid item xs={6} className={classes.cardStyle}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    任务名称：{!!tempBoardToDetail?tempBoardToDetail.taskName:""}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    任务类型：{!!tempBoardToDetail?tempBoardToDetail.taskType:""}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    任务截止时间：{!!tempBoardToDetail?tempBoardToDetail.taskDeadLine:""}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    任务ID号： {!!tempBoardToDetail?tempBoardToDetail.taskCode:""}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={this.openAlert}>完成走查</Button>
                            </CardActions>
                            <AlertDialogSlide handleClickOpen={this.openAlert}
                                              handleClose={this.closeAlert}
                                              openAlert={this.state.openAlert}
                                              handleChangeAndClose={this.handleChangeAndClose}
                            />
                        </Card>
                        </Grid>
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
        openTask: state.reducer.task.openTask,
        detailGoTestShow:state.reducer.buildMission.detailGoTestShow,
        tempBoardToDetail:state.reducer.buildMission.tempBoardToDetail,
        addTask:state.reducer.buildMission.addTask,
        demands:state.reducer.buildMission.demands,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(MissionDetailMain));
