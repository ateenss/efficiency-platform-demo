import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "../SelfComponent/MultiSelect";
import DatePicker from "../SelfComponent/DatePicker"
import {closeBuildModule} from "../../actions/BuildMissionAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import EditQuill from "../SelfComponent/EditQuill"


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
    gridStyle:{
        marginTop:"15px"
    },
    item:{
        paddingTop:"60px"
    },
    quillIn:{
        height:"300px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },

};

class BuildModuleMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            moduleContent:{

            }
        }
    }




    handleClose = () => {
        store.dispatch(closeBuildModule());
    };
    handleSave=()=>{

        // store.dispatch(buildSaveDemandDispatch(temp));
        store.dispatch(closeBuildModule());
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                moduleContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.moduleContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                moduleContent:data
            })
        }
    };


    render() {
        const {classes, onClose, selectedValue,initialData,buttonStyle,randomNum,hintMessage, ...other} = this.props;
        const statusArray=["方案","开发","联调","提测"];
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新任务</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8} >
                            <InputField
                                nameIn="ModuleName"
                                onChange={this.getContent}
                                InputLabelName="任务名称"
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <InputField InputLabelName="任务ID" defaultValue={randomNum} nameIn="demandID"  disabled={true}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="任务开发负责人" nameIn="ModuleDevHead" nameArray={initialData.demandDevHead}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="demandAcceptTime" InputLabelName="任务开始时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="demandAcceptTime" InputLabelName="任务结束时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="任务状态"
                                nameIn="ModuleStatus"
                                nameArray={statusArray}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <Typography className={classes.quillLabel}>开发方案</Typography>
                            <EditQuill
                                onChange={this.getContent}
                                InputLabelName="任务描述"
                                nameIn="ModuleDescription"
                                classStyle={classes.quillIn}
                            />
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                        {/*<Typography color="error">{hintMessage}</Typography>*/}
                        {/*</Grid>*/}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

BuildModuleMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData:state.reducer.buildDemand.initialData,
        hintMessage:state.reducer.buildDemand.hintMessage,
        buildDemandShow:state.reducer.buildDemand.buildDemandShow,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildModuleMain));
