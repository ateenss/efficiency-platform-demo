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
import {editSave} from "../../actions/BuildProjectAction"
import store from '../../stores/index';
import Grid from '@material-ui/core/Grid';
import MultiSelect from "./MultiSelect";
import DataPicker from "./DataPicker"
import DesciptionInput from "./DescriptionInput"
import RadioButton from "./RadioButton"


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

class ProjectPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            projectContent:{

            }
        }
    }
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };
    handleSave=()=>{
        this.props.onClose(this.props.selectedValue);
        store.dispatch(editSave(this.state.projectContent));
    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            })
            this.setState({
                projectContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.projectContent, {
                [keyNote]: value.toString()
            })
            this.setState({
                projectContent:data
            })
        }
    };


    getState=e=>{
        this.setState({
            projectState:e.target.value
        })
    };

    render() {
        const {classes, onClose, selectedValue,buttonStyle, ...other} = this.props;

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
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="类型" nameIn="type" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="成员" nameIn="members" fullWidth/>
                        </Grid>
                        <Grid item xs={4}>
                            <MultiSelect onChange={this.getContent} InputLabelName="负责人" nameIn="head" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <DataPicker onStartChange={this.getContent} onEndChange={this.getContent}/>
                        </Grid>
                        <Grid item xs={12}>
                            <DesciptionInput onChange={this.getContent} nameIn="description"/>
                        </Grid>
                        {/*<Grid item xs={4}>*/}
                            {/*<RadioButton onChange={this.getContent}/>*/}
                        {/*</Grid>*/}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" className={buttonStyle}>
                        重置
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ProjectPopup.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const ProjectPopupWrapped = withStyles(styles)(ProjectPopup);
export default ProjectPopupWrapped