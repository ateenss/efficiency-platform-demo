
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import SyncIcon from "@material-ui/icons/Sync";

import { withStyles } from "@material-ui/core/styles";
import FilterIcon from "@material-ui/icons/Filter";
import permProcessor from "../../constants/PermProcessor";
import DownloadIcon from "@material-ui/icons/CloudDownload";

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomToolbar4DeliveryDoc extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"下载"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleDownload.bind(this)}>
                        <DownloadIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"筛选"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleFilter.bind(this)}>
                        <FilterIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"需求同步"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleSync}>
                        <SyncIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {permProcessor.bingo('save', this.props.perm) ?
                <Tooltip title={"添加"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleAdd}>
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip> : ""}
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar4DeliveryDoc" })(CustomToolbar4DeliveryDoc);