/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Demand from './DemandTaskDetail';
import {getDemandTasks} from '../../actions/DemandTasksAction';
import {connect} from "react-redux";

import TaskEditor from "../Task/TaskEditor";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class MyPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log("afterGetDemandTasks");
        this.state = {
            expanded: false,
            value: 0
        };
        // const [value, setValue] = React.useState(0);
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    }

    componentDidMount() {

        getDemandTasks();

    }

    render() {
        const {classes, demands,tempBoardToDetail} = this.props;
        let demandsComponents = !demands ? "" : demands.map((prop, key) => {
                let taskGroup = prop.tasks ? prop.tasks : "";
                return (
                    <Demand key={key} demandName={prop.demandName} demandOwner={prop.demandOwner} expanded={true}
                            develop={taskGroup.develop ? taskGroup.develop : ""}
                            plan={taskGroup.plan ? taskGroup.plan : ""}
                            tempBoardToDetail={tempBoardToDetail}
                    />
                )
            }
        );

        return (

            <Grid spacing={16} container fullWidth>
                    <Grid xs={12}>{demandsComponents}</Grid>
                <TaskEditor open={false}/>
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

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(MyPage));
