import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "../SelfComponent/MultiSelect";
import DatePicker from "../SelfComponent/DatePicker"
import DesciptionInput from "../SelfComponent/DescriptionInput"
import {closeEditDemand,editDemandDispatch} from "../../actions/BuildDemandAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import CheckBox from "../SelfComponent/CheckBoxDouble"
import SingleSelect from "../SelfComponent/SingleSelect"
import RadioButton from "../SelfComponent/RadioButton"


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
        marginTop:"15px"
    },

};

class EditDemandMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            defaultContent:{
            },

        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.addDemand) {
            this.setState({
                defaultContent:nextProps.addDemand
            })
        }

    }



    handleClose = () => {
        store.dispatch(closeEditDemand());
    };
    handleSave=()=>{
        store.dispatch(closeEditDemand());
        const temp=this.state.defaultContent;
        temp["demandID"]=this.props.randomNum;
        temp["findNote"]=this.props.findNote;
        store.dispatch(editDemandDispatch(temp));
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


    render() {
        const {classes, onClose, selectedValue,initialData,buttonStyle,randomNum,hintMessage, ...other} = this.props;
        const labelArray=["是","否"];
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新需求</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8}>
                            <InputField
                                nameIn="taskName"
                                onChange={this.getContent}
                                InputLabelName="需求名称"
                                defaultValue={this.state.defaultContent["taskName"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                InputLabelName="需求ID"
                                nameIn="demandID"
                                disabled={true}
                                defaultValue={this.state.defaultContent["demandID"]}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["demandDevHead"]}
                                onChange={this.getContent}
                                InputLabelName="需求分派开发负责人"
                                nameIn="demandDevHead"
                                nameArray={initialData.demandDevHead}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandType"]}
                                onChange={this.getContent}
                                InputLabelName="需求类型"
                                nameIn="demandType"
                                nameArray={initialData.demandType}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandStatus"]}
                                onChange={this.getContent}
                                InputLabelName="需求状态"
                                nameIn="demandStatus"
                                nameArray={initialData.demandStatus}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["demandMember"]}
                                onChange={this.getContent}
                                InputLabelName="需求人员"
                                nameIn="demandMember"
                                nameArray={initialData.demandMember}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandScale"]}
                                onChange={this.getContent}
                                InputLabelName="需求规模"
                                nameIn="demandScale"
                                nameArray={initialData.demandScale}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandPriority"]}
                                onChange={this.getContent}
                                InputLabelName="需求优先级"
                                nameIn="demandPriority"
                                nameArray={initialData.demandPriority}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["associatedVersion"]}
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="associatedVersion"
                                nameArray={initialData.associatedVersion}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                defaultValue={this.state.defaultContent["demandAcceptTime"]}
                                nameIn="demandAcceptTime"
                                InputLabelName="需求受理时间"
                                onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                defaultValue={this.state.defaultContent["demandPassTime"]}
                                nameIn="demandPassTime"
                                InputLabelName="需求评审通过时间"
                                onDateChange={this.getContent}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="demandFromDepart"
                                onChange={this.getContent}
                                InputLabelName="需求来源部门"
                                defaultValue={this.state.defaultContent["demandFromDepart"]}
                            />
                        </Grid>


                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="trafficStatic"
                                onChange={this.getContent}
                                InputLabelName="业务量统计方式"
                                defaultValue={this.state.defaultContent["trafficStatic"]}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="businessNum"
                                onChange={this.getContent}
                                InputLabelName="业务编号"
                                defaultValue={this.state.defaultContent["businessNum"]}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="businessTrack"
                                InputLabelName="是否业务量跟踪"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["businessTrack"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="withBM"
                                InputLabelName="是否涉及BM控制台"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["withBM"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="withUAT"
                                InputLabelName="是否需要UAT"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["withUAT"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput defaultValue={this.state.defaultContent["demandNote"]} onChange={this.getContent} InputLabelName="需求备注" nameIn="demandNote"/>
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                        {/*<Typography color="error">{hintMessage}</Typography>*/}
                        {/*</Grid>*/}

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
        initialData:state.reducer.buildDemand.initialData,
        hintMessage:state.reducer.buildDemand.hintMessage,
        buildDemandShow:state.reducer.buildDemand.buildDemandShow,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(EditDemandMain));
