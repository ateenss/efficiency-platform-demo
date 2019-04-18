import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {editTestCase} from "../../actions/BuildMissionAction";

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

class CustomToolBarSelect4DeliveryDoc extends React.Component {
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
        editTestCase(this.props.displayData[this.props.selectedRows.data[0].dataIndex].data[0]);
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
                {/*<Tooltip title={"Deselect ALL"}>*/}
                    {/*<IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>*/}
                        {/*<IndeterminateCheckBoxIcon className={classes.icon}/>*/}
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
                {/*<Tooltip title={"Inverse selection"}>*/}
                    {/*<IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>*/}
                        {/*<CompareArrowsIcon className={[classes.icon, classes.inverseIcon].join(" ")}/>*/}
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
                <Tooltip title={"编辑"}>
                    <IconButton className={classes.iconButton} onClick={this.handleEdit}>
                        <EditIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title={"评审"}>*/}
                    {/*<IconButton className={classes.iconButton} onClick={this.openReviewDemand}>*/}
                        {/*<DemandGuihuaIcon className={classes.icon}/>*/}
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
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
        }
    };

export default connect(mapStateToProps)

(
    withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelect"})

    (
        CustomToolBarSelect4DeliveryDoc
    ))
;
