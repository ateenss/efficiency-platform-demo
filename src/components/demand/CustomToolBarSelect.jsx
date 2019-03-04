import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import { editDemand } from "../../actions/DemandTasksAction";

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

class CustomToolbarSelect extends React.Component {
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
        this.props.setSelectedRows([]);
    };

    handleEdit = () =>{
        editDemand(this.props.displayData[this.props.selectedRows.data[0].dataIndex]);
    };

    handleClickBlockSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                <Tooltip title={"Deselect ALL"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
                        <IndeterminateCheckBoxIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Inverse selection"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
                        <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"编辑"}>
                    <IconButton className={classes.iconButton} onClick={this.handleEdit}>
                        <EditIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);