import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import store from '../../stores/index';
import {closeFilterManagerDemand, filterSaveManagerDemand} from "../../actions/BuildDemandAction"
import InputField from "../SelfComponent/InputField";
import Grid from '@material-ui/core/Grid';
import MultiSelect from "../SelfComponent/MultiSelect";
import DatePicker from "../SelfComponent/DatePicker";
import SingleSelect from "../SelfComponent/SingleSelect";
import RadioButton from "../SelfComponent/RadioButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PageviewIcon from '@material-ui/icons/Pageview';
import Avatar from '@material-ui/core/Avatar';
import pink from '@material-ui/core/colors/pink';


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
        marginLeft:"10px"
    }
};

class FilterDemandManager extends React.Component {
    state = {
        filterContent: {}
    };

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
                [keyNote]: value.toString()
            });
            this.setState({
                filterContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.filterContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                filterContent: data
            })
        }
    };

    render() {
        const {classes, filterManagerDemandShow, initialData} = this.props;
        const labelArray = ["是", "否"];

        const sideList = (
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
                    <Grid item xs={2}>
                        <InputField
                            nameIn="taskName"
                            onChange={this.getContent}
                            InputLabelName="需求名称"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <MultiSelect onChange={this.getContent} InputLabelName="开发负责人" nameIn="demandDevHead"
                                     nameArray={initialData.demandDevHead}/>
                    </Grid>
                    <Grid item xs={2}>
                        <MultiSelect onChange={this.getContent} InputLabelName="需求负责人" nameIn="demandDemHead"
                                     nameArray={initialData.demandDevHead}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求类型" nameIn="demandType"
                                      nameArray={initialData.demandType}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求状态" nameIn="demandStatus"
                                      nameArray={initialData.demandStatus}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求规模" nameIn="demandScale"
                                      nameArray={initialData.demandScale} defaultValue="小型"/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求优先级" nameIn="demandPriority"
                                      nameArray={initialData.demandPriority} defaultValue="p3"/>
                    </Grid>
                    <Grid item xs={2}>
                        <MultiSelect onChange={this.getContent} InputLabelName="关联版本" nameIn="associatedVersion"
                                     nameArray={initialData.associatedVersion}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DatePicker nameIn="DemandAcceptStartTime" InputLabelName="需求受理查询起始时间"
                                    onDateChange={this.getContent}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DatePicker nameIn="DemandAcceptEndTime" InputLabelName="需求受理查询结束时间"
                                    onDateChange={this.getContent}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DatePicker nameIn="demandPassStartTime" InputLabelName="需求评审通过查询起始时间"
                                    onDateChange={this.getContent}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DatePicker nameIn="demandPassEndTime" InputLabelName="需求评审通过查询结束时间"
                                    onDateChange={this.getContent}/>
                    </Grid>
                    <Grid item xs={2}>
                        <InputField
                            nameIn="businessNum"
                            onChange={this.getContent}
                            InputLabelName="业务编号"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withBM"
                            InputLabelName="是否涉及BM控制台"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withUAT"
                            InputLabelName="是否需要UAT"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withCheck"
                            InputLabelName="是否已走查"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withProductChildTask"
                            InputLabelName="是否生成子任务"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withChildDemand"
                            InputLabelName="是否子需求"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="withPlanReview"
                            InputLabelName="是否完成方案评审"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <Button fullWidth variant="contained" color="primary" onClick={this.saveFilter}
                                className={classes.searchButton}>
                            筛选
                        </Button>
                    </Grid>
                </Grid>
                </div>
            </div>
        );


        return (
            <div>
                <Drawer anchor="top" open={filterManagerDemandShow} onClose={this.closeFilter}>
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        {sideList}
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
    }
};

export default connect(mapStateToProps)(withStyles(styles)(FilterDemandManager));