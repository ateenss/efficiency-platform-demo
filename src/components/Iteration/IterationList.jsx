import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Demand from "../views/MyPage";
import SingleIteration from "./SingleIteration";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    nested: {
        paddingLeft: theme.spacing.unit,
    },

});

const iterations = [
    {
        iteration: "48.0",
        children: [
            "48.1", "48.2", "48.3"
        ]
    },
    {
        iteration: "47.0",
        children: [
            "47.1", "47.2", "47.3"
        ]
    },


];

class IterationList extends React.Component {
    state = {
        open: true,
    };

    handleAdd = () => {
        console.log("add iteration")
    };
    handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("edit iteration");
    };
    handleSelected = (id) => {
        console.log(id);
        // dispatch一个ID过去，获取该版本下的所有需求，然后选中

    };

    render() {
        const {classes} = this.props;
        let idx = 1;
        let iterationLists = !iterations ? "" : iterations.map((prop, key) => {
                return (
                    <SingleIteration key={key} handleSelected={this.handleSelected} handleEdit={this.handleEdit}
                                     iterationList={prop.children} iteration={prop.iteration}
                                     defaultExpand={idx++ == 1 ? true : false}/>
                )
            }
        );
        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">版本列表<IconButton onClick={this.handleAdd} style={{
                    float: "right",
                    marginRight: "-12px"
                }}><AddIcon/></IconButton></ListSubheader>}
                className={classes.root}
            >
                {iterationLists}


            </List>
        );
    }
}

IterationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IterationList);