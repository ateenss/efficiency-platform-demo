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
import DatePicker from "../SelfComponent/DatePicker"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {closeAddIteration, saveIteration} from "../../actions/IterationAction";


const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttonStyle: {
        textAlign: 'center',
        position: 'absolute',
        right: 0,
    }

};

class AddIteration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            iterationContent: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({iterationContent : nextProps.editData, action:nextProps.action});

    }

    handleClose = () => {
        closeAddIteration();
    };
    handleSave = () => {
        saveIteration(this.state.action, this.state.iterationContent);
    };


    getContent = e => {
        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.iterationContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                iterationContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.iterationContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                iterationContent: data
            })
        }
    };


    render() {
        const {classes, onClose, selectedValue, initialData, buttonStyle, randomNum, hintMessage, ...other} = this.props;

        const labelArray = ["是", "否"];
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">新增版本</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8}>
                        <Grid item xs={8}>
                            <InputField
                                nameIn="iterationName"
                                onChange={this.getContent}
                                InputLabelName="版本名称"
                                defaultValue={this.state.iterationContent.iterationName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <SingleSelect onChange={this.getContent} InputLabelName="版本负责人" nameIn="iterationOwner"
                                          nameArray={initialData}
                                          defaultValue={this.state.iterationContent.iterationOwner}

                            />

                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="testDate" InputLabelName="提测时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.testDate}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="publishDate" InputLabelName="发布时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.publishDate}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="deliveryDate" InputLabelName="上线时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.deliveryDate}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="developPlanSubmitDate" InputLabelName="开发方案提交时间"
                                        onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.developPlanSubmitDate}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="codeReviewDate" InputLabelName="代码走查时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.codeReviewDate}/>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePicker nameIn="ciDate" InputLabelName="持续集成执行时间" onDateChange={this.getContent}
                                        defaultValue={this.state.iterationContent.ciDate}/>
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

AddIteration.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    console.log("map数据:"+JSON.stringify(state.reducer.iteration.editData));
    return {
        initialData: state.reducer.iteration.initialData,
        editData : !!state.reducer.iteration.editData ? state.reducer.iteration.editData : "",
        action : state.reducer.iteration.action
    }
};

export default connect(mapStateToProps)(withStyles(styles)(AddIteration));