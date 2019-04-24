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
    closeBuildDemand,
    openFilterManagerDemand,
    openFilterDeveloperDemand, openFilter
} from "../../actions/DemandAction"
import BuildDemandMain from "../BuildDemand/BuildDemandMain"
import ReviewDemand from "../BuildDemand/ReviewDemand"

import EditDemandMain from "../BuildDemand/EditDemandMain"
import FilterDemandManager from "../BuildDemand/FilterDemandManager"
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {addDemand, init, nextPage, search} from "../../actions/DemandAction";
import {
    ADD_DEMAND,
    CLOSE_DEMAND_FILTER,
    SAVE_ADD_DEMAND,
    SAVE_EDIT_DEMAND,
    SAVE_REVIEW_DEMAND,
    UPDATE_ROW
} from "../../actions/types";
import {startLoading, stopLoading} from "../../actions/CommonAction";
import CustomToolbar4Demand from "../demand/CustomToolbar4Demand";
import {muiTableTheme} from "../common/MuiTableTheme";
import Filter from "../BuildDemand/Filter";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete"
import Chip from "@material-ui/core/Chip";
import {demandConst} from "../BuildDemand/DemandConst";

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
    }
});


const filterLabel = {

    demandName : {
        label : "需求名称",
    },
    demandType : {
        label : "需求类型",
        mapping : demandConst.type
    },
    status : {
        label : "需求评审状态",
        mapping : demandConst.status
    },
    bmRequired:{
        label : "是否涉及bm控制台",
        mapping : demandConst.bmRequired
    },
    uatRequired:{
        label:"是否需要uat",
        mapping : demandConst.uatRequired
    },
    startTime:{
        label : "开始时间",

    },
    endTime:{
        label : "结束时间",
    }

};

let editInitialData = null;

class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNum: 0,
            assembleTable: [],
            currentPage: 1,
            totalCount: 1,
            filters :{}
        };
    }


    componentWillMount() {

        startLoading();
    }


    componentDidMount() {

        let self = this;
        init(1, function (members, iteration) {

            self.setState({iteration: iteration});

            stopLoading();

        });

    }

    /**
     * UrlConf.base + 'iteration/save';
     * @param page
     */
    changePage = (page) => {

        let self = this;

        nextPage(page + 1, function (ret) {

            let result = self.mapObjectToArray(ret.result);

            self.setState({assembleTable: result, pageSize: ret.pageSize, totalCount: ret.totalCount, raw: ret.result, currentPage : page});

        })
    };

    search = (pageNo, searchText) =>{

        let self = this;

        search(pageNo+1, searchText, function(ret){

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

    openFilterManager = () => {
        store.dispatch(openFilterManagerDemand());
    };
    handleClickClose = () => {
        store.dispatch(closeBuildDemand());
    };
    openFilterDeveloper = () => {
        store.dispatch(openFilterDeveloperDemand());
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


        } else if (nextProps.action === SAVE_ADD_DEMAND) {

            let rows = this.state.raw;
            rows.unshift(nextProps.updatedRow);

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw: rows
            })


        } else if(nextProps.action === CLOSE_DEMAND_FILTER){
            let self = this;

            this.setState({filters : nextProps.filters}, function(){

                self.search(0, nextProps.filters)

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


            self.search(0, curFilters)


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
            {name: "需求名称", options: {filter: false}},
            {name: "需求负责人", options: {filter: false, display: false}},
            {name: "需求状态", options: {
                    filter: false
                }},
            {name: "开发负责人",options: {
                    filter: false,
                    filterType: 'textField',
                    customFilterListRender: v => `需求状态: ${v}`,

                }},
            {name: "关联版本", options:{filter:false}},
            {name: "需求来源部门", options:{filter:false}},
            {name: "需求评审通过时间", options:{filter:false}},
            {name: "是否需UAT", options: {
                    filter: false,
                    customFilterListRender: v => `需求状态: ${v}`,
                    filterType: 'dropdown',
                    filterOptions: ['是', '否']

                }},
            {name: "是否涉及BM",options: {
                    filter: false,
                    customFilterListRender: v => `需求状态: ${v}`,
                    filterType: 'dropdown',
                    filterOptions: ['是', '否']

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
            rowsPerPageOptions: [this.state.pageSize],
            onRowsSelect: function (currentRowsSelected, allRowsSelected) {
                console.log(333);
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
                console.log(selectedRows.data[0].index);
                return (
                    <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData}
                                         setSelectedRows={setSelectedRows} iteration={this.state.iteration}/>)

            },
            customToolbar: () => {
                return (
                    <CustomToolbar4Demand handleAdd={this.openDemand} handleFilter={this.filter} filters={filterChips}/>
                );
            },
            onChangeRowsPerPage: (numberOfRows) => {


            },
            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                    case 'changePage':
                        this.search(tableState.page, this.state.filters);
                        break;
                    case 'search':
                        this.search(tableState.page, tableState.searchText);
                        break;
                    case 'filterChange' :
                        this.search(tableState.page, tableState.searchText);
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
                    displayRows: "总页数",
                }
            }
        };

        let filterChips = [];
        let filterId = 0;
        for(let key in this.state.filters){
            let label = filterLabel[key].label + " : " +this.state.filters[key];
            if(!!filterLabel[key] && !!filterLabel[key].mapping){

                for(let k in filterLabel[key].mapping){

                    if(filterLabel[key].mapping[k].id === this.state.filters[key]){
                        label = filterLabel[key].label +":"+ filterLabel[key].mapping[k].name;
                    }
                }

            }

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

                {/*<Grid item xs={12}>*/}
                    {/*<AppBar className={classes.toolbar} position="static" color="default">*/}
                        {/*<Grid container spacing={0}>*/}
                            {/*{filterChips}*/}
                        {/*</Grid>*/}

                    {/*</AppBar>*/}
                {/*</Grid>*/}


                <Grid item xs={12}>
                    <MuiThemeProvider theme={muiTableTheme}>
                        <MUIDataTable
                            title={filterChips}
                            data={this.state.assembleTable}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>

                </Grid>
                <BuildDemandMain
                    open={buildDemandShow}
                    iteration={this.state.iteration}
                />

                <ReviewDemand
                    iteration={this.state.iteration}
                />

                <EditDemandMain
                    open={editDemandShow}
                    iteration={this.state.iteration}
                />
                <FilterDemandManager iteration={this.state.iteration}/>
                {/*<FilterDemandDeveloper/>*/}
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
            initialTable: state.reducer.buildDemand.initialData.dataMuiTable,
            updatedRow: state.reducer.buildDemand.updatedRow,
            action: state.reducer.buildDemand.action,
            projectMembers: state.reducer.common.projectMembers,
            filters : state.reducer.buildDemand.filters

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
