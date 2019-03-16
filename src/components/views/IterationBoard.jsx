import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IterationList from "../Iteration/IterationList";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from '../demand/CustomToolBarSelect';
import Badge from "./TaskBoard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {selectIteration, addIteration} from "../../actions/IterationAction";
import BuildDemandMain from "./DemandBoard";
import AddIteration from "../Iteration/AddIteration";
import {SAVE_ADD_ITERATION} from "../../actions/types";

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: "50px"
    },
    toolbarHead: {
        backgroundColor: "#FFFFFF",
        boxShadow: "none"
    }
});


const columns = [{name: "序号", options: {filter: false}}, {name: "需求编号", options: {filter: false}}, {
    name: "需求名称",
    options: {filter: false}
}, {name: "需求负责人", options: {filter: true}}, {name: "需求状态", options: {filter: true}}];

function Empty() {
    return null;
}

const options = {
    filterType: 'checkbox',
    // sort:false,
    // search:false,
    // filter:false,
    // download:false,
    // sortFilterList:false,
    viewColumns: false,
    rowsPerPage:10,
    print: false,
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
    ),
    customToolbar: () => {
        return (
            <Empty/>
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
            displayRows: "展示行数",
        }
    }
};

const iterations = [
    {
        iteration: "48",
        children: [
            "48.1", "48.2", "48.3"
        ]
    },
    {
        iteration: "47",
        children: [
            "47.1", "47.2"
        ]
    }


];

class IterationBoard extends React.Component {
    state = {
        open: false,
    };
    getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiPaper: {
                root: {
                    boxShadow: "none !important"
                }
            }
        }
    });

    handleAdd = () => {
        console.log("add iteration");
        addIteration();

    };
    handleEdit = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        addIteration(id);
        console.log("edit iteration");

    };
    handleSelected = (id) => {
        console.log(id);
        // dispatch一个ID过去，获取该版本下的所有需求，然后选中
        selectIteration(id);
    };


    componentWillMount() {


    }

    componentDidMount() {
        this.setState({iterationOwner: this.props.iterationOwner, testDate:this.props.testDate, publishDate:this.props.publishDate, deliveryDate:this.props.deliveryDate, demandList: this.props.demandList});
        let iterationState = [];
        for (let i in iterations) {
            let iter = iterations[i];
            let parent = {};
            let iterationChildren = [];
            for (let j in iter.children) {
                let selected = false;
                if (i == 0 && j == 0) {
                    selected = true;
                }
                iterationChildren.push({iter: iter.children[j], selected: selected});
            }
            parent.children = iterationChildren;
            parent.iteration = {name: iter.iteration, selected: false};
            iterationState.push(parent);
        }
        console.log(JSON.stringify(iterationState));
        this.setState({iterationState: iterationState});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps.iteration);

        let iterationState = JSON.parse(JSON.stringify(this.state.iterationState));
        // 这里会返回新建后的版本号，这个版本号需要有一定的归类
        if (nextProps.action === SAVE_ADD_ITERATION) {
            let newIteration = nextProps.iterationName.split(".");
            let needNew = true;
            for (let i in iterationState) {
                if (iterationState[i].iteration.name === newIteration[0]) {
                    let unit = {
                        iter: nextProps.iterationName,
                        selected: false
                    }
                    iterationState[i].children.push(unit);
                    needNew = false;
                }
            }
            if (needNew) {
                let newIteration = nextProps.iterationName.split(".")[0];
                let ret = {
                    iteration: {name : newIteration, selected : true},
                    children: [
                        {
                            iter: nextProps.iterationName,
                            selected: false
                        }

                    ]
                };
                iterationState.push(ret);
            }
        }

        for (let i in iterationState) {
            let iter = iterationState[i];
            for (let j in iter.children) {
                if (iter.children[j].iter === nextProps.iterationName) {
                    iter.children[j].selected = true;
                } else {
                    iter.children[j].selected = false;
                }
            }
        }
        this.setState({iterationState: iterationState});

    }

    render() {
        const {classes, theme, openAddIteration, initialData} = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={2}>
                    <IterationList iterations={this.state.iterationState} handleAdd={this.handleAdd}
                                   handleEdit={this.handleEdit} handleSelected={this.handleSelected}/>
                </Grid>
                <Grid item xs={10}>
                    <Paper style={{padding: "10px"}}>
                        <AppBar className={classes.header} position="static" className={classes.toolbarHead}
                                style={{marginBottom: "10px"}}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Toolbar variant="regular" className={classes.toolbar}>
                                        <Typography>负责人：{this.state.iterationOwner}</Typography>
                                        <Typography>提测时间：{this.state.testDate}</Typography>
                                        <Typography>发布时间：{this.state.publishDate}</Typography>
                                        <Typography>上线时间：{this.state.deliveryDate}</Typography>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </AppBar>
                        <Divider/>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={<Typography variant="title">需求列表</Typography>}
                                data={this.state.demandList}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>
                    </Paper>

                </Grid>
                <AddIteration
                    open={this.props.openAddIteration}
                    onClose={this.handleClickClose}
                    randomNum={this.state.randomNum}
                />
            </Grid>

        );
    }
}


IterationBoard.defaultProps = {


    iterationOwner: "周伯通",
    testDate : "2019/03/15",
    publishDate:"2019/04/15",
    deliveryDate:"2019/05/15",
    demandList: [
        ["1", "YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞", "开发中"],
        ["2", "TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝", "已完成"],
        ["3", "YDZF-201809-15", "你说这是什么需求", "张无忌", "提测"],
        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],
        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],

        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],
        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],

        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],

        ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],


    ]
}


IterationBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


// 从store里面取数据给组件
/**
 * iteration : 管理所有的组件
 * @param state
 * @returns {*}
 */
const
    mapStateToProps = (state) => {
        console.log("!!!!!!!!" + JSON.stringify(state.reducer.iteration));
        if (!state.reducer.iteration.iteration) {
            return {
                openAddIteration: state.reducer.iteration.openAddIteration,
                iterationName: state.reducer.iteration.iterationName,
                action: state.reducer.iteration.action
            };
        }
        return {
            cmd: state.reducer.iteration.iteration.cmd,
            iteration: state.reducer.iteration.iteration.iterationList,
            iterationName: state.reducer.iteration.iteration.iterationName,
            openAddIteration: state.reducer.iteration.openAddIteration,
            action: state.reducer.iteration.action

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationBoard
    ))
;

