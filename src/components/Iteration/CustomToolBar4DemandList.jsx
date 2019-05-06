import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PageIcon from "@material-ui/icons/Pages";
import {withStyles} from "@material-ui/core/styles";
import store from '../../stores/index';
import {getDevelopPlan, getPublishDocuments} from "../../actions/IterationAction";
import {SAVE_KEY} from "../../actions/types";
import permProcessor from "../../constants/PermProcessor";
import MenuItem from "./IterationMenuList";

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



    handlePlan = () => {
        let key = this.getDemand();
        store.dispatch({
            type: SAVE_KEY,
            payload: key
        });
        getDevelopPlan(key);
    };

    handlePublishDocuments = () => {
        let key = this.getDemand();
        store.dispatch({
            type: SAVE_KEY,
            payload: key
        });
        getPublishDocuments(key);
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


    handleDemand = () => {
        this.setState({open: true})
    };


    render() {
        const {classes} = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                {permProcessor.bingo('reviewPlan', this.props.perm) ?
                <Tooltip title={"评审方案"}>
                    <IconButton className={classes.iconButton} onClick={this.handlePlan}>
                        <ScheduleIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                    :""}
                {permProcessor.bingo('reviewPlan', this.props.perm) ?

                <Tooltip title={"上线评审"}>
                    <IconButton className={classes.iconButton} onClick={this.handlePublishDocuments}>
                        <PageIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                    :""}
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolBar4DemandList"})(CustomToolBar4DemandList);