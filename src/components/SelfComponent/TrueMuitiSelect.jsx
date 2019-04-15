import React, {Component} from 'react';
import MultiSelect from "@kenshooui/react-multi-select";
import customStyle from "../../assets/css/multiSelect.css";
import {withStyles} from "@material-ui/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ArrowDropDown';
import Grid from "@material-ui/core/Grid";

const styles = {
    root: {
        boxShadow: "none",
        borderBottom: "1px solid #949494",
        borderRadius:"none",
        marginTop:'3px'
    },
    heading: {
        color: "#0000008a"
    },
    iconRoot:{
        right:"0"
    }

};


const ExpansionPanel = withStyles({
    root: {
        borderRadius:"none",
        "&:(:first-child)":{
            borderRadius:"none"
        },
        "&:(:last-child)":{
            borderRadius:"none"
        }
    },
})(props => <MuiExpansionPanel {...props} />);


const ExpansionPanelSummary = withStyles({
    root: {

    },
    content: {
      marginBottom:"0px"
    },
    expandIcon : {right:"2px",padding:"0"},
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);


ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

class TrueMuitiSelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            items: [],
            selectedItems: []
        };
    }

    componentDidMount() {
        let ret = [];
        if (!!this.props.defaultValue) {
            this.setState({selectedItems: this.props.defaultValue});
        }
        this.setState({items: this.props.data})
    }

    handleChange(selectedItems) {
        this.setState({selectedItems});

        let ret = [];
        for (let i in selectedItems) {
            ret.push(selectedItems[i].id);
        }

        if(this.props.singleSelect === true){
            let id = "";
            if(!!selectedItems && selectedItems.length > 0){
                id = selectedItems[0].id;
            }
            this.props.onChange({keyNote: this.props.nameIn, value: id})
        }else{
            this.props.onChange({keyNote: this.props.nameIn, value: ret})
        }

    }

    render() {
        const {items, selectedItems} = this.state;
        const {classes, ...others} = this.props;
        let ret = "";
        if(!!this.state.selectedItems && selectedItems.length > 0){

            for(let idx in this.state.selectedItems){

                ret = ret + this.state.selectedItems[idx].label + ", ";

                if(idx >= 3){
                    ret = ret.substring(0, ret.length - 2) + "......";
                    break;
                }

            }

        }

        return (
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon className={classes.iconRoot}/>} style={{minHeight: "44px", padding: "0 0 0 2px", margin:"0"}}>
                    <Typography className={classes.heading}>{this.props.label }{!!ret ? ": "+ ret : ""}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{padding: "0", margin: "0"}}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <MultiSelect classNames={classes.wrapper}
                                         wrapperClassName={customStyle.wrapper}
                                         responsiveHeight={300}
                                         height={300}
                                         items={items}
                                         selectedItems={selectedItems}
                                         onChange={this.handleChange}
                                         itemHeight={35}
                                         messages={{searchPlaceholder: ""}}
                                         withGrouping
                                         maxSelectedItems={this.props.singleSelect === true ? 1 : ""}
                                         showSelectAll
                            />
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>


        );
    }
}

export default withStyles(styles)(TrueMuitiSelect)