
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
    iconButton: {
        right:"40px",
    },
};

class CustomEditToolBar extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"编辑"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleEdit}>
                        <EditIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles)(CustomEditToolBar);