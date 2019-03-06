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
import {editReSave} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "./MultiSelect";
import DataPicker from "./DataPicker"
import DesciptionInput from "./DescriptionInput"
import RadioButton from "./RadioButton"
import {connect} from "react-redux";
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

class ProjectPopupReEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent:{
                }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.keyNote>-1){
            this.setState({
                projectContent:nextProps.addProjects[nextProps.keyNote]
            })
        }
    }


    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleReSave=()=>{
        this.props.onClose(this.props.selectedValue);
        console.log("以下是再编辑测试");
        store.dispatch(editReSave({keyNote:this.props.keyNote,ReContent:this.state.projectContent}));
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
        const {classes, onClose, selectedValue,keyNote,buttonStyle, addProjects,...other} = this.props;
        const {projectContent}=this.state;
        const commonArray=[ '云闪付团队',
            '二维码团队',
            '安全攻防团队',
            '移动支付团队',
            '全渠道',
            '多渠道',
            '云平台',
            '信息总中心'];
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">创建新项目</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                id="name"
                                label="项目名称"
                                type="email"
                                name="name"
                                onChange={this.getContent}
                                defaultValue={projectContent.name}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="type" defaultValue={projectContent.type}
                                         nameArray={commonArray} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="members" defaultValue={projectContent.members}
                                         nameArray={commonArray} />
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="head" defaultValue={projectContent.head}
                                         nameArray={commonArray} />
                        </Grid>
                        <Grid item xs={12}>
                            <DataPicker onStartChange={this.getContent} onEndChange={this.getContent} startValue={projectContent.startTime} endValue={projectContent.endTime}/>
                        </Grid>
                        <Grid item xs={4}>
                            <SingleSelect onChange={this.getContent}  nameIn="projectState" defaultValue={projectContent.projectState} />
                        </Grid>
                        <Grid item xs={12}>
                            <DesciptionInput onChange={this.getContent} nameIn="description" defaultValue={projectContent.description}/>
                        </Grid>


                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        取消
                    </Button>
                    <Button onClick={this.handleReSave} color="primary">
                        保存修改
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ProjectPopupReEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        addProjects:state.reducer.buildProject.addProjects
    }
};

export default connect(mapStateToProps)(withStyles(styles)(ProjectPopupReEdit));
