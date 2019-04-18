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
import store from "../../stores";
import EditQuill from "../SelfComponent/EditQuill"
import {
    closeTaskEdit,
    submitAndChange2Dev,
    saveDevPlan, init, closeTestCaseEditor, handleAddTestCase,
} from "../../actions/BuildMissionAction"
import InputField from "../SelfComponent/InputField"
import DatePicker from "../SelfComponent/DatePicker"
import SingleSelect from "../SelfComponent/SingleSelect"
import permProcessor from "../../constants/PermProcessor";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {Rules} from "../../actions/validateAction";
import {EDIT_TEST_CASE, OPEN_TEST_CASE_EDITOR, SAVE_EDIT_TEST_CASE, SAVE_TEST_CASE} from "../../actions/types";
import AddTestCase from "./AddTestCase";
import {success} from "../../actions/NotificationAction";
import CustomToolbarSelect from "../views/DemandBoard";
import CustomToolBarSelect4DeliveryDoc from "./CustomToolBarSelect4DeliveryDoc";


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
    },
    taskInput: {
        fontSize: 20,
        marginTop: 10
    },
    taskLabel: {
        fontSize: 22
    },
    quillContainer: {
        marginTop: "10px",
        height:"500px"
    },
    quillLabel: {
        fontSize: "16px",
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: "15px"
    },
    quillIn:{
        height:"400px"
    },

};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

//"id":1,"checker":"信总","checkTime":"2015-10-15","checkItem":"阿斯顿发","steps":"1234","supportGray":"是","expectedResult":"成功","actualResult":"成功","demandId":1,"taskId":1}
const columns = [
    {name: "序号", options: {filter: false, display:false}},
    {name: "检查方", options: {filter: false}},
    {name: "检查时间", options: {filter: false}},
    {name: "检查项", options: {filter: false}},
    {name: "步骤", options: {filter: false}},
    {name: "是否具备灰度", options: {filter: false}},

    {name: "预期结果", options: {filter: false}},
    {name: "实际结果", options: {filter: false}},
    {name: "需求Id", options: {filter: false,display:false}},
    {name: "任务Id", options: {filter: false,display:false}},

];

class DevTestCaseEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            perm: permProcessor.init('task'),
            testCase : [],
            editTestCase:{}
        }
    }

    componentWillReceiveProps(nextProps, nextStatus) {
        if(nextProps.action === OPEN_TEST_CASE_EDITOR){

            let testCase = this.mapObjectToArray(nextProps.testCase);

            this.setState({testCase : testCase, raw : nextProps.testCase});

        }else if(nextProps.action === SAVE_TEST_CASE){

            let rawRet = this.state.raw;
            rawRet.push(nextProps.singleTestCase);

            let testCase = JSON.parse(JSON.stringify(this.state.testCase));

            testCase.push(this.mapObjectToArray(nextProps.singleTestCase));

            this.setState({testCase : testCase, raw : rawRet});

        }else if(nextProps.action === SAVE_EDIT_TEST_CASE){

            let newRaw = JSON.parse(JSON.stringify(this.state.raw));

            let editedTestCase = nextProps.singleTestCase;

            for(let i in newRaw){
                let unit = newRaw[i];
                if(editedTestCase.id === unit.id){
                    newRaw[i] = editedTestCase;
                    break;
                }
            }

            this.setState({testCase : this.mapObjectToArray(newRaw), raw : newRaw});

        }
    }

    mapObjectToArray = (result) => {

        let ret = [];

        let demandList = result;

        let parsedDemandList = [];

        for(let idx in demandList){

            let unit = demandList[idx];

            let demand = [];

            for(let i in unit){

                demand.push(unit[i]);
            }

            parsedDemandList.push(demand);
        }

        return parsedDemandList;

    };


    handleClose = () => {
        store.dispatch(closeTestCaseEditor())

    };

    handleAdd = () =>{
        handleAddTestCase();
    };



    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiPaper: {
                root: {
                    boxShadow: "none !important"
                }
            },
            MUIDataTableBodyCell: {
                root: {
                    backgroundColor: "#FFF",
                    width: "600px"
                }
            },
        }
    });

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.taskContent, {
                [keyNote]: value
            });
            this.setState({
                taskContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.taskContent, {
                [keyNote]: value
            });
            this.setState({
                taskContent:data
            })
        }
    };


    render() {

        const {classes,openTestCaseEditor} = this.props;

        const options = {
            filterType: 'checkbox',
            print: false,
            sort: false,
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
                console.log("这是被选中的行");
                console.log(selectedRows.data[0].index);
                return (
                    <CustomToolBarSelect4DeliveryDoc selectedRows={selectedRows} displayData={displayData}
                                         setSelectedRows={setSelectedRows}/>)

            },
            textLabels: {
                selectedRows: {
                    text: "行 已选定",
                    delete: "删除",
                    deleteAria: "删除指定行"
                },
                toolbar: {
                    search: "搜索",
                    downloadCsv: "下载 CSV",
                    print: "打印",
                    viewColumns: "过滤列",
                    filterTable: "筛选",
                },
                pagination: {
                    next: "下一页",
                    previous: "上一页",
                    rowsPerPage: "每页行数:",
                    displayRows: "总页数",
                }
            }
        };

        return (

            <div>
                <Dialog  open={openTestCaseEditor}  TransitionComponent={Transition}  fullWidth maxWidth="xl">
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                测试案例
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <MuiThemeProvider theme={this.getMuiTheme()}>
                                    <MUIDataTable
                                        title={
                                        <IconButton color="inherit" onClick={this.handleAdd} aria-label="Close">
                                            <CloseIcon/>
                                            </IconButton>

                                        }
                                        data={this.state.testCase}
                                        columns={columns}
                                        options={options}
                                    />
                                </MuiThemeProvider>
                            </Grid>

                        </Grid>
                        <AddTestCase demandId={this.props.demandId}/>

                    </DialogContent>
                </Dialog>
            </div>
        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        openTestCaseEditor: state.reducer.buildMission.openTestCaseEditor,
        testCase:state.reducer.buildMission.testCase,
        action:state.reducer.buildMission.action,
        singleTestCase:state.reducer.buildMission.singleTestCase,
        demandId : state.reducer.buildMission.demandId
    }
};

export default connect(mapStateToProps)(withStyles(styles)(DevTestCaseEditor));