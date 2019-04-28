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
    {name: "案例描述", options: {filter: false}},
    {name: "前置条件", options: {filter: false}},
    {name: "测试环境描述", options: {filter: true}},
    {name: "涉及子系统", options: {filter: true}},
    {name: "输入", options: {filter: false}},
    {name: "测试步骤", options: {filter: false}},
    {name: "预期结果", options: {filter: false}},
    {name: "实际结果", options: {filter: false}}, ];

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
    selectableRows: "single",
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


class TestCase extends React.Component {
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


export default withStyles(styles)(TestCase);