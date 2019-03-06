import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import EditIcon from "@material-ui/icons/Edit";
import {withStyles} from "@material-ui/core/styles";
import {changeTaskStatus, editDemand, editTask} from "../../actions/DemandTasksAction";
import DemandGuihuaIcon from "@material-ui/icons/Receipt"
import ChooseDemandBox from "./ChooseDemandBox";
import SimpleListMenu from "../common/SimpleListMenu";

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

const options = [
        {
            name: "47.0",
            func: function (id) {
                console.log(3);
            }
        },
        {
            name: "48.0",
            func: function (id) {
                console.log(3);
                this.props.setSelectedRows([]);
            }
        }
        ,
        {
            name: "49.0",
            func: function (id) {
                console.log(3);
            }
        }

    ]
;

class CustomToolbarSelect extends React.Component {
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
        this.props.setSelectedRows([]);
    };

    handleEdit = () => {
        editDemand(this.props.displayData[this.props.selectedRows.data[0].dataIndex]);
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
                <Tooltip title={"Deselect ALL"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
                        <IndeterminateCheckBoxIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Inverse selection"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
                        <CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"编辑"}>
                    <IconButton className={classes.iconButton} onClick={this.handleEdit}>
                        <EditIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"变更迭代"} id="3333">
                    <SimpleListMenu options={options} display="inline" buttonClass={classes.iconButton} id="234"
                                    icon={<DemandGuihuaIcon className={classes.icon}/>}/>
                </Tooltip>

            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelect"})(CustomToolbarSelect);