/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import store from '../../stores/index';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Divider from "@material-ui/core/Divider"


import {
    cardTitle,
    cardSubtitle,
    cardLink
} from "../../assets/jss/material-dashboard-react.jsx";
import {changeTaskStatus} from "../../actions/DemandTasksAction";
import {editTask} from "../../actions/DemandTasksAction";


import CardHeader from "@material-ui/core/CardHeader";
import SimpleListMenu from "../common/SimpleListMenu";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {openTaskEdit} from "../../actions/BuildMissionAction"


const styles = {
    cardTitle,
    cardSubtitle: {
        float: "left"
    },
    cardLink:{
      color:"#4caf50",
        fontWeight:"700",
        margin:"0"
    },

    taskCard: {
        margin: "15px"
    },
    taskHeader:{
        padding:"10px 15px 0 15px",
    },
    taskContent:{
        padding:"0 15px 10px 15px",
        paddingBottom:"15px !important"
    },
    root:{
        width:"100%"
    }


};


const options = [
        {
            name: "编辑",
            func: function (id) {
                /*editTask(id)*/
                store.dispatch(openTaskEdit(id))
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


class DemandTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.root}>
            <Card className={classes.taskCard}>
                <CardHeader className={classes.taskHeader}
                            action={
                                <SimpleListMenu icon={<MoreVertIcon/>} options={options}
                                                id={this.props.group+"-taskId-" + this.props.taskId}/>
                            }
                            title={<h6 className={classes.cardTitle}>{this.props.taskName}</h6>}
                />
                <CardContent className={classes.taskContent}>

                    <Divider/>
                    <p>
                        {this.props.taskContent}
                    </p>

                    <p href="#pablo" className={classes.cardLink}
                       onClick={e => e.preventDefault()}>周之豪</p>
                </CardContent>
            </Card>
            </Grid>
        );
    }
}

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    console.log(333333);
    return {
        demands: state.reducer.task.demands
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(DemandTask));
