import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import CustomToolBar4DemandList from '../Iteration/CustomToolBar4DemandList';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CustomToolbarSelect from "../views/DemandBoard";

const styles = theme => ({});
/**
 * 业务编号、需求名称、需求状态、需求负责人、开发负责人、需求来源部门、需求评审通过起止时间、是否需UAT
 * @type {*[]}
 */



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
function Empty() {
    return null;
}

const options = {
    filterType: 'checkbox',
    print: false,
    sort: false,
    selectableRows: "single",
    onRowsSelect: function (currentRowsSelected, allRowsSelected) {
        console.log(333);
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
        console.log("这是被选中的行");
        console.log(selectedRows.data[0].index);
        selectedValue = selectedRows.data[0].index;
        return (
            <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData}
                                 setSelectedRows={setSelectedRows}/>)

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
            displayRows: "展示行数",
        }
    }
};

let selectedValue = 0;

class DemandTable extends React.Component {
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
                    width: "600px"
                }
            },
            /*MUIDataTableHeadCell: {
                root: {
                    '&:nth-child(2)': {
                        width: "500px"
                    }
                }
            }*/
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


export default withStyles(styles)(DemandTable);