import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SplitIcon from "@material-ui/icons/CallSplit";
import EditIcon from "@material-ui/icons/Edit";
import {withStyles} from "@material-ui/core/styles";
import {editDemand, openReviewDemand, splitDemand} from "../../actions/DemandAction";
import DemandGuihuaIcon from "@material-ui/icons/Receipt"
import {connect} from "react-redux";
import permProcessor from "../../constants/PermProcessor";

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
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {


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
        editDemand(this.props.displayData[this.props.selectedRows.data[0].dataIndex].data[0]);
    };

    handleClickBlockSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
    };

    openReviewDemand = () => {
        openReviewDemand(this.props.displayData[this.props.selectedRows.data[0].dataIndex].data[0]);
    };

    handleSplitDemand = () =>{
        splitDemand(this.props.displayData[this.props.selectedRows.data[0].dataIndex].data[0]);
    }


    render() {
        const {classes} = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                {/*<Tooltip title={"Deselect ALL"}>*/}
                    {/*<IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>*/}
                        {/*<IndeterminateCheckBoxIcon className={classes.icon}/>*/}
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
                {permProcessor.bingo('splitDemand', this.props.perm) ?
                <Tooltip title={"拆分需求"}>
                    <IconButton className={classes.iconButton} onClick={this.handleSplitDemand}>
                        <SplitIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip> : ""}

                {permProcessor.bingo('save', this.props.perm) ?
                <Tooltip title={"编辑"}>
                    <IconButton className={classes.iconButton} onClick={this.handleEdit}>
                        <EditIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>:""}

                {permProcessor.bingo('saveReview', this.props.perm) ?
                    <Tooltip title={"评审"}>
                    <IconButton className={classes.iconButton} onClick={this.openReviewDemand}>
                        <DemandGuihuaIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>:""}
                {/*<Tooltip title={"变更迭代"} id="3333">*/}
                    {/*<IterationListMenu options={this.props.iteration} display="inline" buttonClass={classes.iconButton} id="234"*/}
                                    {/*icon={<DemandGuihuaIcon className={classes.icon}/>} demandId={this.props.displayData[this.props.selectedRows.data[0].dataIndex].data[0]}/>*/}
                {/*</Tooltip>*/}

            </div>
        );
    }
}


const
    mapStateToProps = (state) => {
        return {
            updatedRow : state.reducer.buildDemand.updatedRow
        }
    };
export default connect(mapStateToProps)(withStyles(defaultToolbarSelectStyles,{name:"CustomToolbarSelect"})(CustomToolbarSelect));
