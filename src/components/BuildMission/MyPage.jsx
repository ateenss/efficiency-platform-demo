/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Demand from './DemandTaskDetail';
import {connect} from "react-redux";

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
        this.state = {
            expanded: false,
            value: 0
        };
        // const [value, setValue] = React.useState(0);
    }


    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };



    render() {
        const {classes, demands,tempBoardToDetail} = this.props;
        let demandsComponents;
        if (demands) {
            let taskGroup = demands.taskDetailList;
            demandsComponents =
                (
                    <Demand taskName={demands.taskName} taskOwner={demands.taskOwner} expanded={true}
                            develop={taskGroup.develop ? taskGroup.develop : ""}
                            plan={taskGroup.plan ? taskGroup.plan : ""}
                            integration={taskGroup.integration ? taskGroup.integration : ""}
                            goTest={taskGroup.goTest ? taskGroup.goTest : ""}
                            finish={taskGroup.finish ? taskGroup.finish : ""}
                            tempBoardToDetail={tempBoardToDetail}
                    />
                );
        }


        return (

            <Grid spacing={16} container fullWidth>
                    <Grid xs={12}>{demandsComponents}</Grid>
            </Grid>
        );


    }
}


// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {
        demands: state.reducer.buildMission.demands
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(MyPage));
