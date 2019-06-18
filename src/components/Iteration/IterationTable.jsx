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
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {
    CLOSE_ITERATION_FILTER,
} from "../../actions/types";
import {muiTableTheme} from "../common/MuiTableTheme";
import Chip from "@material-ui/core/Chip";
import {iterationConst} from "./IterationConst";
import IterationFilter from "./IterationFilter";
import CustomToolbar4IterationList from "./CustomToolbar4IterationList";
import {openFilter, search, nextPage} from "../../actions/IterationAction";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import DetailTable from "./DetailTable";
import CheckIcon from "./DemandsList";

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

    iterationCode : {
        label : "版本编号",
        renderValue : function(data){
            return this.label + ":" + data;;
        }
    },
    iterationName : {
        label : "版本名称",
        renderValue : function(data){

            let label = this.label + ":" + data;

            for(let k in iterationConst.type){

                if(iterationConst.type[k].id === data){
                    label = this.label +":"+ iterationConst.type[k].name;
                }
            }

            return label;


        }
    },
    testDate: {
        label: "提测时间",
        renderValue: function (data) {

            return this.label + ":" + data.from + "-" + data.to;


        }
    },
    publishDate : {
        label :"发布时间",
        renderValue : function(data){
            return this.label + ":" + data.from + "-" + data.to;
        }
    },
    greyDate : {
        label :"灰度时间",
        renderValue : function(data){
            return this.label + ":" + data.from + "-" + data.to;
        }
    },
    deliveryDate : {
        label :"上线时间",
        renderValue : function(data){
            return this.label + ":" + data.from + "-" + data.to;
        }
    },
    plateformCode : {
        label :"变更号",
        renderValue : function(data){
            return this.label + ":" + data;
        }
    },
    ongoingIteration:{
        label :"未规划版本",
        renderValue : function(data){
            return this.label;
        }
    }

};

let editInitialData = null;

function EmptyFooter() {
    return (
        <TableFooter style={{display:"none"}}>
            <TableRow>
                <TableCell>
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}

function EmptyHeader() {
    return (
        <div style={{display:"none"}}>

        </div>
    );
}

class IterationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNum: 0,
            assembleTable: [],
            currentPage: 1,
            totalCount: 1,
            pageSize:20,
            filters :{}
        };
    }


    componentWillMount() {

        // startLoading();
    }


    componentDidMount() {

        this.search(0, this.state.pageSize);

    }

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

        if(nextProps.action === CLOSE_ITERATION_FILTER){
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



    render() {
        const {classes} = this.props;

        const columns = [
            {name:"序号",options:{filter:false,display:false}},
            {name:"版本编号",options:{filter:false,display:true,customBodyRender: (value, tableMeta, updateValue) => {
                        return <Chip label={value} onClick={this.props.handleSelection.bind(this, tableMeta.rowData[0])} style={{background: "#e0ecfb", borderRadius: "3px", color: "#176fdc"}}/>
                    }}},
            {name:"版本名称",options:{filter:false,display:true}},
            {name:"版本负责人",options:{filter:false,display:true}},
            {name:"iterationOwnerId",options:{filter:false,display:false}},
            {name:"提测时间",options:{filter:false,display:true}},
            {name:"发布时间",options:{filter:false,display:true}},
            {name:"上线时间",options:{filter:false,display:true}},
            {name:"开发方案提交时间",options:{filter:false,display:false, children:true}},
            {name:"走查时间",options:{filter:false,display:false, children:true}},
            {name:"持续集成时间",options:{filter:false,display:false, children:true}},
            {name:"bugzillaId",options:{filter:false,display:false, children:true}},
            {name:"上线负责人",options:{filter:false,display:false, children:true}},
            {name:"deliveryPersonInChargeId",options:{filter:false,display:false}},
            {name:"变更号",options:{filter:false,display:false, children:true}},
            {name:"relatedIterationId",options:{filter:false,display:false, children:false}},
            {name:"关联版本",options:{filter:false,display:true, children:false}},
            {name:"上线人员",options:{filter:false,display:false, children:true, dataType:"array"}},
            {name:"上线检查人员",options:{filter:false,display:false, children:true, dataType:"array"}},
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
            rowsPerPageOptions: [10,20,40],
            expandableRows:true,
            selectableRows: "none",
            renderExpandableRow: (rowData, rowMeta) => {
                const colSpan = rowData.length + 1;
                console.log(JSON.stringify(rowData));
                return (<TableRow style={{background:"#F5f5f5"}}>
                            <TableCell colSpan={colSpan} >
                                <Grid container spacing={8}  style={{background:"#F5f5f5"}}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={11}>
                                        <DetailTable columns={columns} rowData={rowData}/>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>)

            },
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
                    <CustomToolbar4IterationList handleAdd={this.openDemand} handleFilter={this.filter} filters={filterChips}/>
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
                        this.search(tableState.page, tableState.rowsPerPage, tableState.searchText);
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
                    displayRows: "总页数",
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
                    {this.state.totalCount === 1 ? "" :
                    <MuiThemeProvider theme={muiTableTheme}>
                        <MUIDataTable
                            title={!!filterChips && filterChips.length>0 ? filterChips : "版本列表"}
                            data={this.state.assembleTable}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                    }
                </Grid>

                <IterationFilter/>
            </Grid>

        )
    }
}

const
    mapStateToProps = (state) => {

        return {
            action: state.reducer.iteration.action,
            filters : state.reducer.iteration.filters

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationList
    ))
;
