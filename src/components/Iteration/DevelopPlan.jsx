import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {connect} from "react-redux";
import store from '../../stores/index';
import {closeBuildPlan, saveBuildPlan} from "../../actions/BuildMissionAction"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import EditQuill from "../SelfComponent/EditQuill"
import MultiLineInput from "../SelfComponent/MultiLineInput"
import {closeDevelopPlan} from "../../actions/IterationAction";
import {CLOSE_DEVELOP_PLAN, GET_DEVELOP_PLAN} from "../../actions/types";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from "@material-ui/core/CssBaseline";
import classNames from 'classnames';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const drawerWidth = 200;


const styles = theme => ({

    flex: {
        flex: 1,
    },
    RightWrapper: {
        position: "relative",
        // marginTtop:"px",
        height: "900px",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "0px",
    },
    quillWrapper: {
        // marginLeft: "8px",
        marginTop: theme.spacing.unit,
        // marginRight: "8px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: "563px"
    },
    quillIn: {
        height: "500px"
    },
    LeftBottom: {
        position: "relative",
        top: "80px",
        left: "12px"
    },
    title: {
        paddingTop: "5px",
        paddingBottom: "10px",
        fontSize: "19px",
        fontWeight: "20",
        align: "center"
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow:"none",
        borderBottom:"1px solid #e0e0e0"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        top:"50px",
        background:"#f5f5f5"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        top:"50px",
        background:"#f5f5f5"

    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
        top:"50px",
        background:"#f5f5f5"

    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 1,
    },
    noneBorder:{
        borderRight:"0"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DevelopPlan extends React.Component {
    state = {
        open: false,
        planContent: {},
        tabValue: 0
    };



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    // savePlan = () => {
    //     store.dispatch(saveBuildPlan(this.state.planContent));
    //     store.dispatch(closeBuildPlan());
    // };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === GET_DEVELOP_PLAN) {
            this.setState({planContent: nextProps.developPlan});
        }
    }


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: !this.state.open });
    };
    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                planContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                planContent: data
            })
        }
    };

    render() {
        const {classes, content, theme} = this.props;
        return (
            <div className={classes.root}>
                {/*<AppBar style={{top:"50px",color:"#cecece", background:"#FFFFFF"}}*/}
                    {/*className={classNames(classes.appBar, {*/}
                        {/*[classes.appBarShift]: this.state.open,*/}
                    {/*})}*/}
                {/*>*/}
                    {/*<Toolbar disableGutters={!this.state.open}>*/}
                        {/*<IconButton*/}
                            {/*color="inherit"*/}
                            {/*aria-label="Open drawer"*/}
                            {/*onClick={this.handleDrawerOpen}*/}
                            {/*className={classNames(classes.menuButton, {*/}
                                {/*[classes.hide]: this.state.open,*/}
                            {/*})}*/}
                        {/*>*/}
                            {/*<MenuIcon />*/}
                        {/*</IconButton>*/}
                        {/*<Typography variant="h6" color="inherit" noWrap>*/}
                            {/*Mini variant drawer*/}
                        {/*</Typography>*/}
                    {/*</Toolbar>*/}
                {/*</AppBar>*/}
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                        paperAnchorLeft : classNames({
                            [classes.noneBorder] : this.state.open,
                        [classes.noneBorder] : !this.state.open,
                        })
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['开发方案', '模块1', '模块2', '模块3'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} className={classes.quillWrapper}>
                                        <EditQuill
                                            classStyle={classes.quillIn}
                                            nameIn="OverallSchemeDescription"
                                            placeholder="请输入整体方案描述"
                                            onChange={this.getContent}

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="外部系统接口调整"
                                                        nameIn="externalSystemPortAdjust"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="是否支持灰度功能"
                                                        nameIn="IsOrNotSupportGrayScale"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="灾备影响性评估"
                                                        nameIn="DisasterImpactAssessment"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="生产影响性评估"
                                                        nameIn="ProductImpactAssessment"
                                                        onChange={this.getContent}
                                                        content={content}

                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={8}>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="外部系统配套改造"
                                                        nameIn="externalSystemSetTransform"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="模块上线顺序要求"
                                                        nameIn="ModuleOnLineSequenceRequire"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="内部子系统间接口调整"
                                                        nameIn="InternalSubSystemPortAdjust"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="安全相关"
                                                        nameIn="SafetyRelated"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="数据库修改点"
                                                        nameIn="DatabaseModifyPoint"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="参数配置要求"
                                                        nameIn="ParamConfigRequire"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="接口规范变更"
                                                        nameIn="PortSpecificationChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="运维信息变更"
                                                        nameIn="MaintenanceInfoChange"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="部署需求调整"
                                                        nameIn="DeploymentRequireAdjust"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MultiLineInput fullWidth disabled
                                                        InputLabelName="五高影响性"
                                                        nameIn="FiveHighImpact"
                                                        onChange={this.getContent}
                                                        content={content}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                </main>
            </div>




        );
    }
}

DevelopPlan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme: true})(DevelopPlan);