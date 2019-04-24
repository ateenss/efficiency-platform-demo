import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {CLOSE_DEMAND_FILTER, OPEN_DEMAND_FILTER} from "../../actions/types";
import {Rules} from "../../actions/validateAction";
import SingleSelect from "../SelfComponent/SingleSelect";
import InputField from "../SelfComponent/InputField";
import Grid from "@material-ui/core/Grid";
import {Menu} from "@material-ui/core";
import {closeFilter} from "../../actions/DemandAction";
import {demandConst} from "./DemandConst";
import DatePicker from "../SelfComponent/DatePicker";

const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
    root:{
        zIndex:300,
    },
    paper:{
        boxShadow:"none",
        padding:"20px 30px 30px 30px"
    }
});

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            defaultContent:{}
        };
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.action === OPEN_DEMAND_FILTER){
            console.log(JSON.stringify(nextProps.filters))
            this.setState({open : nextProps.openDemandFilter, anchorEl : nextProps.currentTarget});
            this.setState({defaultContent : !!nextProps.filters ? nextProps.filters : {}})
        }else if(nextProps.action === CLOSE_DEMAND_FILTER){
            this.setState({open : nextProps.openDemandFilter, anchorEl : nextProps.currentTarget})
        }
    }


    getContent = e => {

        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent: data
            })
        }
    };

    handleClose = () => {
        closeFilter(this.state.defaultContent);
    };


    render() {
        const { classes } = this.props;
        const { anchorEl, open } = this.state;
        let iterationSelect = [];
        for (let i in this.props.iteration) {
            let unit = this.props.iteration[i];
            let ret = {
                id: unit.id,
                name: unit.iterationCode
            }
            iterationSelect.push(ret);
        }

        let projectMember4MultiSelect = []
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };
            projectMember4MultiSelect.push(ret);
        }
        return (
            <div>
                <Menu open={Boolean(anchorEl)} anchorEl={anchorEl}  className={classes.root} onClose={this.handleClose}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12}>
                                        <InputField
                                            nameIn="demandName"
                                            onChange={this.getContent}
                                            InputLabelName="需求名称"
                                            validateEl={Rules.demandProps.demandName}
                                            defaultValue={this.state.defaultContent.demandName}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求类型"
                                            nameIn="demandType"
                                            nameArray={demandConst.type}
                                            validateEl={Rules.demandProps.demandType}
                                            defaultValue={this.state.defaultContent.demandType}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <SingleSelect
                                            onChange={this.getContent}
                                            InputLabelName="需求状态"
                                            nameIn="status"
                                            nameArray={demandConst.status}
                                            validateEl={Rules.demandProps.status}
                                            defaultValue={this.state.defaultContent.status}
                                            />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <SingleSelect
                                        onChange={this.getContent}
                                        InputLabelName="是否涉及BM控制台"
                                        nameIn="bmRequired"
                                        nameArray={demandConst.bmRequired}
                                        validateEl={Rules.demandProps.bmRequired}
                                        defaultValue={this.state.defaultContent.bmRequired}

                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <SingleSelect
                                        nameIn="uatRequired"
                                        InputLabelName="是否需要UAT"
                                        onChange={this.getContent}
                                        nameArray={demandConst.uatRequired}
                                        validateEl={Rules.demandProps.uatRequired}
                                        defaultValue={this.state.defaultContent.uatRequired}

                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent}
                                                    defaultValue={this.state.defaultContent.startTime}
                                        />
                                    </Grid>
                                    <Grid item xs={3} className={classes.gridStyle}>
                                        <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent}
                                                    defaultValue={this.state.defaultContent.endTime}
                                        />
                                    </Grid>
                                    {/*<Grid item xs={3} className={classes.gridStyle}>*/}
                                        {/*<InputField*/}
                                            {/*nameIn="demandCode"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="版本编号"*/}
                                            {/*validateEl={Rules.demandProps.demandCode}*/}
                                            {/*disabled={this.state.defaultContent.demandType == 0 ? true : false}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={3} className={classes.gridStyle}>*/}
                                        {/*<InputField*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="版本链接编号"*/}
                                            {/*nameIn="demandLinkCode"*/}
                                            {/*nameArray={type}*/}
                                            {/*validateEl={Rules.demandProps.demandLinkCode}*/}
                                            {/*disabled={this.state.defaultContent.demandType == 0 ? true : false}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}


                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}*/}
                                                         {/*nameIn="demandDevOwnerId"*/}
                                                         {/*label="需求分派开发负责人"*/}
                                                         {/*singleSelect*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}

                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}*/}
                                                         {/*nameIn="demandOwnerId"*/}
                                                         {/*label="需求人员"*/}
                                                         {/*singleSelect*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}

                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<SingleSelect*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="关联版本"*/}
                                            {/*nameIn="iterationId"*/}
                                            {/*nameArray={iterationSelect}/>*/}
                                    {/*</Grid>*/}

                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<SingleSelect*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="需求规模"*/}
                                            {/*nameIn="demandScale"*/}
                                            {/*nameArray={scale}*/}
                                            {/*defaultValue={0}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<SingleSelect*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="需求优先级"*/}
                                            {/*nameIn="demandPriority"*/}
                                            {/*nameArray={priority}*/}
                                            {/*defaultValue={0}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}

                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<SingleSelect*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="是否涉及BM控制台*"*/}
                                            {/*nameIn="bmRequired"*/}
                                            {/*nameArray={bmRequired}*/}
                                            {/*validateEl={Rules.demandProps.bmRequired}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<SingleSelect*/}
                                            {/*nameIn="uatRequired"*/}
                                            {/*InputLabelName="是否需要UAT*"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*nameArray={uatRequired}*/}
                                            {/*validateEl={Rules.demandProps.uatRequired}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<InputField*/}
                                            {/*InputLabelName="关联外部系统"*/}
                                            {/*nameIn="relatedOuterSys"*/}
                                            {/*onChange={this.getContent}*/}
                                        {/*/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={4} className={classes.gridStyle}>*/}
                                        {/*<InputField*/}
                                            {/*nameIn="demandSourceDept"*/}
                                            {/*onChange={this.getContent}*/}
                                            {/*InputLabelName="需求来源部门"*/}
                                            {/*validateEl={Rules.demandProps.demandSourceDept}*/}

                                        {/*/>*/}
                                    {/*</Grid>*/}
                                </Grid>



                            </Paper>
                </Menu>
            </div>
        );
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
};

const
    mapStateToProps = (state) => {
        return {
            openDemandFilter: state.reducer.buildDemand.openDemandFilter,
            action:state.reducer.buildDemand.action,
            currentTarget : state.reducer.buildDemand.currentTarget,
            projectMembers: state.reducer.common.projectMembers,
            filters : state.reducer.buildDemand.filters

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        Filter
    ))
;
