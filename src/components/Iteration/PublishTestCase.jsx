import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CustomToolBarSelect4DeliveryDoc from "../BuildMission/TestCaseEditor";
import {connect} from "react-redux";
import {GET_PUBLISH_TEST_CASE, } from "../../actions/types";

const styles = theme => ({});


const columns = [
    {name: "序号", options: {filter: false, display:false}},
    {name: "检查方", options: {filter: false}},
    {name: "检查时间", options: {filter: false}},
    {name: "检查项", options: {filter: false}},
    {name: "步骤", options: {filter: false}},
    {name: "是否具备灰度", options: {filter: false}},

    {name: "预期结果", options: {filter: false}},
    {name: "实际结果", options: {filter: false}},
    {name: "需求Id", options: {filter: false,display:false}},
    {name: "任务Id", options: {filter: false,display:false}},

];
function Empty() {
    return null;
}

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

        const options = {
            filterType: 'checkbox',
            print: false,
            sort: false,
            selectableRows: "single",
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
                console.log("这是被选中的行");
                console.log(selectedRows.data[0].index);
                return (
                    <CustomToolBarSelect4DeliveryDoc selectedRows={selectedRows} displayData={displayData}
                                                     setSelectedRows={setSelectedRows}/>)

            },
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
                    displayRows: "总页数",
                }
            }
        };

        return (
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        data={content}
                        columns={columns}
                        options={options}
                    />
                </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(PublishTestCase);