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
import {pullBuildDemandInitial,buildSaveDemandDispatch,closeBuildDemand} from "../../actions/BuildDemandAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
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
    item:{
        paddingTop:"60px"
    },

};

class BuildDemandMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent:{

            }
        }
    }




    handleClose = () => {
        store.dispatch(closeBuildDemand());
    };
    handleSave=()=>{
        store.dispatch(closeBuildDemand());
        const s = new Intl.DateTimeFormat('zh-cn');
        const timeInitial= s.format(new Date());
        const temp=this.state.projectContent;
        const keyArray=["DemandScale","DemandPriority","BusinessTrack","WithBM","WithUAT","DemandAcceptTime","DemandPassTime"];
        const valueArray=["小型","p3","是","是","是",timeInitial,timeInitial];
        keyArray.map((value,key)=>{
            if(Object.keys(temp).indexOf(value)===-1){
                temp[value]=valueArray[key]
            }
        });

        temp["DemandID"]=this.props.randomNum;
        //todo:这是数据不一致的临时措施，这两个数据不知道如何定
        temp["DemandDemHead"]="稻草人";
        temp["DemandPassStartTime"]="2018-03-16/2018-03-19";
        store.dispatch(buildSaveDemandDispatch(temp));
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                projectContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                projectContent:data
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
                        <Grid item xs={8} >
                            <InputField
                                nameIn="DemandName"
                                onChange={this.getContent}
                                InputLabelName="需求名称"
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <InputField InputLabelName="需求ID" defaultValue={randomNum} nameIn="DemandID"  disabled={true}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="需求分派开发负责人" nameIn="DemandDevHead" nameArray={initialData.DemandDevHead}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="需求类型" nameIn="DemandType" nameArray={initialData.DemandType}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="需求状态" nameIn="DemandStatus" nameArray={initialData.DemandStatus}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="需求人员" nameIn="DemandMember" nameArray={initialData.DemandMember}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="需求规模" nameIn="DemandScale" nameArray={initialData.DemandScale} defaultValue="小型"/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <SingleSelect onChange={this.getContent} InputLabelName="需求优先级" nameIn="DemandPriority" nameArray={initialData.DemandPriority} defaultValue="p3"/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <MultiSelect onChange={this.getContent} InputLabelName="关联版本" nameIn="AssociatedVersion" nameArray={initialData.AssociatedVersion}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="DemandAcceptTime" InputLabelName="需求受理时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <DatePicker nameIn="DemandPassTime" InputLabelName="需求评审通过时间" onDateChange={this.getContent}/>
                        </Grid>

                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="DemandFromDepart"
                                onChange={this.getContent}
                                InputLabelName="需求来源部门"
                            />
                        </Grid>


                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="TrafficStatic"
                                onChange={this.getContent}
                                InputLabelName="业务量统计方式"
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <InputField
                                nameIn="BusinessNum"
                                onChange={this.getContent}
                                InputLabelName="业务编号"
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="BusinessTrack"
                                InputLabelName="是否业务量跟踪"
                                onChange={this.getContent}
                                labelArray={labelArray}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="WithBM"
                                InputLabelName="是否涉及BM控制台"
                                onChange={this.getContent}
                                labelArray={labelArray}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.gridStyle}>
                            <RadioButton
                                nameIn="WithUAT"
                                InputLabelName="是否需要UAT"
                                onChange={this.getContent}
                                labelArray={labelArray}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <DesciptionInput onChange={this.getContent} InputLabelName="需求备注" nameIn="DemandNote"/>
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

BuildDemandMain.propTypes = {
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

export default connect(mapStateToProps)(withStyles(styles)(BuildDemandMain));
