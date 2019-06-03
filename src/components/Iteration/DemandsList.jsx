import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CustomToolBar4DemandList from '../Iteration/CustomToolBar4DemandList';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {muiTableTheme} from "../common/MuiTableTheme";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/CheckCircle"
import DownloadIcon from "@material-ui/icons/CloudDownload"
import IconButton from "@material-ui/core/IconButton";
import {getDownloadLink} from "../../actions/IterationAction";
import {error} from "../../actions/NotificationAction";
const styles = theme => ({});
/**
 * 业务编号、需求名称、需求状态、需求负责人、开发负责人、需求来源部门、需求评审通过起止时间、是否需UAT
 * @type {*[]}
 */

// ["2019-04-00004", "234", "周之豪", 1, "评审通过", "周之豪", 1, null, null, "否"]
const columns = [
    {name: "id", options: {filter: false,display:false}},
    {name: "需求编号", options: {filter: false}},
    {name: "需求名称", options: {filter: false}},
    {name: "需求负责人", options: {filter: true,display:false}},
    {name: "负责人ID", options: {display: false}},
    {name: "需求状态",options: {filter: false, display:false}},
    {name: "开发负责人", options: {filter: true}},
    {name: "开发负责人", options: {filter: false, display: false}},
    {name: "需求来源", options: {filter: false}},
    {name: "评审时间", options: {filter: false}},
    {name: "UAT", options: {filter: false,customBodyRender: (value, tableMeta, updateValue) => {
                if(value === "是"){
                    return <CheckIcon style={{paddingTop:"10px",fontSize:"18px"}}/>
                }else{
                    return <CheckIcon  style={{color:"#f5f5f5",paddingTop:"10px",fontSize:"18px"}}/>
                }

            }}},
    {name: "BM", options: {filter: false,customBodyRender: (value, tableMeta, updateValue) => {
                if(value === "是"){
                    return <CheckIcon style={{paddingTop:"10px",fontSize:"18px",color: "#4DAF7C",}}/>
                }else{
                    return <CheckIcon  style={{color:"#f5f5f5",paddingTop:"10px",fontSize:"18px"}}/>
                }

            }}},
    {name: "需求任务状态", options: {display:true,filter:false,customBodyRender: (value, tableMeta, updateValue) => {
                        // console.log("我就是来看看1",JSON.stringify(value));
                const showArray = [];
                const taskPlanApproved = parseInt(value.substring(0, 1));
                showArray.push(taskPlanApproved);
                const testCaseApproved = parseInt(value.substring(1, 2));
                showArray.push(testCaseApproved);
                const completedDevDoc = parseInt(value.substring(3, 4));
                showArray.push(completedDevDoc);
                const completedDeliveryDoc = parseInt(value.substring(2, 3));
                showArray.push(completedDeliveryDoc);

                const titleSuccess=["开发方案通过","上线检查表通过","完成开发方案","完成上线检查表"];
                const titleFail=["开发方案未通过","上线检查表未通过","未完成开发方案","未完成上线检查表"];

                return (
                    showArray.map((item, index) => {
                        let successTitle="";
                        let failTitle="";
                        for(let i=0;i< titleSuccess.length;i++){
                            if (i===index) {successTitle=titleSuccess[i]}
                        }
                        for(let j=0;j<titleFail.length;j++){
                            if (j===index){failTitle=titleFail[j]}
                        }
                        return (item === 1 ? (<Tooltip key={index} title={successTitle}><CheckIcon
                                style={{paddingTop: "10px", fontSize: "18px", color: "#4DAF7C",paddingRight:"6px"}}/></Tooltip>) :
                            (<Tooltip  key={index} title={failTitle}><CheckIcon
                                style={{color: "#f5f5f5", paddingTop: "10px", fontSize: "18px",paddingRight:"6px"}}/></Tooltip>))
                    })
                )


            }
        }
    }];

function Empty() {
    return null;
}



class DemandsList extends React.Component {
    state = {};

    componentDidMount() {
    }

    handleDownload = () =>{

        let iterationId = this.props.iterationId;
        if(!iterationId){
            return false;
        }

        getDownloadLink(iterationId).then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            const aLink = document.createElement('a');
            document.body.appendChild(aLink);
            aLink.style.display='none';
            aLink.href = response.data.data;
            aLink.target = "_new";
            aLink.click();


        }).catch(e => {
                error("后台拉取数据失败",JSON.stringify(e));

        });


    }

    render() {
        const {classes, data} = this.props;

        const options = {
            filterType: 'checkbox',
            sort: false,
            search:false,
            filter:true,
            download:false,
            sortFilterList:false,

            viewColumns: false,
            rowsPerPage: 10,
            print: false,
            selectableRows: "single",
            onRowsSelect: function (currentRowsSelected, allRowsSelected) {
                console.log(333);
            },
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                <CustomToolBar4DemandList selectedRows={selectedRows} displayData={displayData} perm={this.props.perm}
                                          setSelectedRows={setSelectedRows}/>
            ),
            customToolbar: () => {
                return (
                    <React.Fragment>
                        <Tooltip title={"下载上线案例"}>
                            <IconButton className={classes.iconButton} onClick={this.handleDownload}>
                                <DownloadIcon className={classes.icon}/>
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
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
                    displayRows: "记录总数",
                }
            }
        };
        return (
            <MuiThemeProvider theme={muiTableTheme}>
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(DemandsList);