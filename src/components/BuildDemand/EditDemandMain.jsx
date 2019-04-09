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
import DatePicker from "../SelfComponent/DatePicker"
import {closeEditDemand,saveEditDemand} from "../../actions/DemandAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {EDIT_DEMAND} from "../../actions/types";


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle:{
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    },
    gridStyle:{
        marginTop:"25px"
    },

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


class EditDemandMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            defaultContent:{
            },
            errorList: {}

        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === EDIT_DEMAND) {
            this.setState({
                defaultContent:nextProps.editData
            });

            console.log(JSON.stringify(nextProps.editData))
        }

    }


    handleClose = () => {
        store.dispatch(closeEditDemand());
    };
    handleSave=()=>{

        saveEditDemand(this.state.defaultContent);

    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                defaultContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                defaultContent:data
            })
        }
    };

    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };


    render() {
        const {classes,buttonStyle} = this.props;
        let iterationSelect = [];

        for(let i in this.props.iteration){
            let unit = this.props.iteration[i];
            let ret = {
                id : unit.id,
                name : unit.iterationCode
            }
            iterationSelect.push(ret);
        }

        const labelArray=["是","否"];
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">编辑需求 - {this.state.defaultContent["demandCode"]}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={12}>
                            <InputField
                                nameIn="demandName"
                                onChange={this.getContent}
                                InputLabelName="需求名称"
                                defaultValue={this.state.defaultContent["demandName"]}
                                validate={this.validate}
                                required
                                maxLength="10"
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandType"]}
                                onChange={this.getContent}
                                InputLabelName="需求类型"
                                nameIn="demandType"
                                nameArray={type}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["status"]}
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
                                defaultValue={this.state.defaultContent["demandSourceDept"]}
                                validate={this.validate}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandDevOwnerId"]}
                                onChange={this.getContent}
                                InputLabelName="需求分派开发负责人"
                                nameIn="demandDevOwnerId"
                                nameArray={this.props.projectMembers}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandOwnerId"]}
                                onChange={this.getContent}
                                InputLabelName="需求人员"
                                nameIn="demandOwnerId"
                                nameArray={this.props.projectMembers}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["iterationId"]}
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="iterationId"
                                nameArray={iterationSelect}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandScale"]}
                                onChange={this.getContent}
                                InputLabelName="需求规模"
                                nameIn="demandScale"
                                nameArray={scale}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandPriority"]}
                                onChange={this.getContent}
                                InputLabelName="需求优先级"
                                nameIn="demandPriority"
                                nameArray={priority}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["bmRequired"]}
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
                                defaultValue={this.state.defaultContent["uatRequired"]}
                                nameArray={uatRequired}/>
                        </Grid>
                        <Grid item xs={8} className={classes.gridStyle}>
                            <InputField
                                InputLabelName="关联外部系统"
                                nameIn="relatedOuterSys"
                                defaultValue={this.state.defaultContent["relatedOuterSys"]}
                                validate={this.validate}
                                onChange={this.getContent}
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

EditDemandMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        editDemandShow:state.reducer.buildDemand.editDemandShow,
        editData : state.reducer.buildDemand.editData,
        action:state.reducer.buildDemand.action,
        projectMembers: state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditDemandMain));
