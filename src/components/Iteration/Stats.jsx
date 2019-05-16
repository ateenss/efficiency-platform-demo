import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IterationList from "../Iteration/IterationList";
import {Paper} from "@material-ui/core";
import {connect} from "react-redux";
import {
    selectIteration,
    addIteration,
    init,
    deleteIteration,
    search,
    updatePersonInfo, getModulesStatsByIteration
} from "../../actions/IterationAction";
import AddIteration from "../Iteration/AddIteration";
import {getModulesSimple} from "../../actions/BuildMissionAction"

import {
    CLOSE_ITERATION_FILTER,
    DELETE_ITERATION,
    ITERATION_INIT,
    OPEN_ITERATION_FILTER,
    SAVE_ADD_ITERATION, SAVE_EDIT_ITERATION
} from "../../actions/types";
import DemandsList from "../Iteration/DemandsList";
import ShowDevelopPlan from "../Iteration/ShowDevDocuments";
import ShowPublishDocument from "../Iteration/ShowPublishDocument";
import IterationStepper from "../Iteration/IterationStepper";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import {startLoading, stopLoading} from "../../actions/CommonAction";
import permProcessor from "../../constants/PermProcessor";
import Chip from "@material-ui/core/Chip";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IterationTable from "../Iteration/IterationTable";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Edit"
import LinkIcon from "@material-ui/icons/Link"

import UpdatePersonInfo from "../Iteration/UpdatePersonInfo";
import Tooltip from "@material-ui/core/Tooltip";
import DemandIterationStepper from "../demand/DemandIterationStepper";
import {error} from "../../actions/NotificationAction";

const drawerWidth = 240;


const data = [
    {name: 'ACP_GTW_WEB', uv: 20},
    {name: 'ACP_GTW_APP', uv: 26},
    {name: 'ACAOS', uv: 23},
    {name: 'ACP_GTW_BKE', uv: 12},
];
const styles = theme => ({
    root: {
        width: '100%'
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: "50px"
    },
    toolbarHead: {
        backgroundColor: "#FFFFFF",
        boxShadow: "none"
    },
    textInfo: {
        margin: theme.spacing.unit * 1,
        color: "#121212",
        fontSize: "14px",
        fontWeight: "400"
    },
    avatar: {
        backgroundColor: "#4DAF7C",
        width: "32px",
        height: "32px"
    },
    cardHeader: {
        padding: theme.spacing.unit,
    },
    cardContent: {
        padding: theme.spacing.unit,

    },
    card: {
        boxShadow: "0px 0px 1px 0px #e0e0e0, 0px 0px 1px 0px #e0e0e0, 0px 0px 1px 0px #e0e0e0",
        margin: theme.spacing.unit
    },
    hide: {
        display: "none"
    },
    editIcon: {
        marginRight: "15px"
    },
    chipStyle: {
        // background: "#f5f5f5",
        // color: "#232323",
        margin: "5px",
        fontSize: "14px",
        borderRadius: "3px",
        minWidth: "68px",
        background: "#f5f5f5"
    },
    tabsIndicator: {
        backgroundColor: '#4DAF7C',

    },
    toolTipIteration: {
        background: "#F5F5F5", padding: "8px", maxWidth: "600px"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            iterationInfo: {},
            tabValue: 0,
            hide: true,
            perm: permProcessor.init('iteration'),
            openAlert: false,
            currentIteration: "",
            allVersionSelected: false
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

        getModulesStatsByIteration(this.props.iterationId).then(resp => {
            let ret = [];
            for(let idx in resp.data.data){

                let unit = resp.data.data[idx];

                for(let j in this.props.modules){

                    let u = this.props.modules[j];

                    if(u.id == idx){

                        let labelName = u.label;

                        let splitLabel = u.label.split("(");

                        if(splitLabel.length > 1){
                            labelName = splitLabel[0];
                        }

                        ret.push({name : labelName, taskTime : unit})


                    }


                }



            }

            this.setState({data : ret});



        }).catch(e => {
            error("后台拉取数据失败", JSON.stringify(e));

        });
    }


    componentWillReceiveProps(nextProps, nextContext) {


    }


    render() {
        const {classes, theme, modules} = this.props;
        const {tabValue} = this.state;
        let self = this;




        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={this.state.data}
                    margin={{top: 20, right: 20, bottom: 20, left: 100}}
                    layout="vertical"
                >
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="taskTime" name="工作量" fill="#4DAF7C" maxBarSize={20}
                         label={{fill: "#F5F5F5"}}/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

Stats.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


// 从store里面取数据给组件
/**
 * iteration : 管理所有的组件
 * @param state
 * @returns {*}
 */
const
    mapStateToProps = (state) => {

        return {
            modules : state.reducer.buildMission.modules


        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        Stats
    ))
;

