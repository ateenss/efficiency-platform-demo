import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import {selectIteration} from "../../actions/IterationAction";
import IterationMenuList from "./IterationMenuList";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {changeTaskStatus, editTask} from "../../actions/DemandTasksAction";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: "0",
    },
    itemText: {
        paddingLeft: "40px !important"
    },
    itemTextParent: {
        paddingLeft: "0px !important"
    }
});


const options = [
        {
            name: "编辑",
            func: function (id) {
                editTask(id)
            }
        },
        {
            name: "完成",
            func: function (id) {
                changeTaskStatus(id);
            }
        }

    ]
;

class SingleIteration extends React.Component {
    state = {
        open: false
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    componentDidMount() {
        if (this.props.defaultExpand) {
            this.setState({open: true, selected: true});
        }
    }

    render() {
        const {classes, iterationList} = this.props;

        let iterationComponents = !iterationList ? "" : iterationList.map((prop, key) => {
                return (
                    <ListItem key={key} button className={classes.nested}
                              onClick={this.props.handleSelected.bind(this, prop.id)} selected={prop.selected}  style={{paddingRight:"0"}}>


                        <ListItemText inset primary={prop.iter + "版"} className={classes.itemText}/>
                        <IterationMenuList icon={<MoreVertIcon/>} handleEdit={this.props.handleEdit.bind(this, prop.id)}/>
                    </ListItem>
                )
            }
        );
        return (
            <div>
                <ListItem button onClick={this.handleClick}>
                    <ListItemText inset primary={this.props.iteration + "版"} className={classes.itemTextParent}/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <List component="div" disablePadding>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        {iterationComponents}
                    </Collapse>
                </List>
            </div>
        );
    }
}

SingleIteration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleIteration);