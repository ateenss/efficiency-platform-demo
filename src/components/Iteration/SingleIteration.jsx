import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IterationMenuList from "./IterationMenuList";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {connect} from "react-redux";
import {disableAllExcept} from "../../actions/IterationAction";
import {DISABLE_ALL_EXCEPT} from "../../actions/types";

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
        paddingLeft: "30px !important"
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



class SingleIteration extends React.Component {
    state = {
        open: false,
        curName : ""
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleSelected = (id, name) =>{
        this.props.handleSelected(id);

        this.setState({open: !this.state.open, curName : name, headSelected : true});

        disableAllExcept(this.props.iteration);
    };

    componentDidMount() {
        if (this.props.defaultExpand) {
            this.setState({headSelected : true, selected: true, curName : this.props.iterationList[0].iter});
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.action === DISABLE_ALL_EXCEPT){
            if(this.props.iteration !== nextProps.activeName){
                this.setState({open : false, headSelected : false, curName : ""})
            }

        }
    }

    render() {
        const {classes, iterationList} = this.props;

        let iterationComponents = !iterationList ? "" : iterationList.map((prop, key) => {
                return (
                    <ListItem key={key} button className={classes.nested}
                              onClick={this.handleSelected.bind(this, prop.id, prop.iter)} selected={prop.selected}  style={{paddingRight:"0"}}>


                        <ListItemText disableTypography inset primary={prop.iter + "版"} className={classes.itemText}/>
                        <IterationMenuList icon={<MoreVertIcon/>} handleDelete={this.props.handleDelete.bind(this, prop.id)} handleEdit={this.props.handleEdit.bind(this, prop.id)} handleReview={this.props.handleReview} perm={this.props.perm}/>
                    </ListItem>
                )
            }
        );
        return (
            <div>
                <ListItem button onClick={this.handleClick} selected={this.state.headSelected}>
                    <ListItemText disableTypography inset primary={this.state.curName==="" ?  (this.props.iteration + "版") : this.state.curName + "版" } className={classes.itemTextParent}/>
                    {this.state.open ? <ExpandLess style={{color:"#121212"}}/> : <ExpandMore  style={{color:"#121212"}}/>}
                </ListItem>
                <List component="div" disablePadding style={{position:"absolute", width:"100%", background:"#FFF", zIndex:"1"}}>
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

const
    mapStateToProps = (state) => {
        return {
            activeName : state.reducer.iteration.activeName,
            action : state.reducer.iteration.action
        }
    };
export default connect(mapStateToProps)(    withStyles(styles, {withTheme: true})    (        SingleIteration    ));