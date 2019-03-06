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
        this.props.iterationList.map((prop, key) => {
            let ss = "selected" + key;
            let ret = {};
            ret[ss]=false;
            console.log(ss);
            this.setState(ret);

        });
    }

    render() {
        const {classes, iterationList} = this.props;
        let iterationComponents = !iterationList ? "" : iterationList.map((prop, key) => {
                return (
                    <ListItem key={key} button className={classes.nested}
                              onClick={this.props.handleSelected.bind(this, key)} selected={this.state["selected" + key]}>
                        <ListItemText inset primary={prop + "版"} className={classes.itemText}/>
                        <ListItemIcon style={{marginRight: "0"}} onClick={this.props.handleEdit}>
                            <EditIcon fontSize="small"/>
                        </ListItemIcon>
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