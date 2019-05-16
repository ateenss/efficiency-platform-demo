import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import SingleIteration from "./SingleIteration";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/History";

import IconButton from "@material-ui/core/IconButton";
import permProcessor from "../../constants/PermProcessor";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {DISABLE_ALL_EXCEPT} from "../../actions/types";
import {disableAllExcept} from "../../actions/IterationAction";
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none",
    },
    nested: {
        paddingLeft: theme.spacing.unit,
    },
    itemText:{
        paddingLeft:"0",
    },
    allversion:{
        paddingLeft:"15px"
    }


});

const ListItem = withStyles({
    root: {
        '&$selected': {
            background: "#f5f5f5",
            margin:"0 10px"
        },
        height:"50px",
        width:"auto",
        margin:"0 10px",
        '&$hover':{
            background:"#121212",
            margin:"0 10px"
        }
    },
    selected:{
        background: "#f5f5f5",
    }
})(props => <MuiListItem {...props} />);


const ListItemText = withStyles({
    root: {
        "&:first-child":{paddingLeft:"15px"},
        '&$selected': {
            background: "#f5f5f5",
            color:"#FFF",
            margin:"0 10px"
        },
        fontSize:"14px",
        color:"#121212",
        fontWeight:"400"
    },
    selected:{
        background: "#f5f5f5",
    }
})(props => <MuiListItemText {...props} />);


class IterationList extends React.Component {
    state = {
        clearInput : false
    };

    componentWillReceiveProps(nextProps, nextContext) {

        let selected = this.props.allVersionSelected;

        if(nextProps.action === DISABLE_ALL_EXCEPT){
            if("allVersion" != nextProps.activeName){
                selected = false;
            }
        }

        this.setState({allVersionSelected : selected})

    }

    handleAllIteration = () =>{

        this.props.handleAllIteration();

        disableAllExcept("allVersion");

    };

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        let idx = 1;
        let iterationLists = !this.props.iterations ? "" : this.props.iterations.map((prop, key) => {
                return (
                    <Grid item xs={2}>
                        <List
                            component="nav"
                            // subheader={<ListSubheader component="div">版本列表{permProcessor.bingo('save', this.props.perm)?  <IconButton onClick={this.props.handleAdd} style={{float: "right", marginRight: "-12px"}}><AddIcon/></IconButton> : ""} </ListSubheader>}
                            className={classes.root}
                        >
                            <SingleIteration key={key} handleSelected={this.props.handleSelected} handleEdit={this.props.handleEdit} handleDelete={this.props.handleDelete} handleReview={this.props.handleReview}
                                         iterationList={prop.children} iteration={prop.iteration.name}
                                         defaultExpand={idx++ == 1 ? true : prop.iteration.selected} perm={this.props.perm}/>
                        </List>
                    </Grid>
                )
            }
        );
        return (
            <Grid container spacing={0} style={{background:"#FFFFFF"}}>
                {iterationLists}

                <Grid item xs={2}>
                    <List
                        component="nav"
                        // subheader={<ListSubheader component="div">版本列表{permProcessor.bingo('save', this.props.perm)?  <IconButton onClick={this.props.handleAdd} style={{float: "right", marginRight: "-12px"}}><AddIcon/></IconButton> : ""} </ListSubheader>}
                        className={classes.root}
                    >
                        <ListItem button className={classes.nested} onClick={this.handleAllIteration} selected={this.props.allVersionSelected}>
                            <ListItemText inset primary="所有版本" className={classes.itemText} disableTypography/>
                            {/*<SearchIcon/>*/}
                            {permProcessor.bingo('save', this.props.perm)?  <IconButton onClick={this.props.handleAdd.bind(this)} style={{float: "right", marginRight: "-12px"}}><AddIcon/></IconButton> : ""}
                        </ListItem>

                    </List>
                </Grid>
            </Grid>

    );
    }
}

IterationList.propTypes = {
    classes: PropTypes.object.isRequired,
};


const
    mapStateToProps = (state) => {
        return {
            activeName : state.reducer.iteration.activeName,
            action : state.reducer.iteration.action
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        IterationList
    ))
;

