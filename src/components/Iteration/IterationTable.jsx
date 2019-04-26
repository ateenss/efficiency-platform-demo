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
    ADD_DEMAND,
    CLOSE_DEMAND_FILTER, CLOSE_ITERATION_FILTER,
    SAVE_ADD_DEMAND,
    SAVE_EDIT_DEMAND,
    SAVE_REVIEW_DEMAND,
    UPDATE_ROW
} from "../../actions/types";
import {startLoading, stopLoading} from "../../actions/CommonAction";
import {muiTableTheme} from "../common/MuiTableTheme";
import Chip from "@material-ui/core/Chip";
import {iterationConst} from "./IterationConst";
import IterationFilter from "./IterationFilter";
import CustomToolbar4IterationList from "./CustomToolbar4IterationList";
import {openFilter, search, nextPage} from "../../actions/IterationAction";

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
    },
    iterationName : {
        label : "版本名称",
        mapping : iterationConst.type
    }

};

let editInitialData = null;

class IterationList extends React.Component {
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

        // startLoading();
    }


    componentDidMount() {

        this.search(0)

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
        const {classes} = this.props;

        const columns = [
            {name:"序号",options:{filter:false,display:false}},
            {name:"版本编号",options:{filter:false,display:true}},
            {name:"版本名称",options:{filter:false,display:true}},
            {name:"版本负责人",options:{filter:false,display:true}},
            {name:"iterationOwnerId",options:{filter:false,display:false}},
            {name:"提测时间",options:{filter:false,display:true}},
            {name:"发布时间",options:{filter:false,display:true}},
            {name:"上线时间",options:{filter:false,display:true}},
            {name:"developPlanSubmitDate",options:{filter:false,display:false}},
            {name:"codeReviewDate",options:{filter:false,display:false}},
            {name:"ciDate",options:{filter:false,display:false}},
            {name:"bugzillaId",options:{filter:false,display:false}},
            {name:"deliveryPersonInCharge",options:{filter:false,display:false}},
            {name:"deliveryPersonInChargeId",options:{filter:false,display:false}},
            {name:"plateformCode",options:{filter:false,display:false}},
            {name:"deliveryPersons",options:{filter:false,display:false}},
            {name:"deliveryCheckers",options:{filter:false,display:false}},
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
                    <CustomToolbar4IterationList handleAdd={this.openDemand} handleFilter={this.filter} filters={filterChips}/>
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
