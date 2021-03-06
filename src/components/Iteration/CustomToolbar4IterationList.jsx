
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import FilterIcon from "@material-ui/icons/Filter";

const defaultToolbarStyles = {
    iconButton: {
    },
};

class CustomToolbar4IterationList extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"筛选"}>
                    <IconButton className={classes.iconButton} onClick={this.props.handleFilter.bind(this)}>
                        <FilterIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title={"添加"}>*/}
                    {/*<IconButton className={classes.iconButton} onClick={this.props.handleAdd}>*/}
                        {/*<AddIcon className={classes.deleteIcon} />*/}
                    {/*</IconButton>*/}
                {/*</Tooltip>*/}
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar4IterationList" })(CustomToolbar4IterationList);