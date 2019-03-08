import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {buildSaveDispatch} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "./MultiSelect";
import DatePicker from "./DatePicker"
import DesciptionInput from "./DescriptionInput"
import TigerInput from "../Input/TigerInput"
import {pullBuildProjectInitial} from "../../actions/BuildProjectAction"
import {connect} from "react-redux";
import InputField from "./InputField"
import SingleSelect from "./SingleSelect"


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle:{
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    }

};

let tempdata=null;
class BuildProjectMain extends React.Component {
    constructor(props) {
        super(props);
        // pullBuildProjectInitial();
        this.state = {
            openTask: false,
            projectContent:{

            }
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }
    //todo:由于dialog的开关是通过props传进来的，如果在这里组织渲染的话，就不能改变dialog的弹出状态
    //todo:目前发现，将初始化函数放入到本实例中，导致通过connect方式无法正常获取初始化数据


    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleSave=()=>{
        this.props.onClose(this.props.selectedValue);
        const temp=this.state.projectContent;
        temp["projectState"]="正在进行";
        temp["number"]=tempdata;
        store.dispatch(buildSaveDispatch(temp));
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
        const {classes, onClose, selectedValue,initialData,buttonStyle, ...other} = this.props;
        const rand=Math.floor(Math.random()*40)+1;
        tempdata=rand;
        /*const commonArray=[ '云闪付团队',
            '二维码团队',
            '安全攻防团队',
            '移动支付团队',
            '全渠道',
            '多渠道',
            '云平台',
            '信息总中心'];*/
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={8}>
                            <TextField
                                autoFocus
                                id="name"
                                label="项目名称"
                                type="email"
                                name="name"
                                onChange={this.getContent}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputField InputLabelName="项目编号" defaultValue={rand} nameIn="number"  disabled={true}/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="type" nameArray={initialData.type}/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="members" nameArray={initialData.members}/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="head" nameArray={initialData.head}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="startTime" InputLabelName="开始时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="endTime" InputLabelName="结束时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="buildTime" InputLabelName="创建时间" onDateChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={4}>
                            <SingleSelect onChange={this.getContent} InputLabelName="状态" nameIn="projectState" defaultValue="正在进行" disabled={true}/>
                        </Grid>
                        {/*<Grid item xs={4}>
                            <TigerInput name="TigerInput"/>
                        </Grid>*/}
                        <Grid item xs={12}>
                            <DesciptionInput onChange={this.getContent} nameIn="description"/>
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                            {/*<TigerInput/>*/}
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

BuildProjectMain.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    // console.log("map数据:"+state.reducer.buildProject.addProjects);
    return {
        initialData:state.reducer.buildProject.initialData
    }
};

export default connect(mapStateToProps)(withStyles(styles)(BuildProjectMain));