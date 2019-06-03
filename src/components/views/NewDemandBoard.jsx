/* eslint-disable */
import React from "react";
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
// import store from "../../stores";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {demandConst} from "../BuildDemand/DemandConst";
import permProcessor from "../../constants/PermProcessor";
import MaterialTable from "material-table";

import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newBuildButton: {
        color: red[500]
    },
    head: {
        background: "#FFFFFF"
    },
    avatar: {},
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    toolbar: {
        boxShadow: "none",
        background: "#FFFFFF",
        minHeight: "64px"
    },
    chip: {
        fontSize: "12px",
        marginRight: theme.spacing.unit
    },
    toolTipIteration: {
        background: "#F5F5F5", padding: "8px", maxWidth: "600px"
    }
});


const filterLabel = {

    demandName: {
        label: "需求名称",
        renderValue: function (data) {
            return this.label + ":" + data;
            ;
        }
    },
    demandType: {
        label: "需求类型",
        renderValue: function (data) {

            let label = this.label + ":" + data;

            for (let k in demandConst.type) {

                if (demandConst.type[k].id === data) {
                    label = this.label + ":" + demandConst.type[k].name;
                }
            }

            return label;


        }
    },
    status: {
        label: "需求评审状态",
        renderValue: function (data) {

            let label = this.label + ":" + data;

            for (let k in demandConst.status) {

                if (demandConst.status[k].id === data) {
                    label = this.label + ":" + demandConst.status[k].name;
                }
            }

            return label;


        }
    },
    bmRequired: {
        label: "BM",
        mapping: demandConst.bmRequired,
        renderValue: function (data) {

            let label = this.label + ":" + data;

            for (let k in demandConst.bmRequired) {

                if (demandConst.bmRequired[k].id === data) {
                    label = this.label + ":" + demandConst.bmRequired[k].name;
                }
            }

            return label;


        }
    },
    uatRequired: {
        label: "UAT",
        mapping: demandConst.uatRequired,
        renderValue: function (data) {

            let label = this.label + ":" + data;

            for (let k in demandConst.uatRequired) {

                if (demandConst.uatRequired[k].id === data) {
                    label = this.label + ":" + demandConst.uatRequired[k].name;
                }
            }

            return label;


        }
    },
    createTime: {
        label: "创建时间",
        renderValue: function (data) {
            return this.label + ":" + data.from + "-" + data.to;
        }
    }

};

let editInitialData = null;

class NewDemandBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNum: 0,
            assembleTable: [],
            currentPage: 1,
            totalCount: 1,
            pageSize: 20,
            filters: {},
            perm: permProcessor.init('demand'),
        };
    }


    render() {
        const {classes, buildDemandShow, editDemandShow, tableData} = this.props;

        //todo:结果都在这个result里面，选取值去定位这个result里面的数组（被选取的索引值和result里面是保持一致的）
        return (
            <Grid container spacing={16}>
                <div style={{maxWidth: '100%'}}>
                    <MaterialTable
                        columns={[
                            {title: 'Adı', field: 'name'},
                            {title: 'Soyadı', field: 'surname'},
                            {title: 'Doğum Yılı', field: 'birthYear', type: 'numeric'},
                            {title: 'Doğum Yeri', field: 'birthCity', lookup: {34: 'İstanbul', 63: 'Şanlıurfa'}}
                        ]}
                        data={[{name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63}]}
                        title="Demo Title"
                    />
                </div>
            </Grid>

        )
    }
}


export default NewDemandBoard