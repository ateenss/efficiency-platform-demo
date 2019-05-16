import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Rules, validating} from "../../actions/validateAction";
import InputField from "../SelfComponent/InputField";
import Grid from "@material-ui/core/Grid";
import {error, success} from "../../actions/NotificationAction";
import {saveEditTestCase} from "../../actions/IterationAction";
import {connect} from "react-redux";
import SingleSelect from "../SelfComponent/SingleSelect";
import {DialogActions} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import {EDIT_TEST_CASE} from "../../actions/types";
import DatePicker from "../SelfComponent/DatePicker";
import store from '../../stores/index';
import {CLOSE_TEST_CASE_EDIT,OPEN_TEST_CASE_EDIT} from "../../actions/types";

const styles = theme => ({
    dialogContainer:{
        padding:"24px"
    },
    appBar: {
        position: 'relative',
        boxShadow:"none",
        color:"#292929",
        background:"#f5f5f5"
    },
    flex: {
        flex: 1,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class EditTestCase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testCaseContent :{

            }
        }
    }


    componentWillReceiveProps(nextProps, nextStatus) {

       if (nextProps.action===OPEN_TEST_CASE_EDIT){
           this.setState({testCaseContent : nextProps.selectedTestCaseData});
       }
    }


    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.testCaseContent, {
                [keyNote]: value
            });
            this.setState({
                testCaseContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.testCaseContent, {
                [keyNote]: value
            });
            this.setState({
                testCaseContent:data
            })
        }
    };

    handleSave = () => {


        let ret = validating(this.state.testCaseContent, "testCaseProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }
        /*let tempData=this.state.testCaseContent;
        // tempData.demandId=demandId;*/
        let tempContent=this.state.testCaseContent;
        if (tempContent.note==null){
            tempContent.note="";
        }
        saveEditTestCase(tempContent);
    };

    handleCancel = () =>{
        store.dispatch({
            type:CLOSE_TEST_CASE_EDIT
        });

    };

    render() {
        const {classes, theme} = this.props;
        const {testCaseContent}=this.state;
        let grayValues = [{id:1, name:"是"},{id:0,name:"否"}];

        return (

            <Dialog open={this.props.openEditTestCaseShow}  TransitionComponent={Transition}  fullWidth maxWidth="sm">
                <AppBar className={classes.appBar} color="default">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" onClick={this.handleCancel} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                            编辑测试案例
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.dialogContainer}>
                    <Grid container spacing={8}>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="checker"
                                onChange={this.getContent}
                                InputLabelName="检查方"
                                validateEl={Rules.testCaseProps.checker}
                                defaultValue={testCaseContent.checker}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="checkTime"
                                        InputLabelName="检查时间"
                                        onDateChange={this.getContent}
                                        defaultValue={testCaseContent.checkTime}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="checkItem"
                                onChange={this.getContent}
                                InputLabelName="检查项"
                                validateEl={Rules.testCaseProps.checkItem}
                                defaultValue={testCaseContent.checkItem}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="是否具备灰度" nameIn="supportGray"
                                          nameArray={grayValues}
                                          validateEl={Rules.testCaseProps.supportGray}
                                          defaultValue={testCaseContent.supportGray}
                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="expectedResult"
                                onChange={this.getContent}
                                InputLabelName="预期结果"
                                validateEl={Rules.testCaseProps.expectedResult}
                                defaultValue={testCaseContent.expectedResult}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="actualResult"
                                onChange={this.getContent}
                                InputLabelName="实际结果"
                                // validateEl={Rules.testCaseProps.expectedResult}
                                defaultValue={testCaseContent.actualResult}

                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <InputField
                                nameIn="steps"
                                onChange={this.getContent}
                                InputLabelName="步骤或命令"
                                validateEl={Rules.testCaseProps.steps}
                                defaultValue={testCaseContent.steps}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <InputField
                                nameIn="note"
                                onChange={this.getContent}
                                InputLabelName="备注"
                                defaultValue={!!testCaseContent.note?testCaseContent.note:""}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button size="small" color="primary" onClick={this.handleSave}>
                        保存
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}


// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        editTestCase:!!state.reducer.buildMission.editTestCase ? state.reducer.buildMission.editTestCase : {},
        openAddTestCase:state.reducer.buildMission.openAddTestCase,
        openEditTestCaseShow:state.reducer.iteration.openEditTestCaseShow,
        selectedTestCaseData:state.reducer.iteration.selectedTestCaseData,
        action:state.reducer.iteration.action,
    }
};

export default connect(mapStateToProps)(withStyles(styles,{withTheme: true})(EditTestCase));

