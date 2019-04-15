import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import store from '../../stores/index';
import {closeFilterManagerDemand, filterSaveManagerDemand} from "../../actions/DemandAction"
import InputField from "../SelfComponent/InputField";
import Grid from '@material-ui/core/Grid';
import DatePicker from "../SelfComponent/DatePicker";
import SingleSelect from "../SelfComponent/SingleSelect";
import RadioButton from "../SelfComponent/RadioButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {ADD_DEMAND, FILTER_DEMAND_OPEN_MANAGER} from "../../actions/types";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";


const styles = {

    root: {
        marginTop:"10px",
        overflowY:"hidden",
        overflowX:"hidden"
    },
    head:{
        boxShadow:"none"
    },
    searchButton: {
        height: "50px",
        background:"#2196f3"
    },
    searchContent:{
        padding:"0 10px 10px 10px"
    },
    headLetter:{
        marginLeft:"10px",
        textAlign:"center"
    }
};


const priority = [
    {id : 0,  name : "默认"},{id : 1,  name : "低"},{id : 2,  name : "普通"},{id : 3,  name : "高"},
];
const status =[
    {id : 0,  name : "未评审"},{id : 1,  name : "评审不通过"},{id : 2,  name : "评审通过"}
];
const scale = [
    {id : 0, name : "小型"},{id:1, name:"中型"},{id:2,name:"大型"},
];
const type = [
    {id : 0, name : "内部需求"},{id : 1, name : "外部需求"}
];
const bmRequired=[
    {id : 0, name : "否"},{id : 1, name : "是"}

];
const uatRequired=[
    {id : 0, name : "否"},{id : 1, name : "是"}
]


class FilterDemandManager extends React.Component {
    state = {
        filterContent: {
        },
        errorList:{}
    };


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.action === FILTER_DEMAND_OPEN_MANAGER) {
            this.setState({
                defaultContent: {
                    demandPriority: 0,
                    status: 0,
                    demandScale: 0,
                    demandType: 0,
                    bmRequired: 0,
                    uatRequired: 0,
                    demandDevOwnerId: this.props.projectMembers[0].id,
                    demandOwnerId: this.props.projectMembers[0].id,
                    iterationId : this.props.iteration[0].id
                }
            })
        }

    }


    closeFilter = () => {
        store.dispatch(closeFilterManagerDemand());
    };
    saveFilter = () => {
        console.log("是否发出数据了呢？");
        console.log(this.state.filterContent);
        store.dispatch(filterSaveManagerDemand(this.state.filterContent));
        store.dispatch(closeFilterManagerDemand());
    };

    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.filterContent, {
                [keyNote]: value
            });
            this.setState({
                filterContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.filterContent, {
                [keyNote]: value
            });
            this.setState({
                filterContent: data
            })
        }
    };


    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };


    render() {
        const {classes, filterManagerDemandShow} = this.props;
        const labelArray = ["是", "否"];
        let iterationSelect = [];

        for (let i in this.props.iteration) {
            let unit = this.props.iteration[i];
            let ret = {
                id: unit.id,
                name: unit.iterationCode
            }
            iterationSelect.push(ret);
        }


        return (
            <div>
                <Drawer anchor="top" open={filterManagerDemandShow} onClose={this.closeFilter}>
                    <IconButton style={{position:"absolute",right:"10px", top:"8px",zIndex:"9999", background:"#4DAF7C", color:"#FFFFFF"}} onClick={this.saveFilter}
                        aria-label="More"
                        aria-haspopup="true"
                    >
                        <SearchIcon/>
                    </IconButton>
                    <div tabIndex={0} role="button">
                        <div>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <AppBar position="static" color="default" className={classes.head}>
                                        <Toolbar disableGutters={true}>
                                            <Typography variant="subheading" color="inherit" className={classes.headLetter}>
                                                需求筛选
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Grid>
                            </Grid>
                            <div className={classes.root}>
                                <Grid container spacing={16} className={classes.searchContent}>

                                    <Grid item xs={12}>
                                        <InputField
                                            nameIn="demandName"
                                            onChange={this.getContent}
                                            InputLabelName="需求名称"
                                            validate={this.validate}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求类型"
                                            nameIn="demandType"
                                            nameArray={type}/>
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求状态"
                                            nameIn="status"
                                            nameArray={status}/>
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <InputField
                                            nameIn="demandSourceDept"
                                            onChange={this.getContent}
                                            InputLabelName="需求来源部门"
                                            validate={this.validate}

                                        />
                                    </Grid>

                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求分派开发负责人"
                                            nameIn="demandDevOwnerId"
                                            nameArray={this.props.projectMembers}/>
                                    </Grid>

                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求人员"
                                            nameIn="demandOwnerId"
                                            nameArray={this.props.projectMembers}/>
                                    </Grid>

                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="关联版本"
                                            nameIn="iterationId"
                                            nameArray={iterationSelect}/>
                                    </Grid>

                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求规模"
                                            nameIn="demandScale"
                                            nameArray={scale}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求优先级"
                                            nameIn="demandPriority"
                                            nameArray={priority}
                                        />
                                    </Grid>

                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="是否涉及BM控制台"
                                            nameIn="bmRequired"
                                            nameArray={bmRequired}/>
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridStyle}>
                                        <SingleSelect
                                            nameIn="uatRequired"
                                            InputLabelName="是否需要UAT"
                                            onChange={this.getContent}
                                            nameArray={uatRequired}/>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <DatePicker nameIn="DemandAcceptStartTime" InputLabelName="需求受理查询起始时间"
                                                    onDateChange={this.getContent}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <DatePicker nameIn="DemandAcceptEndTime" InputLabelName="需求受理查询结束时间"
                                                    onDateChange={this.getContent}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <DatePicker nameIn="demandPassStartTime" InputLabelName="需求评审通过查询起始时间"
                                                    onDateChange={this.getContent}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <DatePicker nameIn="demandPassEndTime" InputLabelName="需求评审通过查询结束时间"
                                                    onDateChange={this.getContent}/>
                                    </Grid>
                                    {/*<Grid item xs={2}>*/}
                                        {/*<InputField*/}
                                            {/*nameIn="businessNum"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="业务编号"*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withBM"*/}
                                            {/*InputLabelName="是否涉及BM控制台"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withUAT"*/}
                                            {/*InputLabelName="是否需要UAT"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withCheck"*/}
                                            {/*InputLabelName="是否已走查"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withProductChildTask"*/}
                                            {/*InputLabelName="是否生成子任务"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withChildDemand"*/}
                                            {/*InputLabelName="是否子需求"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={2}>*/}
                                        {/*<RadioButton*/}
                                            {/*nameIn="withPlanReview"*/}
                                            {/*InputLabelName="是否完成方案评审"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*labelArray={labelArray}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={12}>

                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

FilterDemandManager.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        filterManagerDemandShow: state.reducer.buildDemand.filterManagerDemandShow,
        initialData: state.reducer.buildDemand.initialData,
        projectMembers: state.reducer.common.projectMembers,
        action : state.reducer.buildDemand.action

    }
};

export default connect(mapStateToProps)(withStyles(styles)(FilterDemandManager));