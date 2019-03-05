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

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: "50px"
    },
    toolbarHead: {
        backgroundColor: "#FFFFFF",
        boxShadow:"none"
    }
});


const columns = [{name: "序号", options: {filter: false}}, {name: "需求编号", options: {filter: false}}, {
    name: "需求名称",
    options: {filter: false}
}, {name: "需求负责人", options: {filter: true}}, {name: "需求状态", options: {filter: true}}];

const data = [
    ["1", "YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞", "开发中"],
    ["2", "TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝", "已完成"],
    ["3", "YDZF-201809-15", "你说这是什么需求", "张无忌", "提测"],
    ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],
];


function Empty(){
    return null;
}

const options = {
    filterType: 'checkbox',
    // sort:false,
    // search:false,
    // filter:false,
    // download:false,
    // sortFilterList:false,
    viewColumns:false,
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
    })

    render() {
        const {classes, theme} = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={2}>
                    <IterationList/>
                </Grid>
                <Grid item xs={10}>
                    <Paper style={{padding: "10px"}}>
                        <AppBar className={classes.header} position="static" className={classes.toolbarHead}
                                style={{marginBottom: "10px"}}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Toolbar variant="regular" className={classes.toolbar}>
                                        <Typography>负责人：周伯通</Typography>
                                        <Typography>提测时间：2019-12-12</Typography>
                                        <Typography>发布时间：2019-12-12</Typography>
                                        <Typography>上线时间：2019-12-12</Typography>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </AppBar>
                        <Divider/>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={<Typography variant="h6">需求列表</Typography>}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>
                    </Paper>

                </Grid>
            </Grid>

        );
    }
}

IterationBoard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(IterationBoard);