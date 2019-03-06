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
import store from "../../stores";
import {SHOW_NOTIFICATION} from "../../actions/types";
import {saveTask} from "../../actions/DemandTasksAction";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


const columns = [{name:"序号", options:{filter:false}}, {name:"需求编号", options:{filter:false}}, {name:"需求名称", options:{filter:false}}, {name:"需求负责人", options:{filter:true}}, {name:"需求状态", options:{filter:true}}];

const data = [
    ["1", "YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞", "开发中"],
    ["2", "TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝", "已完成"],
    ["3", "YDZF-201809-15", "你说这是什么需求", "张无忌", "提测"],
    ["4", "YDZF-201809-16", "楼上，你在问我吗？", "周芷若", "未开始"],
];

const options = {
    filterType: 'checkbox',
    print: false,
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
    ),
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

class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes} = this.props;


        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                        <MUIDataTable
                            title={"需求列表"}
                            data={data}
                            columns={columns}
                            options={options}
                        />

                </Grid>
            </Grid>
        )
    }
}


// 从store里面取数据给组件
const
    mapStateToProps = (state) => {
        console.log("!!!!!!!!" + JSON.stringify(state.reducer.task.demand));
        return {
            demand: state.reducer.task.demand
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
