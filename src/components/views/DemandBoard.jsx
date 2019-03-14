/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux";

import Grid from '@material-ui/core/Grid'
import CustomToolbarSelect from '../demand/CustomToolBarSelect';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import DemandEditor from "../demand/DemandEditor";
// import store from "../../stores";
import {SHOW_NOTIFICATION} from "../../actions/types";
import {saveTask} from "../../actions/DemandTasksAction";
import Paper from "@material-ui/core/Paper";
import red from '@material-ui/core/colors/red';
import store from '../../stores/index';
import {closeBuildDemand, openBuildDemand,pullBuildDemandInitial} from "../../actions/BuildDemandAction"
import BuildDemandMain from "../BuildDemand/BuildDemandMain"
import EditDemandMain from "../BuildDemand/EditDemandMain"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newBuildButton:{
        color:red[500]
    }

});


const columns = [{name:"序号", options:{filter:false}}, {name:"需求编号", options:{filter:false}}, {name:"需求名称", options:{filter:false}}, {name:"需求负责人", options:{filter:true}}, {name:"需求状态", options:{filter:true}}];


let selectedValue=0;
const options = {
    filterType: 'checkbox',
    print: false,
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        console.log("这是被选中的行");
        console.log(selectedRows.data[0].index);
        selectedValue=selectedRows.data[0].index;
        return(
            <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>)

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
            displayRows: "展示行数",
        }
    }
};
let dynamicAddReuslt=[];
let initialTableLength=0;
let editInitialData=null;
class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        // pullBuildDemandInitial();
        this.state = {
            randomNum:0,
            assembleTable:props.tableData
        };
        //todo:这里用来给表格数据增加序号用的
        initialTableLength=props.initialTable.length
    }

    componentDidMount() {
        console.log(this.state.initialTable)
    }

    openDemand=e=>{
        store.dispatch(openBuildDemand());
        e.stopPropagation();
        e.preventDefault();
        //todo:这里代表打开的时候生成一个随机数，代表各种工程编号，真正用的时候需要修改一下
        this.setState({
            randomNum:Math.floor(Math.random()*400)+1
        });
        return false;

    };
    handleClickClose = () => {
        store.dispatch(closeBuildDemand());
    };

    mapObjectToArray=(pointer)=>{
        let inArray=[];
        let outArray=[];
        pointer.tableData.map((value,key)=>{
            inArray.push((key+initialTableLength+1).toString());
            inArray.push(value["BusinessNum"]);
            inArray.push(value["DemandName"]);
            inArray.push(value["DemandDevHead"]);
            inArray.push(value["DemandStatus"]);
            outArray.push(inArray);
            inArray=[]
        });
        dynamicAddReuslt=outArray;
    };

    componentWillReceiveProps(nextProps, nextContext) {
       this.mapObjectToArray(nextProps);
        this.setState({
            assembleTable:nextProps.tableData
        })
    }


    handleLinkData=()=>{
        this.state.assembleTable.map((value,key)=>{
            if (key===selectedValue) {
                editInitialData=this.state.assembleTable[key]
            }
        });
    };

    render() {
        const {classes,buildDemandShow,editDemandShow,tableData} = this.props;
        this.mapObjectToArray(this.props);
        this.handleLinkData();
        //todo:结果都在这个result里面，选取值去定位这个result里面的数组（被选取的索引值和result里面是保持一致的）
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Grid container spacing={4}>
                                    <Grid item xs={2}>
                                        <Typography variant="h6" color="inherit">
                                            需求工具栏
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button color="inherit" className={classes.newBuildButton} onClick={this.openDemand}>新建需求</Button>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Grid>
                <Grid item xs={12}>
                        <MUIDataTable
                            title={"需求列表"}
                            data={dynamicAddReuslt}
                            columns={columns}
                            options={options}
                        />

                </Grid>
                <BuildDemandMain
                    open={buildDemandShow}
                    onClose={this.handleClickClose}
                    randomNum={this.state.randomNum}
                />

                <EditDemandMain
                    open={editDemandShow}
                    randomNum={this.state.randomNum}
                    addDemand={editInitialData}
                    findNote={selectedValue}
                />
            </Grid>

        )
    }
}

const
    mapStateToProps = (state) => {
        // console.log("!!!!!!!!" + JSON.stringify(state.reducer.task.demand));
        return {
            demand: state.reducer.task.demand,
            buildDemandShow:state.reducer.buildDemand.buildDemandShow,
            editDemandShow:state.reducer.buildDemand.editDemandShow,
            tableData:state.reducer.buildDemand.addDemand,
            initialTable:state.reducer.buildDemand.initialData.dataMuiTable,
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
