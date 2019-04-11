import React, {Component} from 'react';
import MultiSelect from "@kenshooui/react-multi-select";
import customStyle from "../../assets/css/multiSelect.css";
import {withStyles} from "@material-ui/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridContainer from "../Grid/GridContainer";
import Grid from "@material-ui/core/Grid";

const styles = {
    root: {
        boxShadow: "none",
        borderBottom: "1px solid #949494"
    },
    heading: {
        color: "#0000008a"
    }

};

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
            for (let i in this.props.defaultValue) {
                ret.push({id: this.props.defaultValue[i], label: this.props.defaultValue[i]})
            }
        }
        this.setState({items: this.props.data})
        this.setState({selectedItems: [{id: "长泽雅美", label: "长泽雅美"}]});
    }

    handleChange(selectedItems) {
        this.setState({selectedItems});

        let ret = [];
        for (let i in selectedItems) {
            ret.push(selectedItems[i].id);
        }

        this.props.onChange({keyNote: this.props.nameIn, value: ret})
    }

    render() {
        const {items, selectedItems} = this.state;
        const {classes} = this.props;
        return (
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} style={{minHeight: "40px", padding: "0 0 0 2px", margin:"0"}}>
                    <Typography className={classes.heading}>{this.props.label}</Typography>
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
                            />
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>


        );
    }
}

export default withStyles(styles)(TrueMuitiSelect)