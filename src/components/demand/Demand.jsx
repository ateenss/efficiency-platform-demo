/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Grid from "@material-ui/core/Grid";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Task from '../Task/DemandTask';

import Divider from "@material-ui/core/Divider"


import {
    cardTitle,
    cardSubtitle,
    cardLink
} from "../../assets/jss/material-dashboard-react.jsx";
import TableCell from "../Table/Table";


const styles = {
    cardTitle,
    actions:{
      padding:0
    },
    cardSubtitle: {
        float: "left"
    },
    cardLink,
    DemandHeader: {
        margin: "0px !important",

    },
    expand: {padding: "0",width:"100%"},
    cardTitleWhite: {
        margin: 0,
        float: "left"
    },
    taskFlowStatus: {
        padding: "5px 15px 15px 15px"
    },
    chips: {
        padding: "0",
        textAlign: "center"


    },
    chip: {
        float: "right",
        background: "#4caf50",
        color: "#FFFFFF"
    },
    taskStatus: {
        margin: "5px 0",
        color: "#4caf50",
        fontWeight: "700",

    },
    cardHeaderTitle: {
        margin: "0",
        fontWeight:"700"
    },
    demandHeader: {
        paddingBottom: "0"
    },
    taskCard: {
        // marginBottom: "15px"
    },
    taskStatusGroup:{
        background:"#f5f5f5",
        marginBottom:"10px;"
    },
    taskGroup:{
        background:"#f5f5f5",
    },
    slideContainer:{
        textAlign:"center"
    },
    demand:{
        marginBottom:"10px"
    },
    taskFlow:{
        background:"#111111"
    }

};


class Demand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    render() {
        const {classes, develop, plan, test, finish} = this.props;
        return (
            <Card className={classes.demand}>
                <CardHeader className={classes.demandHeader}
                            action={
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={
                                <div className={classes.cardHeaderTitle}><span>{this.props.demandName}</span> <Chip label="已评审"
                                                                                               className={classes.chip}/>
                                </div>
                            }
                            subheader={this.props.demandOwner}
                >
                </CardHeader>
                <CardActions className={classes.actions} disableActionSpacing>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Grid container spacing={0} className={classes.taskFlowStatus}>
                        <Grid container spacing={0} className={classes.taskStatusGroup}>
                            <Grid item xs={3} sm={12} md={3}><h5 align="center" className={classes.taskStatus}>方案</h5></Grid>
                            <Grid item xs={3} sm={12} md={3}><h5 align="center" className={classes.taskStatus}>开发</h5></Grid>
                            <Grid item xs={3} sm={12} md={3}><h5 align="center" className={classes.taskStatus}>联调</h5></Grid>
                            <Grid item xs={3} sm={12} md={3}><h5 align="center" className={classes.taskStatus}>提测</h5></Grid>
                        </Grid>
                        <Grid container spacing={0} className={classes.taskGroup}>
                            <Grid xs={3} sm={12} md={3} item>

                                {!plan ? "" : plan.map((prop, key) => {
                                    return (
                                        <Task group="plan" key={key} taskId={prop.taskId} taskName={prop.taskName} taskContent={prop.taskContent} />
                                    );
                                })}


                            </Grid>

                            <Grid xs={3} sm={12} md={3} item>

                                {!develop ? "" : develop.map((prop, key) => {
                                    return (
                                        <Task group="develop" key={key} taskId={prop.taskId} taskName={prop.taskName} taskContent={prop.taskContent}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={3} sm={12} md={3} item>
                                {!test ? "" : test.map((prop, key) => {
                                    return (
                                        <Task key={key} taskId={prop.taskId} taskName={prop.taskName} taskContent={prop.taskContent}/>
                                    );
                                })}

                            </Grid>
                            <Grid xs={3} sm={12} md={3} item>
                                {!finish ? "" : finish.map((prop, key) => {
                                    return (
                                        <Task key={key} taskId={prop.taskId} taskName={prop.taskName} taskContent={prop.taskContent}/>
                                    );
                                })}

                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </Card>

        );
    }
}

export default withStyles(styles)(Demand);
