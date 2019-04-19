
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomToolbar4DeliveryDoc extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"添加"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleAdd}>
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar4DeliveryDoc" })(CustomToolbar4DeliveryDoc);