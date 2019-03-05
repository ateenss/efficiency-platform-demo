/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import {connect} from "react-redux";

import Grid from '@material-ui/core/Grid'
import Task from '../TaskBoard/Task';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    header: {
        boxShadow: "none",
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
});

const tasks = [{
    taskNo: '2018-23-34',
    taskName: "30天从入门到放弃",
    taskStatus: "进行中",
    taskType: "需求任务"
}, {
    taskNo: '2018-23-33',
    taskName: "30天学不会react",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "到底能不能学会",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "不能啊",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "不能啊",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "到底能不能学会",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "不能啊",
    taskStatus: "进行中",
    taskType: "开发任务"
}, {
    taskNo: '2018-23-33',
    taskName: "不能啊",
    taskStatus: "进行中",
    taskType: "开发任务"
}

];


class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 0
        };
    }

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    }

    componentDidMount() {

        // getDemandTasks();

    }

    render() {
        const {classes} = this.props;
        let taskComponents = tasks.map((prop, key) => {
            return (
                <Task key={key} taskNo={prop.taskNo} taskName={prop.taskName} taskStatus={prop.taskStatus}
                      taskType={prop.taskType}/>
            )
        });
        const sideList = (
            <div className={classes.list}>
                <List>
                    {['进行中', '已完成'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['需求任务', '开发任务', '个人任务'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );


        return (

            <Grid container className={classes.root} spacing={16}>

                <Grid item xs={12}>
                    <AppBar className={classes.header} position="static" color="default">
                        <Grid container spacing={16}>
                            <Grid item xs={1}>
                                <Badge className={classes.margin} badgeContent={4} color="secondary">
                                    <Chip label="进行中" className={classes.chip} variant="default"
                                          style={{background: "#FFFFFF", color: "#121212"}}/>
                                </Badge>
                            </Grid>
                            <Grid item xs={1}>
                                <Badge className={classes.margin} badgeContent={4} color="secondary">
                                    <Chip label="已完成" className={classes.chip} variant="default"
                                          style={{background: "#FFFFFF", color: "#121212"}}/>
                                </Badge>
                            </Grid>
                            <Grid item xs={9}></Grid>
                            <Grid item xs={1}>
                                <Toolbar variant="dense">
                                    <Button onClick={this.toggleDrawer('right', true)}>筛选</Button>
                                </Toolbar>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Grid>

                <Grid container spacing={16}>
                        {taskComponents}
                </Grid>
                <div>

                    <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('right', false)}
                            onKeyDown={this.toggleDrawer('right', false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>
                </div>
            </Grid>
        )
    }
}


// 从store里面取数据给组件
const
    mapStateToProps = (state) => {
        console.log(333333);
        return {
            demands: state.reducer.task.demands
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        TaskBoard
    ))
;
