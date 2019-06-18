import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from '@material-ui/core/DialogContent';
import store from "../../stores";
import {closeGoTestDetail,finishTest} from "../../actions/BuildMissionAction"
import {OPEN_DETAIL_GOTEST} from "../../actions/types";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import permProcessor from "../../constants/PermProcessor";
// import MuiSlider from '@material-ui/lab/Slider';
import {Tooltip} from "@material-ui/core";

import { Slider } from 'material-ui-slider';


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
    show:{
        display:"block"
    },
    hide:{
        display:"none"
    },
    sliderWrapper:{
        width:"40px",
        height:"40px",
        marginTop:"14px",
        borderRadius:"3px",
        backgroundColor:"#4DAF7C !important",
        "&:before":{
            display:"none"
        }
    },
    sliderTrack:{
        height:"30px !important",
        backgroundColor:"#4DAF7C !important"
    }

};


// const Slider = withStyles({
//     root:{
//     },
//     track:{
//         height:"30px",
//         background:"#ababab"
//     },
//     trackBefore:{
//         height:"30px",
//         background:"#4DAF7C"
//     },
//     thumb:{
//         height:"30px !important",
//         borderRadius:"0",
//         background:"#4DAF7C",
//     },
//
//
//
// })(props => <MuiSlider {...props} />);




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


class DoTestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            openAlert:false,
            perm: permProcessor.init('task'),
            confirm:false,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.action ===OPEN_DETAIL_GOTEST ){
            this.setState({progress : 0})
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
           confirm : true
       })
   };

    closeAlert=()=>{
        this.setState({
            openAlert:false
        })
    };


    handleClose = () => {
        store.dispatch(closeGoTestDetail());
    };


    handleChange = (value) => {
        let self = this;
        if(value === 100){
            if (permProcessor.bingo('finishTest', this.state.perm)) {
                setTimeout(function(){
                    finishTest(self.props.tempBoardToDetail.taskId);
                }, 500);
            }
        }
    };

    componentWillUnmount() {
    }

    render() {
        const {classes,detailGoTestShow,tempBoardToDetail} = this.props;

        const { progress } = this.state;
        return (

            <div>
                <Dialog fullWidth maxWidth="xs" open={detailGoTestShow} onClose={this.handleClose} TransitionComponent={Transition}>
                    <DialogTitle id="simple-dialog-title">走查任务 - {!!tempBoardToDetail?tempBoardToDetail.taskCode:""}</DialogTitle>

                    <DialogContent style={{paddingBottom:"0"}}>
                        <Typography variant="subheading" style={{marginBottom:"15px"}}>
                            {!!tempBoardToDetail?tempBoardToDetail.taskName:""}
                        </Typography>
                        <Typography variant="subheading">
                            {!!tempBoardToDetail?tempBoardToDetail.taskDeadline:""} 截止
                        </Typography>
                    </DialogContent>
                    <DialogActions style={{padding:"0px 18px 24px 18px"}}>
                            {/*<Slider*/}
                                {/*value={progress}*/}
                                {/*aria-labelledby="label"*/}
                                {/*onChange={this.handleChange}*/}
                                {/*// disabled={this.state.disabled}*/}

                            {/*/>*/}
                            <Slider defaultValue={0} min={0} max={100} onChangeComplete={this.handleChange} classes={{
                                pointer : classes.sliderWrapper, track:classes.sliderTrack
                            }}></Slider>
                    </DialogActions>

                </Dialog>
                <AlertDialogSlide handleClickOpen={this.openAlert}
                                  handleClose={this.closeAlert}
                                  openAlert={this.state.openAlert}
                                  handleChangeAndClose={this.handleChangeAndClose}
                />
            </div>
        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        action : state.reducer.buildMission.action,
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask,
        detailGoTestShow:state.reducer.buildMission.detailGoTestShow,
        tempBoardToDetail:state.reducer.buildMission.tempBoardToDetail,
        demands:state.reducer.buildMission.demands,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(DoTestPage));
