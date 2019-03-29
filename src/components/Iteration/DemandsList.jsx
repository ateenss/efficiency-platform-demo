import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import CustomToolBar4DemandList from '../Iteration/CustomToolBar4DemandList';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({});
/**
 * 业务编号、需求名称、需求状态、需求负责人、开发负责人、需求来源部门、需求评审通过起止时间、是否需UAT
 * @type {*[]}
 */


const columns = [
    {name: "需求编号", options: {filter: false}},
    {name: "需求名称", options: {filter: false}},
    {name: "需求负责人", options: {filter: true}},
    {name: "需求状态", options: {filter: true,customBodyRender:(value,tableMeta, updateValue) => {
                return (
                    <Typography>{value}</Typography>

                )}}},
    {name: "开发负责人", options: {filter: false}},
    {name: "需求来源", options: {filter: false}},
    {name: "评审时间", options: {filter: false}},
    {name: "UAT", options: {filter: false}}, ];

function Empty() {
    return null;
}

const options = {
    filterType: 'checkbox',
    sort:false,
    // search:false,
    // filter:false,
    // download:false,
    // sortFilterList:false,

    viewColumns: false,
    rowsPerPage: 10,
    print: false,
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <CustomToolBar4DemandList selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows}/>
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


class DemandsList extends React.Component {
    state = {

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
                    width: "100px"
                }
            },
        }
    });

    componentDidMount() {
    }

    render() {
        const {classes, data} = this.props;
        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title="需求列表"
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(DemandsList);