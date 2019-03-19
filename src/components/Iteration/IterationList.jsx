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
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import {selectIteration} from "../../actions/IterationAction";
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchTextField from "./SearchTextField"
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    nested: {
        paddingLeft: theme.spacing.unit,
    }


});


class IterationList extends React.Component {
    state = {
        clearInput : false
    };

    handleSelected = () => {
        this.props.handleSelected();
        this.setState({clearInput : true})
    }



    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        let idx = 1;
        let iterationLists = !this.props.iterations ? "" : this.props.iterations.map((prop, key) => {
                return (
                    <SingleIteration key={key} handleSelected={this.handleSelected} handleEdit={this.props.handleEdit}
                                     iterationList={prop.children} iteration={prop.iteration.name}
                                     defaultExpand={idx++ == 1 ? true : prop.iteration.selected}/>
                )
            }
        );
        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">版本列表<IconButton onClick={this.props.handleAdd} style={{
                    float: "right",
                    marginRight: "-12px"
                }}><AddIcon/></IconButton></ListSubheader>}
                className={classes.root}
            >
                <SearchTextField handleSearch={this.props.handleSearch} clearInput={this.state.clearInput}/>
                {iterationLists}

            </List>
        );
    }
}

IterationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IterationList);