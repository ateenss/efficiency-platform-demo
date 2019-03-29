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


const styles = theme => ({
    appBar: {
        position: 'relative',
        boxShadow:"none",
        color:"#292929",
        background:"#f5f5f5",
        textAlign:"center"
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
    }

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class BuildPlanMain extends React.Component {
    state = {
        open: false,
        planContent: null
    };


    handleClose = () => {
        store.dispatch(closeBuildPlan());
    };

    savePlan = () => {
        store.dispatch(saveBuildPlan(this.state.planContent));
        store.dispatch(closeBuildPlan());
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
        const {classes, buildPlanShow} = this.props;
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
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={8}>
                        <Grid item xs={8}>
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
                                    <MultiLineInput fullWidth
                                                    InputLabelName="外部系统接口调整"
                                                    nameIn="externalSystemPortAdjust"
                                                    onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="是否支持灰度功能"
                                                    nameIn="IsOrNotSupportGrayScale"
                                                    onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="灾备影响性评估"
                                                    nameIn="DisasterImpactAssessment"
                                                    onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <MultiLineInput fullWidth
                                                    InputLabelName="生产影响性评估"
                                                    nameIn="ProductImpactAssessment"
                                                    onChange={this.getContent}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container spacing={8}>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="外部系统配套改造"
                                        nameIn="externalSystemSetTransform"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="模块上线顺序要求"
                                        nameIn="ModuleOnLineSequenceRequire"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="内部子系统间接口调整"
                                        nameIn="InternalSubSystemPortAdjust"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="安全相关"
                                        nameIn="SafetyRelated"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="数据库修改点"
                                        nameIn="DatabaseModifyPoint"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="参数配置要求"
                                        nameIn="ParamConfigRequire"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="接口规范变更"
                                        nameIn="PortSpecificationChange"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="运维信息变更"
                                        nameIn="MaintenanceInfoChange"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="部署需求调整"
                                        nameIn="DeploymentRequireAdjust"
                                        onChange={this.getContent}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MultiLineInput
                                        InputLabelName="五高影响性"
                                        nameIn="FiveHighImpact"
                                        onChange={this.getContent}
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
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData: state.reducer.buildMission.initialData,
        buildPlanShow: state.reducer.buildMission.buildPlanShow,
    }
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(BuildPlanMain));

