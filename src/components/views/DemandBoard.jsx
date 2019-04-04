/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid'
import CustomToolbarSelect from '../demand/CustomToolBarSelect';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import MUIDataTable from "mui-datatables";
// import store from "../../stores";
import red from '@material-ui/core/colors/red';
import store from '../../stores/index';
import {
    closeBuildDemand,
    openBuildDemand,
    openFilterManagerDemand,
    openFilterDeveloperDemand
} from "../../actions/DemandAction"
import BuildDemandMain from "../BuildDemand/BuildDemandMain"
import ReviewDemand from "../BuildDemand/ReviewDemand"

import EditDemandMain from "../BuildDemand/EditDemandMain"
import FilterDemandManager from "../BuildDemand/FilterDemandManager"
import FilterDemandDeveloper from "../BuildDemand/FilterDemandDeveloper"
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {addDemand, getRecentIteration, init, nextPage} from "../../actions/DemandAction";
import {ADD_DEMAND, SAVE_ADD_DEMAND, SAVE_EDIT_DEMAND, SAVE_REVIEW_DEMAND, UPDATE_ROW} from "../../actions/types";

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

});


const columns = [
    {name: "序号", options: {filter: false, display:false}},
    {name: "需求编号", options: {filter: false}},
    {name: "需求名称", options: {filter: false}},
    {name: "需求负责人", options: {filter: false}},
    {name: "需求状态", options: {filter: false}},
    {name: "开发负责人"},
    {name: "关联版本"},
    {name: "需求来源部门"},
    {name: "需求评审通过起止时间"},
    {name: "是否需UAT"}
];


let editInitialData = null;

class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        // pullBuildDemandInitial();
        this.state = {
            randomNum: 0,
            assembleTable: [],
            currentPage : 1,
            totalPages : 1
        };
    }

    componentDidMount() {

        let self = this;
        init(1, function (demands, members, iteration) {


            let result = self.mapObjectToArray(demands.result, members);

            self.setState({assembleTable: result, pageSize : demands.pageSize, totalPages : demands.totalPages, raw : demands.result});

            self.setState({iteration : iteration});

        });

    }

    /**
     * 'http://127.0.0.1:8080/tiger-admin/iteration/save';
     * @param page
     */
    changePage = (page) => {

        let self = this;

        nextPage(page+1,function(ret){

            let result = self.mapObjectToArray(ret.result);

            self.setState({assembleTable: result, pageSize : ret.pageSize, totalPages : ret.totalPages, raw : ret.result});

        })
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

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.action === UPDATE_ROW){

            let rows = this.state.raw;
            for(let i in rows){
                let unit = rows[i];
                if(unit.id === nextProps.updatedRow.id){
                    unit.iterationName = nextProps.updatedRow.iterationName;
                    break;
                }
            }

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw : rows
            })

        }else if(nextProps.action === SAVE_EDIT_DEMAND || nextProps.action === SAVE_REVIEW_DEMAND){
            let rows = this.state.raw;
            for(let i in rows){
                let unit = rows[i];
                if(unit.id === nextProps.updatedRow.id){
                    rows[i] = nextProps.updatedRow;
                    break;
                }
            }

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw : rows
            })


        }else if(nextProps.action === SAVE_ADD_DEMAND){

            let rows = this.state.raw;
            rows.unshift(nextProps.updatedRow);

            this.setState({
                assembleTable: this.mapObjectToArray(rows),
                raw : rows
            })




        }



    }



    render() {
        const {classes, buildDemandShow, editDemandShow, tableData} = this.props;
        const options = {
            filterType: 'checkbox',
            print: false,
            sort: false,
            count : this.state.totalPages,
            serverSide: true,
            rowsPerPage : this.state.pageSize,
            rowsPerPageOptions: [this.state.pageSize],
            onRowsSelect: function (currentRowsSelected, allRowsSelected) {
                console.log(333);
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
                console.log("这是被选中的行");
                console.log(selectedRows.data[0].index);
                return (
                    <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData}
                                         setSelectedRows={setSelectedRows} iteration={this.state.iteration}/>)

            },
            onChangeRowsPerPage:(numberOfRows)=>{


            },
            onTableChange: (action, tableState) => {
                console.log(action, tableState);
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
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
        //todo:结果都在这个result里面，选取值去定位这个result里面的数组（被选取的索引值和result里面是保持一致的）
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <AppBar position="static" color="default" className={classes.head} style={{boxShadow: "none"}}>
                            <Toolbar>
                                <Typography variant="h6" color="inherit">
                                    筛选
                                </Typography>
                                <Button color="inherit" className={classes.newBuildButton}
                                        onClick={this.openDemand}><Avatar className={classes.avatar}><AddIcon/></Avatar></Button>
                                <Button color="inherit" className={classes.newBuildButton}
                                        onClick={this.openFilterManager}><Avatar
                                    className={classes.orangeAvatar}><SearchIcon/></Avatar></Button>
                                <Button color="inherit" className={classes.newBuildButton}
                                        onClick={this.openFilterDeveloper}><Avatar
                                    className={classes.purpleAvatar}><SearchIcon/></Avatar></Button>
                            </Toolbar>
                        </AppBar>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"需求列表"}
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
                <FilterDemandManager/>
                <FilterDemandDeveloper/>
            </Grid>

        )
    }
}

const
    mapStateToProps = (state) => {
        console.log("!!!!!!!!" + JSON.stringify(state.reducer.buildDemand.updatedRow));
        return {
            demand: state.reducer.task.demand,
            buildDemandShow: state.reducer.buildDemand.buildDemandShow,
            editDemandShow: state.reducer.buildDemand.editDemandShow,
            filterManagerDemandShow: state.reducer.buildDemand.filterManagerDemandShow,
            tableData: state.reducer.buildDemand.addDemand,
            initialTable: state.reducer.buildDemand.initialData.dataMuiTable,
            updatedRow : state.reducer.buildDemand.updatedRow,
            action:state.reducer.buildDemand.action,
            projectMembers : state.reducer.common.projectMembers,
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
