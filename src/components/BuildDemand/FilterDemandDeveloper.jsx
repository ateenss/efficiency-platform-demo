import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {connect} from "react-redux";
import store from '../../stores/index';
import {closeFilterDeveloperDemand,filterSaveDeveloperDemand} from "../../actions/BuildDemandAction"
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
    list: {
        width: "100%",
        left:"5px",
        right:"0",
        paddingLeft:"0px",
        paddingRight:"0px",
        marginRight:"0px",
        marginLeft:"0px",
        borderRight:"0px"
    },
    fullList: {
        width: 'auto',
    },
    root:{
        paddingLeft: 0,
    },
    InDiv:{
        width: "98%",
        left:"10px",
        paddingLeft:"18px",
        paddingBottom:"10px"
    },
    headDiv:{
        width: "100%",
        left:"0px",
        paddingLeft:"0px",
        paddingRight:"0px",
        paddingBottom:"10px",
        height:"80px"
    },
    headLetter:{
        marginLeft: "15px"
    },
    pinkAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: pink[500],
    },
};

class FilterDemandManager extends React.Component {
    state = {
    };

    closeFilter=()=>{
        store.dispatch(closeFilterDeveloperDemand());
    };

    saveFilter=()=>{
        store.dispatch(filterSaveDeveloperDemand(this.state.filterContent));
        store.dispatch(closeFilterDeveloperDemand());
    };
    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.filterContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                filterContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.filterContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                filterContent:data
            })
        }
    };

    render() {
        const { classes,filterDeveloperDemandShow,initialData } = this.props;
        const labelArray=["是","否"];

        const sideList = (
            <div className={classes.list}>
                <div className={classes.headDiv}>
                <Grid item xs={12} >
                        <Grid item xs={12}>
                            <div className={classes.root}>
                                <AppBar position="static" color="default" className={classes.head}>
                                    <Toolbar disableGutters={true}>
                                        <Typography variant="h6" color="inherit" className={classes.headLetter}>
                                            需求筛选
                                        </Typography>
                                        <Button color="inherit" className={classes.newBuildButton}
                                                onClick={this.saveFilter}>
                                            <Avatar className={classes.pinkAvatar}>
                                                <PageviewIcon/>
                                            </Avatar>
                                        </Button>
                                    </Toolbar>
                                </AppBar>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.InDiv}>
                <Grid container spacing={16} >
                    <Grid item xs={2} >
                        <InputField
                            nameIn="DemandName"
                            onChange={this.getContent}
                            InputLabelName="需求名称"
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <MultiSelect onChange={this.getContent} InputLabelName="需求分派开发负责人" nameIn="DemandDevHead" nameArray={initialData.DemandDevHead}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求类型" nameIn="DemandType" nameArray={initialData.DemandType}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求状态" nameIn="DemandStatus" nameArray={initialData.DemandStatus}/>
                    </Grid>
                    <Grid item xs={2}>
                        <SingleSelect onChange={this.getContent} InputLabelName="需求优先级" nameIn="DemandPriority" nameArray={initialData.DemandPriority} defaultValue="p3"/>
                    </Grid>
                    <Grid item xs={2}>
                        <MultiSelect onChange={this.getContent} InputLabelName="关联版本" nameIn="AssociatedVersion" nameArray={initialData.AssociatedVersion}/>
                    </Grid>

                    <Grid item xs={2}>
                        <InputField
                            nameIn="BusinessNum"
                            onChange={this.getContent}
                            InputLabelName="业务编号"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="WithBM"
                            InputLabelName="是否涉及BM控制台"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RadioButton
                            nameIn="WithUAT"
                            InputLabelName="是否需要UAT"
                            onChange={this.getContent}
                            labelArray={labelArray}
                        />
                    </Grid>
                </Grid>
                </div>

            </div>
        );


        return (
            <div>
                <Drawer anchor="top" open={filterDeveloperDemandShow} onClose={this.closeFilter}>
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
        filterDeveloperDemandShow:state.reducer.buildDemand.filterDeveloperDemandShow,
        initialData:state.reducer.buildDemand.initialData,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(FilterDemandManager));