/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Green from '@material-ui/core/colors/green';
import Grid from "@material-ui/core/Grid";
import classnames from 'classnames';

import {changeTaskStatus} from "../../actions/DemandTasksAction";
import {editTask} from "../../actions/DemandTasksAction";


import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import Avatar from '@material-ui/core/Avatar';
import {connect} from "react-redux";

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/ArrowForward';
import history from "../../history/history";


const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        padding: "0px"

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    taskType: {
        backgroundColor: "#e4e4e4",
        color: "#121212",
        width: "auto",
        borderRadius: "2px",
        position: "absolute",
        right: "0",
        left: "0",
        textAlign: "left",
        top: "0",
        padding: "0 10px",
        fontSize: "14px",
        justifyContent: "left"
    },
    taskStatus: {
        backgroundColor: Green[500],
        fontSize: "14px",
        width: "50px",
        height: "50px",
        position: "absolute",
        right: "5px",
        top: "5px",
    },
    taskCard: {
        position: "relative"
    },
    taskContent: {
        paddingBottom: "0px"
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


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.btnRef = React.createRef();
        this.state = {
            expanded: false
        };
    }


    handleClick = () =>{
      history.push('/demandTask?id='+this.btnRef.current.props.taskid);

    };

    render() {
        const {classes} = this.props;

        return (
            <Grid xs={3} item>
                <Card className={classes.taskCard}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.taskType}>
                                {this.props.taskType} - {this.props.taskNo}
                            </Avatar>
                        }
                        className={classes.taskHeader}

                        action={
                            <Avatar aria-label="Recipe" className={classes.taskStatus}>
                                {this.props.taskStatus}
                            </Avatar>
                        }
                    />
                    <CardContent className={classes.taskContent}>

                        <h4>
                            {this.props.taskName}
                        </h4>

                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <IconButton aria-label="edit">
                                    <EditIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                            <IconButton aria-label="详情" taskid="1" onClick={this.handleClick} ref={this.btnRef}>
                                <ShareIcon />
                            </IconButton>
                            </Grid>
                        </Grid>

                    </CardActions>
                </Card>



            </Grid>

        );
    }
}

export default (withStyles(styles, {withTheme: true})(Task));
