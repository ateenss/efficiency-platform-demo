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

const styles = theme => ({
    appBar: {
        position: 'relative',
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
        const {classes, content} = this.props;
        return (
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
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="外部系统接口调整"
                                            nameIn="ExternalSystemPortAdjust"
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
                <Grid item xs={4}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="外部系统配套改造"
                                            nameIn="ExternalSystemSetTransform"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="模块上线顺序要求"
                                            nameIn="ModuleOnLineSequenceRequire"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="内部子系统间接口调整"
                                            nameIn="InternalSubSystemPortAdjust"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="安全相关"
                                            nameIn="SafetyRelated"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="数据库修改点"
                                            nameIn="DatabaseModifyPoint"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="参数配置要求"
                                            nameIn="ParamConfigRequire"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="接口规范变更"
                                            nameIn="PortSpecificationChange"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="运维信息变更"
                                            nameIn="MaintenanceInfoChange"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiLineInput fullWidth disabled
                                            InputLabelName="部署需求调整"
                                            nameIn="DeploymentRequireAdjust"
                                            onChange={this.getContent}
                                            content={content}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
        );
    }
}

DevelopPlan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme: true})(DevelopPlan);