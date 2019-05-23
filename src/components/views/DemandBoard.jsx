/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid'
import CustomToolbarSelect from '../demand/CustomToolBarSelect';
import MUIDataTable from "mui-datatables";
// import store from "../../stores";
import red from '@material-ui/core/colors/red';
import store from '../../stores/index';
import {
    closeBuildDemand, demandSync,
    openFilter
} from "../../actions/DemandAction"
import BuildDemandMain from "../BuildDemand/BuildDemandMain"
import ReviewDemand from "../BuildDemand/ReviewDemand"

import EditDemandMain from "../BuildDemand/EditDemandMain"
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {addDemand, init, nextPage, search} from "../../actions/DemandAction";
import {
    CLOSE_DEMAND_FILTER,
    SAVE_ADD_DEMAND,
    SAVE_EDIT_DEMAND,
    SAVE_REVIEW_DEMAND, SPLIT_DEMAND, SYNC_DEMAND,
    UPDATE_ROW
} from "../../actions/types";
import {startLoading, stopLoading, sysInit} from "../../actions/CommonAction";
import CustomToolbar4Demand from "../demand/CustomToolbar4Demand";
import {muiTableTheme} from "../common/MuiTableTheme";
import Filter from "../BuildDemand/Filter";
import Chip from "@material-ui/core/Chip";
import {demandConst} from "../BuildDemand/DemandConst";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import {error, success} from "../../actions/NotificationAction";
import permProcessor from "../../constants/PermProcessor";
import DemandIterationStepper from "../demand/DemandIterationStepper";
import CheckIcon from "@material-ui/icons/CheckCircle"
import CloseIcon from "@material-ui/icons/Close"
import {getRecentIteration} from "../../actions/IterationAction";
import AddIteration from "./IterationBoard";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newBuildButton: {
        color: red[500]
    },
    head: {
        background: "#FFFFFF"
    },
    avatar: {},
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    toolbar:{
        boxShadow:"none",
        background:"#FFFFFF",
        minHeight:"64px"
    },
    chip:{
        fontSize:"12px",
        marginRight:theme.spacing.unit
    },
    toolTipIteration:{
        background:"#F5F5F5", padding:"8px",maxWidth:"600px"
    }
});


const filterLabel = {

    demandName : {
        label : "需求名称",
        renderValue : function(data){
            return this.label + ":" + data;;
        }
    },
    demandType : {
        label : "需求类型",
        renderValue : function(data){

            let label = this.label + ":" + data;

            for(let k in demandConst.type){

                if(demandConst.type[k].id === data){
                    label = this.label +":"+ demandConst.type[k].name;
                }
            }

            return label;


        }
    },
    status : {
        label : "需求评审状态",
        renderValue : function(data){

            let label = this.label + ":" + data;

            for(let k in demandConst.status){

                if(demandConst.status[k].id === data){
                    label = this.label +":"+ demandConst.status[k].name;
                }
            }

            return label;


        }
    },
    bmRequired:{
        label : "BM",
        mapping : demandConst.bmRequired,
        renderValue : function(data){

            let label = this.label + ":" + data;

            for(let k in demandConst.bmRequired){

                if(demandConst.bmRequired[k].id === data){
                    label = this.label +":"+ demandConst.bmRequired[k].name;
                }
            }

            return label;


        }
    },
    uatRequired:{
        label:"UAT",
        mapping : demandConst.uatRequired,
        renderValue : function(data){

            let label = this.label + ":" + data;

            for(let k in demandConst.uatRequired){

                if(demandConst.uatRequired[k].id === data){
                    label = this.label +":"+ demandConst.uatRequired[k].name;
                }
            }

            return label;


        }
    },
    createTime:{
        label : "创建时间",
        renderValue : function(data){
            return this.label + ":" + data.from + "-" + data.to;
        }
    }

};

let editInitialData = null;

class DemandBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNum: 0,
            assembleTable: [],
            currentPage: 1,
            totalCount: 1,
            pageSize:20,
            filters :{},
            perm: permProcessor.init('demand'),
        };
    }


    componentWillMount() {

        startLoading();
    }


    componentDidMount() {

        let self = this;

        sysInit(function(initParams){

            getRecentIteration().then(resp => {


                self.setState({iteration: resp.data.data, projectMembers : initParams.projectMembers, modules : initParams.modules});

                stopLoading();

            }).catch(e => {
                error("后台拉取数据失败", JSON.stringify(e));

            });


        });

    }

    /**
     * UrlConf.base + 'iteration/save';
     * @param page
     */
    changePage = (page, pageSize) => {

        let self = this;

        nextPage(page + 1, pageSize, function (ret) {

            let result = self.mapObjectToArray(ret.result);

            self.setState({assembleTable: result, pageSize: ret.pageSize, totalCount: ret.totalCount, raw: ret.result, currentPage : page});

        })
    };

    search = (pageNo, pageSize, searchText) =>{

        let self = this;

        search(pageNo+1, pageSize, searchText, function(ret){

            let result = self.mapObjectToArray(ret.result);

            self.setState({assembleTable: result, pageSize: ret.pageSize, totalCount: ret.totalCount, raw: ret.result, currentPage : pageNo});

        })


    };

    filter = (e) =>{
        openFilter(e.currentTarget, this.state.filters);
    };


    openDemand = e => {
        addDemand();

    };


    handleClickClose = () => {
        store.dispatch(closeBuildDemand());
    };



    mapObjectToArray = (result) => {

        let ret = [];

        let demandList = result;

        let parsedDemandList = [];

        for (let idx in demandList) {

            let unit = demandList[idx];

            let demand = [];

            for (let i in unit) {

                demand.push(unit[i]);
            }

            parsedDemandList.push(demand);
        }

        return parsedDemandList;

    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === UPDATE_ROW) {

            let rows = this.state.raw;
            for (let i in rows) {
                let unit = rows[i];
                if (unit.id === nextProps.updatedRow.id) {
                    unit.iterationName = nextProps.updatedRow.iterationName;
                    break;
                }
            }

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw: rows
            })

            success("更新成功");


        } else if (nextProps.action === SAVE_EDIT_DEMAND || nextProps.action === SAVE_REVIEW_DEMAND) {
            let rows = this.state.raw;
            for (let i in rows) {
                let unit = rows[i];
                if (unit.id === nextProps.updatedRow.id) {
                    rows[i] = nextProps.updatedRow;
                    break;
                }
            }

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw: rows
            })


        } else if (nextProps.action === SAVE_ADD_DEMAND || nextProps.action === SPLIT_DEMAND || nextProps.action === SYNC_DEMAND) {
            let rows = this.state.raw;
                rows.unshift(...nextProps.updatedRow);

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw: rows
            });

            success("新增成功");


        } else if(nextProps.action === CLOSE_DEMAND_FILTER){
            let self = this;

            this.setState({filters : nextProps.filters}, function(){

                self.search(0, self.state.pageSize, nextProps.filters)

            })

        }


    }


    handleDelete = (filterName) =>{
        let self = this;
        let curFilters = JSON.parse(JSON.stringify(this.state.filters));

        for(let i in curFilters){

            if(i === filterName){

                delete curFilters[i];

            }

        }

        this.setState({filters : curFilters}, function(){


            self.search(0, self.state.pageSize, curFilters)


        });


    };

    handleDemandSync = () =>{

        startLoading();

        demandSync(function(){

            stopLoading();

            success("同步成功")

        });

    };

    render() {
        const {classes, buildDemandShow, editDemandShow, tableData} = this.props;

        const columns = [
            {name: "序号", options: {filter: false, display: false}},
            {
                name: "需求编号", options: {
                    filter: false, customBodyRender: (value, tableMeta, updateValue) => {
                        if (!value) {
                            return "";
                        }
                        let literal = value.split(",");
                        if(!!literal[1]){
                            let href = "http://172.17.249.10/NewSys/Requirement/External/ReqDetail.aspx?Id=" + literal[1];
                            return (
                                <a href={href} target="new" style={{color:"#121212", textDecoration:"underline"}}>
                                    {literal[0]}
                                </a>
                            );
                        }else{
                            return literal[0];
                        }

                    }
                }
            },
            {name: "需求名称", options: {filter: false,customBodyRender: (value, tableMeta, updateValue) => {
                        if (!value) {
                            return "";
                        }
                        return (
                            <Tooltip title={value} aria-label="">
                                <Typography>{value}</Typography>
                            </Tooltip>
                        )
                    }}},
            {name: "需求负责人", options: {filter: false, display: false}},

            {name: "开发负责人",options: {
                    filter: false,
                    filterType: 'textField',
                    customFilterListRender: v => `需求状态: ${v}`,

                }},
            {name: "关联版本", options:{filter:false,customBodyRender: (value, tableMeta, updateValue) => {
                        if (!value) {
                            return "";
                        }
                        let literal = value.split(",");
                        let ret = {testDate : literal[1], publishDate : literal[2], deliveryDate:literal[3]}
                        if(!!literal[0]) {

                            return (

                                <Tooltip title={<DemandIterationStepper steppers={ret}/>} leaveDelay={500} classes={{tooltip:classes.toolTipIteration}}>
                                    <Chip label={literal[0]} style={{background: "#e0ecfb", borderRadius: "3px", color: "#176fdc"}}/>
                                </Tooltip>
                            )

                        }

                    }}},
            {name: "来源部门", options:{filter:false}},
            {name: "评审通过时间", options:{filter:false}},
            {name: "状态", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        console.log(value);
                        if(value === "评审通过"){
                            return <Tooltip title={value}><CheckIcon style={{paddingTop:"10px",fontSize:"18px", color:"#4DAF7C"}}/></Tooltip>
                        }else if(value === "评审不通过"){
                            return <Tooltip title={value}><CloseIcon  style={{paddingTop:"10px",fontSize:"18px"}}/></Tooltip>
                        }else{
                            return <Tooltip title={value}><CheckIcon  style={{color:"#f5f5f5",paddingTop:"10px",fontSize:"18px"}}/></Tooltip>
                        }

                    }
                }},
            {name: "UAT", options: {
                    filter: false,
                    customFilterListRender: v => `需求状态: ${v}`,
                    filterType: 'dropdown',
                    filterOptions: ['是', '否'],
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value === "是"){
                            return <Tooltip title={value}><CheckIcon style={{paddingTop:"10px",fontSize:"18px", color:"#4DAF7C"}}/></Tooltip>
                        }else{
                            return <Tooltip title={value}><CheckIcon  style={{color:"#f5f5f5",paddingTop:"10px",fontSize:"18px"}}/></Tooltip>
                        }

                    }
                }},
            {name: "BM",options: {
                    filter: false,
                    customFilterListRender: v => `需求状态: ${v}`,
                    filterType: 'dropdown',
                    filterOptions: ['是', '否'],
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value === "是"){
                            return <Tooltip title={value}><CheckIcon style={{paddingTop:"10px",fontSize:"18px", color:"#4DAF7C"}}/></Tooltip>
                        }else{
                            return <Tooltip title={value}><CheckIcon  style={{color:"#f5f5f5",paddingTop:"10px",fontSize:"18px"}}/></Tooltip>
                        }

                    }
                }},
        ];

        const options = {
            print: false,
            sort: false,
            page : this.state.currentPage,
            count: this.state.totalCount,
            serverSide: true,
            filter:false,
            search:false,
            rowsPerPage: this.state.pageSize,
            rowsPerPageOptions: [10, 20, 40],
            selectableRows: "single",
            rowHover:true,
            downloadOptions:{
                filename : "demandList.csv"
            },
            onRowsSelect: function (currentRowsSelected, allRowsSelected) {
                console.log(333);
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
                console.log(selectedRows.data[0].index);
                return (
                    <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} perm={this.state.perm}
                                         setSelectedRows={setSelectedRows} iteration={this.state.iteration}/>)

            },
            customToolbar: () => {
                return (
                    <CustomToolbar4Demand handleAdd={this.openDemand} handleFilter={this.filter} filters={filterChips} handleSync={this.handleDemandSync} perm={this.state.perm}/>
                );
            },
            onChangeRowsPerPage: (numberOfRows) => {


            },
            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                    case 'changePage':
                        this.search(tableState.page, tableState.rowsPerPage, this.state.filters);
                        break;
                    case 'search':
                        this.search(tableState.page, tableState.rowsPerPage, tableState.searchText);
                        break;
                    case 'filterChange' :
                        this.search(tableState.page, tableState.searchText);
                        break;
                    case 'changeRowsPerPage':
                        this.search(tableState.page, tableState.rowsPerPage, this.state.filters);
                        break;
                }
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
                    displayRows: "记录总数：",
                }
            }
        };

        let filterChips = [];
        let filterId = 0;
        for(let key in this.state.filters){
            let label = filterLabel[key].renderValue(this.state.filters[key]);


            filterChips.push(

                <Chip
                    key={++filterId}
                    label={label}
                    onDelete={this.handleDelete.bind(this, key)}
                    className={classes.chip}
                />

            )

        }
        //todo:结果都在这个result里面，选取值去定位这个result里面的数组（被选取的索引值和result里面是保持一致的）
        return (
            <Grid container spacing={16}>

                <Grid item xs={12}>
                    <MuiThemeProvider theme={muiTableTheme}>
                        <MUIDataTable
                            title={!!filterChips && filterChips.length>0 ? filterChips : "需求列表"}
                            data={this.state.assembleTable}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>

                </Grid>
                <BuildDemandMain
                    open={buildDemandShow}
                    iteration={this.state.iteration}
                    projectMembers={this.state.projectMembers}

                />

                <ReviewDemand
                    iteration={this.state.iteration}
                    projectMembers={this.state.projectMembers}

                />

                <EditDemandMain
                    open={editDemandShow}
                    iteration={this.state.iteration}
                    projectMembers={this.state.projectMembers}

                />
                <Filter/>
            </Grid>

        )
    }
}

const
    mapStateToProps = (state) => {

        return {
            demand: state.reducer.task.demand,
            buildDemandShow: state.reducer.buildDemand.buildDemandShow,
            editDemandShow: state.reducer.buildDemand.editDemandShow,
            filterManagerDemandShow: state.reducer.buildDemand.filterManagerDemandShow,
            tableData: state.reducer.buildDemand.addDemand,
            updatedRow: state.reducer.buildDemand.updatedRow,
            action: state.reducer.buildDemand.action,
            filters : state.reducer.buildDemand.filters

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        DemandBoard
    ))
;
