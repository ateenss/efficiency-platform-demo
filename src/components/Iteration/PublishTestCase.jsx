import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import CustomToolBar4DemandList from '../Iteration/CustomToolBar4DemandList';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const styles = theme => ({});

const columns = [
    {name: "需求ID", options: {filter: false}},
    {name: "需求名称", options: {filter: false}},
    {name: "开发负责人", options: {filter: true}},
    {name: "检查方", options: {filter: true}},
    {name: "检查时间", options: {filter: false}},
    {name: "检查项", options: {filter: false}},
    {name: "步骤或命令", options: {filter: false}},
    {name: "预期结果", options: {filter: false}},
    {name: "实际检查结果", options: {filter: false}},
    {name: "执行状态", options: {filter: false}},];

function Empty() {
    return null;
}

const options = {
    filterType: 'checkbox',
    sort:false,
    search:false,
    filter:false,
    download:false,
    sortFilterList:false,

    viewColumns: false,
    rowsPerPage: 10,
    isRowSelectable:function(dataIndex){
        return false;
    },
    print: false,
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    // customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
    //     <CustomToolBar4DemandList selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
    // ),
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


class PublishTestCase extends React.Component {
    state = {

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

    componentDidMount() {
    }

    render() {
        const {classes, content} = this.props;
        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title=""
                    data={content}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(PublishTestCase);