import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IterationMenuList from "./IterationMenuList";
import MoreVertIcon from '@material-ui/icons/MoreVert';


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


const ListItem = withStyles({
    root: {
        '&$selected': {
            background: "#f5f5f5",
            color:"#FFF",
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
                        <IterationMenuList icon={<MoreVertIcon/>} handleDelete={this.props.handleDelete.bind(this, prop.id)} handleEdit={this.props.handleEdit.bind(this, prop.id)} handleReview={this.props.handleReview} perm={this.props.perm}/>
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