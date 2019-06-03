import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    saveActionValue,
    setEmptyAction,
    closeTestCaseTask,
    getTestCaseListByDemands, getDemandTaskDetail
} from "../../actions/BuildMissionAction"
import {
    INJECT_TEST_CASE_CONTENT,
    SAVE_ACTUAL_VALUE_INSERT,
} from "../../actions/types";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import SearchTextField from "../Iteration/SearchTextField";
import CustomToolBarSelect4DeliveryDoc from "./CustomToolBarSelect4DeliveryDoc";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import {sysInit} from "../../actions/CommonAction";
import {UrlParser} from "../../constants/UrlConf";



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

function EmptyFooter() {
    return (
        <TableFooter style={{display: "none"}}>
            <TableRow>
                <TableCell>
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}

function EmptyHeader() {
    return (
        <div style={{display: "none"}}>

        </div>
    );
}

const options = {
    filterType: 'checkbox',
    print: false,
    sort: false,
    search:false,
    download:false,
    filter:false,
    sortFilterList:false,
    viewColumns:false,
    customFooter: () => {
        return (<EmptyFooter/>)
    },
    selectableRows: "none",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        console.log("这是被选中的行");
        console.log(selectedRows.data[0].index);
        return (
            <CustomToolBarSelect4DeliveryDoc selectedRows={selectedRows} displayData={displayData}
                                             setSelectedRows={setSelectedRows}/>)

    },
    /*customToolbar: () => {
        return (
            <CustomToolbar handleAdd={handleAddTestCase}/>
        );
    },*/
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
    componentDidMount() {

        let taskId = UrlParser.parse(window.location.href).id;


        let self = this;

        sysInit(function(initParams){
            if(!!taskId){
                getTestCaseListByDemands(new Number(taskId));
            }


            self.setState({projectMembers : initParams.projectMembers, modules : initParams.modules})

        })





    }


    handleChange = (panel) => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
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
            if (demandsArrayTemp!=null) {
                demandsArrayTemp.map((itemOut,indexOut)=>{
                    let tempObject={};
                    tempObject.demandId=itemOut.demandId;
                    tempObject.demandName=itemOut.demandName;
                    let testCaseList=[];
                    itemOut.testCaseList.map((itemIn,indexIn)=>{
                        testCaseList.push(this.mapObjectToArray(itemIn));
                    });
                    tempObject.testCaseList=testCaseList;
                    demandsArray.push(tempObject);
                });
            }
            this.setState({demandsArray,raw:demandsArrayTemp});
            setEmptyAction();
        }else if(nextProps.action ===SAVE_ACTUAL_VALUE_INSERT){
            const tempdemandId=nextProps.singleTestCaseActualValue.demandId;
            let newDemandsArray=this.state.demandsArray.map((item,index)=>{
              if (item.demandId===tempdemandId)   {
                  let tempItem={};
                  tempItem.testCaseList=item.testCaseList.map((itemIn,indexIn)=>{
                      if (itemIn[0]===nextProps.singleTestCaseActualValue.id) {
                          return itemIn=this.mapObjectToArray(nextProps.singleTestCaseActualValue);
                      }
                      return itemIn;

                  });
                  tempItem.demandName=item.demandName;
                  tempItem.demandId=item.demandId;
                  return tempItem;
              }
              return item
            });
            this.setState({demandsArray:newDemandsArray});
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
                        <div className={classes.root}>
                            {
                                !!demandsArray?demandsArray.map((item,index)=>{
                                    return(
                                        <ExpansionPanel expanded={expanded === index.toString()} onChange={this.handleChange(index.toString())}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>{item.demandName}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {this.showTestCaseTable(item.testCaseList)}
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    )

                                }):""
                            }
                        </div>
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
