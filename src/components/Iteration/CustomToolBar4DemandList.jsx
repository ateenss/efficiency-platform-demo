import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PageIcon from "@material-ui/icons/Pages";
import {withStyles} from "@material-ui/core/styles";
import {changeTaskStatus, editDemand, editTask} from "../../actions/DemandTasksAction";
import DemandGuihuaIcon from "@material-ui/icons/Receipt"
import SimpleListMenu from "../common/SimpleListMenu";
import store from '../../stores/index';
import {openEditDemand} from "../../actions/DemandAction"
import {getDevelopPlan, getPublishDocuments} from "../../actions/IterationAction";
import {GET_PUBLISH_TEST_CASE,SAVE_KEY} from "../../actions/types";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
        transform: "translateY(-50%)",
    },
    icon: {
        color: "#000",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};


class CustomToolBar4DemandList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: {}
        }
    }


    handleClickInverseSelection = () => {
        const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
            if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
                nextSelectedRows.push(index);
            }

            return nextSelectedRows;
        }, []);

        this.props.setSelectedRows(nextSelectedRows);
    };

    handleClickDeselectAll = () => {
    };

    /***
     * {
	"selectedRows": {
		"lookup": {
			"0": true
		},
		"data": [{
			"index": 0,
			"dataIndex": 0
		}]
	},
	"displayData": [{
		"data": ["YDZF-201809-12", "快速收款码需求这个需求很厉害", "张飞", "开发中", "Jack", "云闪付", "2019-03-13", "是"],
		"dataIndex": 0
	}, {
		"data": ["TYDZF-201809-13", "ApplePayOnweb需求", "韦小宝", "已完成", "Jack", "云闪付", "2019-03-13", "是"],
		"dataIndex": 1
	],
	"classes": {
		"iconButton": "CustomToolBar4DemandList-iconButton-873",
		"icon": "CustomToolBar4DemandList-icon-874",
		"inverseIcon": "CustomToolBar4DemandList-inverseIcon-875"
	}
}
     */
    handlePlan = () => {
        let key = this.getDemand();
        store.dispatch({
            type: SAVE_KEY,
            payload: key
        });
        getDevelopPlan(key);
        console.log(JSON.stringify(this.props.selectedRows.data[0].dataIndex));
    };

    handlePublishDocuments = () => {
        let key = this.getDemand();
        // post data to fetch
        getPublishDocuments(key.demandId);

        console.log(JSON.stringify(this.props.selectedRows.data[0].dataIndex));
    };

    getDemand = () =>{

        let idx = this.props.selectedRows.data[0].dataIndex;
        let tableData = this.props.displayData;
        let key = "";
        for(let i in tableData){
            let row = tableData[i];
            if(row.dataIndex === idx){
                key = row.data[0];
                break;
            }
        }
        return key;
    };

    handleClickBlockSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    };

    // handleDemand = () =>{
    //     return <ChooseDemandBox open={true}/>
    // };
    handleDemand = () => {
        this.setState({open: true})
    };


    render() {
        const {classes} = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                <Tooltip title={"评审方案"}>
                    <IconButton className={classes.iconButton} onClick={this.handlePlan}>
                        <ScheduleIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"上线评审"}>
                    <IconButton className={classes.iconButton} onClick={this.handlePublishDocuments}>
                        <PageIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>

            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolBar4DemandList"})(CustomToolBar4DemandList);