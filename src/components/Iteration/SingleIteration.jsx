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
        // let ret = {selected:[]};
        // this.props.iterationList.map((prop, key) => {
        //     // let unit = {id:key, selected:false};
        //     let unit={};
        //     unit[key] = false;
        //     ret.selected.push(unit);
        //     this.setState(ret);
        // });
        // console.log(JSON.stringify(this.state.selected));

    }

    // handleSelected = (id) => {
    //     console.log(id);
    //     // dispatch一个ID过去，获取该版本下的所有需求，然后选中
    //     selectIteration(id);
    //     let ret = JSON.parse(JSON.stringify(this.state.selected));
    //     for(let i in ret){
    //         console.log("2342324"+JSON.stringify(ret[i][id]));
    //
    //         if(ret[i][id] == id){
    //             ret[i][id]=true;
    //         }else{
    //             ret[i]=false;
    //         }
    //     }
    //     console.log(JSON.stringify(ret));
    //     // let ret = {};
    //     // ret["selected"+id] = true;
    //     this.setState({selected: ret});
    // };

    render() {
        const {classes, iterationList} = this.props;
        JSON.stringify(iterationList);
        let iterationComponents = !iterationList ? "" : iterationList.map((prop, key) => {
                return (
                    <ListItem key={key} button className={classes.nested}
                              onClick={this.props.handleSelected.bind(this, prop.iter)} selected={prop.selected}>
                        <ListItemText inset primary={prop.iter + "版"} className={classes.itemText}/>
                        <ListItemIcon style={{marginRight: "0"}} onClick={this.props.handleEdit.bind(this, prop.iter)}>
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