import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {
    getModulesStatsByIteration
} from "../../actions/IterationAction";
import permProcessor from "../../constants/PermProcessor";
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";
import {error} from "../../actions/NotificationAction";

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

        let self = this;

        getModulesStatsByIteration(this.props.iterationId).then(resp => {

            let ret = [];
            for(let idx in resp.data.data){

                let unit = resp.data.data[idx];

                for(let j in self.props.modules){

                    let u = self.props.modules[j];

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
        const {} = this.props;
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


        }
    };
export default connect(mapStateToProps)(    withStyles(styles, {withTheme: true})    (        Stats    ));