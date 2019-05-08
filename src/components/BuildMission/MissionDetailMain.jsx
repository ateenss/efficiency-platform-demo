import React from 'react';
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
import store from "../../stores";
import MyPage from "./MyPage"
import {closeDetailMission,  getMyTaskMain} from "../../actions/BuildMissionAction"
import {SHOW_NOTIFICATION} from "../../actions/types";
// import Link from '@material-ui/core/Link';


const styles = {
    appBar: {
        position: 'relative',
        boxShadow: "none",
        color: "#292929",
        background: "#f5f5f5"
    },
    flex: {
        flex: 1,
    },
    dialogContainer: {
        margin: "24px 0 24px 0",
        padding: "0 12px 0 12px"
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
    root:{
        flex: 1,
        /*link:{color: "#4caf50",
               textDecoration:"underline"},*/
        color:"#4caf50",
    },

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MissionDetailMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {}
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if (nextProps.action === "saveTask") {
            this.setState({
                openTask: nextProps.openTask
            });
            setTimeout(function () {

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

    handleClose = () => {
        getMyTaskMain();
        store.dispatch(closeDetailMission());
    };

    showTitle=(classes)=>{
        if(!!this.props.demands){
            if (!!this.props.demands.hyperLink) {
                return(
                    <Typography variant="headline" align="center" color="inherit" className={classes.root} component="a"  href={this.props.demands.hyperLink}>
                        需求任务详情
                       {/* <Link >
                            Link
                        </Link>*/}
                    </Typography>
                )
            }else{
                return(
                    <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                        需求任务详情
                    </Typography>
                )
            }
        }

    };


    render() {
        const {classes, detailMissionShow, tempBoardToDetail} = this.props;

        return (

            <div>
                <Dialog fullScreen open={detailMissionShow} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            {this.showTitle(classes)}
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <MyPage tempBoardToDetail={tempBoardToDetail}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        action: state.reducer.task.action,
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask,
        detailMissionShow: state.reducer.buildMission.detailMissionShow,
        tempBoardToDetail: state.reducer.buildMission.tempBoardToDetail,
        addTask: state.reducer.buildMission.addTask,
        demands: state.reducer.buildMission.demands,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(MissionDetailMain));
