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
import { getMyTaskMain, handleAddTestCase, saveActionValue,setEmptyAction,closeTestCaseTask,openTestCaseTask} from "../../actions/BuildMissionAction"
import {
    INJECT_TEST_CASE_CONTENT,
    OPEN_TEST_CASE_EDITOR,
    SAVE_EDIT_TEST_CASE,
    SAVE_TEST_CASE,
    SAVE_ACTUAL_VALUE_INSERT,
    TEST_CASE_SAVE_DEMANDID
} from "../../actions/types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "./TestCaseEditor";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import SearchTextField from "../Iteration/SearchTextField";
import CustomToolBarSelect4DeliveryDoc from "./CustomToolBarSelect4DeliveryDoc";
import CustomToolbar from "./CustomToolbar4DeliveryDoc";
import AddTestCase from "./AddTestCase";



const styles = (theme)=>({
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
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const onClick=({value, tableMeta, updateValue})=>(e)=>{
    let content={id:"",checker:"",checkTime:"",checkItem:"",steps:"",supportGray:"",expectedResult:"",actualResult:"",demandId:""};
    tableMeta.rowData.map((itemOut,keyOut)=>{
        Object.keys(content).map((itemIn,keyIn)=>{
            if (keyOut===keyIn) {
                content[itemIn]=itemOut
            }
        })
    });
    content.actualResult=e.actualResult;
    let testCase=e.testCase;
    if (!!testCase) {
        testCase.map((item,key)=>{
            if (content.id===item.id){
                item.actualResult=content.actualResult
            }
        });
    }else{
        testCase=null
    }
    saveActionValue({content,testCase});

};

const columns = [
    {name: "序号", options: {filter: false, display:false}},
    {name: "检查方", options: {filter: false}},
    {name: "检查时间", options: {filter: false}},
    {name: "检查项", options: {filter: false}},
    {name: "步骤", options: {filter: false}},
    {name: "是否具备灰度", options: {filter: false}},
    {name: "预期结果", options: {filter: false}},
    {name: "实际结果", options: {filter: false,customBodyRender: (value, tableMeta, updateValue) => {
                if (!!value) {
                    return value;
                } else {
                    return (<SearchTextField
                        nameIn="actualResult"
                        onClick={onClick({value, tableMeta, updateValue})}
                        defaultValue="23424"
                    />)
                }
            }
        }
    },
    {name: "需求Id", options: {filter: false,display:false}},
    {name: "任务Id", options: {filter: false,display:false}},

];


const options = {
    filterType: 'checkbox',
    print: false,
    sort: false,
    search:false,
    download:false,
    filter:false,
    selectableRows: "none",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        console.log("这是被选中的行");
        console.log(selectedRows.data[0].index);
        return (
            <CustomToolBarSelect4DeliveryDoc selectedRows={selectedRows} displayData={displayData}
                                             setSelectedRows={setSelectedRows}/>)

    },
    customToolbar: () => {
        return (
            <CustomToolbar handleAdd={handleAddTestCase}/>
        );
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


class TestCaseTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {},
            expanded: null,
            demandsArray:[],

        }
    }

    handleChange = (panel,demandid) => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
        store.dispatch({
            type:TEST_CASE_SAVE_DEMANDID,
            value:demandid
        })

    };


    handleClose = () => {
        // getMyTaskMain();
        closeTestCaseTask();
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
                    width: "1500px"
                }
            },
            MuiTableCell:{
                root:{
                    padding:"4px 0px 4px 4px",
                    "&:nth-child(6)": {
                        maxWidth:"300px"
                    }
                }
            },
        }
    });



    showTestCaseTable=(childData)=>{
        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                data={childData}
                columns={columns}
                options={options}
            />
    </MuiThemeProvider>

        )
    };


    componentWillReceiveProps(nextProps, nextStatus) {
        if(nextProps.action === INJECT_TEST_CASE_CONTENT){
            let demandsArrayTemp = nextProps.testCaseTaskInfo.demandsArray;
            let demandsArray=[];
            demandsArrayTemp.map((item,index)=>{
                let tempObject={};
                tempObject.testCase=this.mapObjectToArray(item.testCase);
                tempObject.demandName=item.demandName;
                demandsArray.push(tempObject);
            });
            this.setState({demandsArray,raw:demandsArrayTemp})
            setEmptyAction();
        }else if(nextProps.action === SAVE_TEST_CASE){
            let rawRet = this.state.raw;
            let tempObject={};
            let tempChangeObject={};
            //多寫一步，這裏可以簡化
            if (!!rawRet){
                Object.keys(this.props.testCaseTaskInfo.demandIdList).map((item,index)=>{
                    if (this.props.testCaseTaskInfo.demandIdList[item]===nextProps.singleTestCase.demandId){
                        tempObject.demandName=item;
                        tempObject.testCase=nextProps.singleTestCase;
                    }
                });
                rawRet.map((item,index)=>{
                    if (item.demandName===tempObject.demandName) {
                        item.testCase.push(tempObject.testCase)
                    }
                });

                tempChangeObject=tempObject;
                tempChangeObject.testCase=this.mapObjectToArray(nextProps.singleTestCase);
                let demandsArray = JSON.parse(JSON.stringify(this.state.demandsArray));
                demandsArray.map((item,index)=>{
                    if (item.demandName===tempChangeObject.demandName) {
                        item.testCase.push(tempChangeObject.testCase)
                    }
                });
                this.setState({ demandsArray, raw : rawRet});
                setEmptyAction();
            } else{
                if(this.props.testCaseTaskInfo!=null){
                    Object.keys(this.props.testCaseTaskInfo.demandIdList).map((item,index)=>{
                        if (this.props.testCaseTaskInfo.demandIdList[item]===nextProps.singleTestCase.demandId){
                            tempObject.demandName=item;
                            tempObject.testCase=nextProps.singleTestCase;
                        }
                    });
                    rawRet.push(tempObject);
                    tempChangeObject=tempObject;
                    tempChangeObject.testCase=this.mapObjectToArray(nextProps.singleTestCase);
                    let demandsArray = JSON.parse(JSON.stringify(this.state.demandsArray));
                    demandsArray.push(tempChangeObject);
                    this.setState({demandsArray});
                    setEmptyAction();
                }
            }




        }else if(nextProps.action ===SAVE_ACTUAL_VALUE_INSERT){
            // nextProps.singleTestCaseActualValue
            let demandNameAndIdMap=this.props.testCaseTaskInfo.demandIdList;
            let x;
            let demandNameFind="";
            for(x in demandNameAndIdMap){
                if(demandNameAndIdMap[x]===nextProps.singleTestCaseActualValue.demandId){
                    demandNameFind=x;
                }
            }
            let newDemandsArray=this.state.demandsArray.map((item,index)=>{
              if (item.demandName===demandNameFind)   {
                  let tempItem={};
                  tempItem.testCase=item.testCase.map((itemIn,indexIn)=>{
                      if (itemIn[0]===nextProps.singleTestCaseActualValue.id) {
                          return itemIn=this.mapObjectToArray(nextProps.singleTestCaseActualValue);
                      }
                      return itemIn;

                  });
                  tempItem.demandName=item.demandName;
                  return tempItem;
              }
              return item
            });
            this.setState({demandsArray:newDemandsArray});
        } else if(nextProps.action === SAVE_EDIT_TEST_CASE){

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
            setEmptyAction();
        }
    }

    mapObjectToArray = (result) => {
        let parsedDemandList = [];
        if (result!=null) {
            if (result.length>=1){
                let ret = [];
                let demandList = result;

                for(let idx in demandList){
                    let unit = demandList[idx];
                    let demand = [];
                    for(let i in unit){
                        demand.push(unit[i]);
                    }
                    parsedDemandList.push(demand);
                }
            }else{
                let ret = [];

                let demandList = result;
                for(let idx in demandList){
                    let unit = demandList[idx];
                    parsedDemandList.push(unit);
                }
            }
        }
        return parsedDemandList;
    };



    render() {
        const {classes, testCaseTaskShow} = this.props;
        const { expanded ,demandsArray} = this.state;

        return (

            <div>
                <Dialog fullScreen open={testCaseTaskShow}  TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color="default">
                        <Toolbar variant="dense">
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="headline" align="center" color="inherit" className={classes.flex}>
                                上线检查表任务详情
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className={classes.dialogContainer}>
                        <div className={classes.root}>
                            {
                                !!demandsArray?demandsArray.map((item,index)=>{
                                    let tempDemandId=0;
                                    Object.keys(this.props.testCaseTaskInfo.demandIdList).map((itemIn,indexIn)=>{
                                        if (itemIn===item.demandName){
                                            tempDemandId=this.props.testCaseTaskInfo.demandIdList[itemIn]
                                        }
                                    });
                                    return(
                                        <ExpansionPanel expanded={expanded === index.toString()} onChange={this.handleChange(index.toString(),tempDemandId)}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>{item.demandName}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {this.showTestCaseTable(item.testCase)}
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )

                                }):""
                            }
                            <AddTestCase demandId={this.props.tempDemandId}/>
                        </div>
                    </DialogContent>
                </Dialog>
    </div>

        )
    };
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        task: state.reducer.task.task,
        openTask: state.reducer.task.openTask,
        detailMissionShow: state.reducer.buildMission.detailMissionShow,
        tempBoardToDetail: state.reducer.buildMission.tempBoardToDetail,
        addTask: state.reducer.buildMission.addTask,
        demands: state.reducer.buildMission.demands,
        testCaseTaskShow: state.reducer.buildMission.testCaseTaskShow,
        testCaseTaskInfo: state.reducer.buildMission.testCaseTaskInfo,
        action: state.reducer.buildMission.action,
        tempDemandId : state.reducer.buildMission.tempDemandId,
        singleTestCase:state.reducer.buildMission.singleTestCase,
        singleTestCaseActualValue:state.reducer.buildMission.singleTestCaseActualValue,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(TestCaseTask));
