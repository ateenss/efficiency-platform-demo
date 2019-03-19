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
        temp["DemandID"]=this.props.randomNum;
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
                                nameIn="DemandName"
                                onChange={this.getContent}
                                InputLabelName="需求名称"
                                defaultValue={this.state.defaultContent["DemandName"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField
                                InputLabelName="需求ID"
                                nameIn="DemandID"
                                disabled={true}
                                defaultValue={this.state.defaultContent["DemandID"]}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["DemandDevHead"]}
                                onChange={this.getContent}
                                InputLabelName="需求分派开发负责人"
                                nameIn="DemandDevHead"
                                nameArray={initialData.DemandDevHead}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["DemandType"]}
                                onChange={this.getContent}
                                InputLabelName="需求类型"
                                nameIn="DemandType"
                                nameArray={initialData.DemandType}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["DemandStatus"]}
                                onChange={this.getContent}
                                InputLabelName="需求状态"
                                nameIn="DemandStatus"
                                nameArray={initialData.DemandStatus}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["DemandMember"]}
                                onChange={this.getContent}
                                InputLabelName="需求人员"
                                nameIn="DemandMember"
                                nameArray={initialData.DemandMember}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["DemandScale"]}
                                onChange={this.getContent}
                                InputLabelName="需求规模"
                                nameIn="DemandScale"
                                nameArray={initialData.DemandScale}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["DemandPriority"]}
                                onChange={this.getContent}
                                InputLabelName="需求优先级"
                                nameIn="DemandPriority"
                                nameArray={initialData.DemandPriority}
                                />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect
                                defaultValue={this.state.defaultContent["AssociatedVersion"]}
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="AssociatedVersion"
                                nameArray={initialData.AssociatedVersion}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                defaultValue={this.state.defaultContent["DemandAcceptTime"]}
                                nameIn="DemandAcceptTime"
                                InputLabelName="需求受理时间"
                                onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker
                                defaultValue={this.state.defaultContent["DemandPassTime"]}
                                nameIn="DemandPassTime"
                                InputLabelName="需求评审通过时间"
                                onDateChange={this.getContent}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="DemandFromDepart"
                                onChange={this.getContent}
                                InputLabelName="需求来源部门"
                                defaultValue={this.state.defaultContent["DemandFromDepart"]}
                            />
                        </Grid>


                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="TrafficStatic"
                                onChange={this.getContent}
                                InputLabelName="业务量统计方式"
                                defaultValue={this.state.defaultContent["TrafficStatic"]}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="BusinessNum"
                                onChange={this.getContent}
                                InputLabelName="业务编号"
                                defaultValue={this.state.defaultContent["BusinessNum"]}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="BusinessTrack"
                                InputLabelName="是否业务量跟踪"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["BusinessTrack"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="WithBM"
                                InputLabelName="是否涉及BM控制台"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["WithBM"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="WithUAT"
                                InputLabelName="是否需要UAT"
                                onChange={this.getContent}
                                defaultValue={this.state.defaultContent["WithUAT"]}
                                labelArray={labelArray}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput defaultValue={this.state.defaultContent["DemandNote"]} onChange={this.getContent} InputLabelName="需求备注" nameIn="DemandNote"/>
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
