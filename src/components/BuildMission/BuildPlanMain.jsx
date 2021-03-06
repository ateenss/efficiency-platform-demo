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
import {closeBuildPlan,  submitAndPlan} from "../../actions/BuildMissionAction"
import Grid from '@material-ui/core/Grid';
import MultiLineInput from "../SelfComponent/MultiLineInput"
import permProcessor from "../../constants/PermProcessor";
import MyQuill from "../SelfComponent/MyQuill";
import {green} from "@material-ui/core/colors";
import {validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";


const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow: "none",
        color: "#292929",
        background: "#f5f5f5",
        textAlign: "center"
    },
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
        marginTop: "18px",
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
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonRoot:{
        background:"#4DAF7C",
        color:"#FFF",
        '&:hover':{
            background:"#4DAF7C",

        }
    }


});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class BuildPlanMain extends React.Component {
    state = {
        open: false,
        planContent: "11",
        perm: permProcessor.init('task'),
        loading : false,
        success : false
    };


    handleClose = () => {
        store.dispatch(closeBuildPlan());
    };

    savePlan = () => {
        let tempContent = this.state.planContent;
        tempContent["taskId"] = this.props.tempBoardToDetail.taskId;
        tempContent["saveOrSubmit"] = 0;
        if (permProcessor.bingo('submitAndSavePlan', this.state.perm)) {


            let ret = validating(tempContent, "devPlanProps");
            if(!ret.result){
                error(ret.message);
                return false;
            }

            submitAndPlan(tempContent);
        }
    };

    submitPlan = () => {
        let tempContent = this.state.planContent;
        tempContent["taskId"] = this.props.tempBoardToDetail.taskId;
        tempContent["saveOrSubmit"] = 1;
        if (permProcessor.bingo('submitAndSavePlan', this.state.perm)) {


            let ret = validating(tempContent, "devPlanProps");
            if(!ret.result){
                error(ret.message);
                return false;
            }

            submitAndPlan(tempContent);
        }
    };

    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value
            });
            this.setState({
                planContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.planContent, {
                [keyNote]: value
            });
            this.setState({
                planContent: data
            })
        }
    };


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === "OPEN_BUILD_PLAN") {
            if (nextProps.tempDemandTaskPlan) {
                this.setState({
                    planContent: nextProps.tempDemandTaskPlan
                })
            }
        }
    }


    render() {
        const {classes, buildPlanShow, tempDemandTaskPlan} = this.props;
        const {planContent} = this.state;
        const {success, loading} = this.state;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
            [classes.buttonRoot] : !success

        });
        return (
            <div>
                <Dialog
                    fullScreen
                    open={buildPlanShow}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                编辑开发方案
                            </Typography>
                            <Button color="inherit" onClick={this.savePlan}>
                                保存
                            </Button>

                            <Button onClick={this.submitPlan} variant="contained"  className={buttonClassname} disabled={loading}>
                                提交
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} className={classes.quillWrapper}>
                                    <MyQuill
                                        classStyle={classes.quillIn}
                                        nameIn="overallPlan"
                                        placeholder="请输入整体方案描述"
                                        onChange={this.getContent}
                                        defaultValue={planContent.overallPlan}
                                        readOnly={false}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="外部系统接口调整"
                                                    nameIn="outerSysInterfaceChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.outerSysInterfaceChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="是否支持灰度功能"
                                                    nameIn="supportGrayEnv"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.supportGrayEnv}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="灾备影响性评估"
                                                    nameIn="disasterRecoveryAssessment"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.disasterRecoveryAssessment}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="生产影响性评估"
                                                    nameIn="productEnvAssessment"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.productEnvAssessment}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={8}>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="外部系统配套改造"
                                                    nameIn="outerSysChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.outerSysChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="模块上线顺序要求"
                                                    nameIn="moduleDeploySequence"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.moduleDeploySequence}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="内部子系统间接口调整"
                                                    nameIn="innerSysInterfaceChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.innerSysInterfaceChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="安全相关"
                                                    nameIn="safety"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.safety}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="数据库修改点"
                                                    nameIn="dbChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.dbChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="参数配置要求"
                                                    nameIn="config"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.config}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="接口规范变更"
                                                    nameIn="interfaceChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.interfaceChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="运维信息变更"
                                                    nameIn="operationChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.operationChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="部署需求调整"
                                                    nameIn="deploymentChange"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.deploymentChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="五高影响性"
                                                    nameIn="high5Assessment"
                                                    onChange={this.getContent}
                                                    defaultValue={planContent.high5Assessment}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

BuildPlanMain.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        buildPlanShow: state.reducer.buildMission.buildPlanShow,
        tempBoardToDetail: state.reducer.buildMission.tempBoardToDetail,
        tempDemandTaskPlan: state.reducer.buildMission.tempDemandTaskPlan,
        action: state.reducer.buildMission.action,
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(BuildPlanMain));

