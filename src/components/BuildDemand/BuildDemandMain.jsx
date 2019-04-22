import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import {closeBuildDemand,saveDemand} from "../../actions/DemandAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {ADD_DEMAND} from "../../actions/types";
import {Rules, Regex, validate, validating} from "../../actions/validateAction";
import {error, success} from "../../actions/NotificationAction";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";

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


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle: {
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    gridStyle: {
        marginTop: "25px"
    },
    item: {
        paddingTop: "60px"
    },

};

class BuildDemandMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            defaultContent: {},
            errorList: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.action === ADD_DEMAND) {
            this.setState({
                defaultContent: {
                    demandType : 0,
                    status : 2,
                    demandScale:0,
                    demandPriority:0
                }
            })
        }

    }


    handleClose = () => {
        store.dispatch(closeBuildDemand());
    };
    handleSave = () => {

        let ret = validating(this.state.defaultContent, "demandProps");

        if(this.state.defaultContent.demandType === 1){

            if(!this.state.defaultContent.demandLinkCode){
                error("版本链接编号必填");
                return false;
            }
            if(!this.state.defaultContent.demandCode){
                error("版本编号必填");
                return false;
            }
        }

        if(!ret.result){
            error(ret.message);
            return false;
        }

        saveDemand(this.state.defaultContent);
    };

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

    render() {
        const {classes, buttonStyle} = this.props;
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
                label: member.name,
                group:member.deptName

            };
            projectMember4MultiSelect.push(ret);
        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} fullWidth maxWidth="xl">
                <DialogTitle id="simple-dialog-title">创建新需求</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <InputField
                                nameIn="demandName"
                                onChange={this.getContent}
                                InputLabelName="需求名称*"
                                validateEl={Rules.demandProps.demandName}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="需求类型"
                                nameIn="demandType"
                                nameArray={type}
                                validateEl={Rules.demandProps.demandType}
                                defaultValue={0}
                            />

                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <InputField
                                nameIn="demandCode"
                                onChange={this.getContent}
                                InputLabelName="版本编号"
                                validateEl={Rules.demandProps.demandCode}
                                disabled={this.state.defaultContent.demandType == 0 ? true : false}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <InputField
                                onChange={this.getContent}
                                InputLabelName="版本链接编号"
                                nameIn="demandLinkCode"
                                nameArray={type}
                                validateEl={Rules.demandProps.demandLinkCode}
                                disabled={this.state.defaultContent.demandType == 0 ? true : false}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="需求状态*"
                                nameIn="status"
                                nameArray={status}
                                validateEl={Rules.demandProps.status}
                                defaultValue={2}
                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="demandDevOwnerId"
                                             label="需求分派开发负责人"
                                             singleSelect
                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="demandOwnerId"
                                             label="需求人员"
                                             singleSelect
                                             />
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
                                defaultValue={0}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="需求优先级"
                                nameIn="demandPriority"
                                nameArray={priority}
                                defaultValue={0}
                            />
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="是否涉及BM控制台*"
                                nameIn="bmRequired"
                                nameArray={bmRequired}
                                validateEl={Rules.demandProps.bmRequired}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                nameIn="uatRequired"
                                InputLabelName="是否需要UAT*"
                                onChange={this.getContent}
                                nameArray={uatRequired}
                                validateEl={Rules.demandProps.uatRequired}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                InputLabelName="关联外部系统"
                                nameIn="relatedOuterSys"
                                onChange={this.getContent}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="demandSourceDept"
                                onChange={this.getContent}
                                InputLabelName="需求来源部门"
                                validateEl={Rules.demandProps.demandSourceDept}

                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

BuildDemandMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        buildDemandShow: state.reducer.buildDemand.buildDemandShow,
        projectMembers: state.reducer.common.projectMembers,
        action: state.reducer.buildDemand.action
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildDemandMain));
