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
import {saveReviewDemand, closeReviewDemand} from "../../actions/DemandAction"
import {connect} from "react-redux";
import InputField from "../SelfComponent/InputField"
import SingleSelect from "../SelfComponent/SingleSelect"
import {EDIT_DEMAND, REVIEW_DEMAND} from "../../actions/types";


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
const status =[
    {id : 0,  name : "未评审"},{id : 1,  name : "评审不通过"},{id : 2,  name : "评审通过"}
];


class ReviewDemand extends React.Component {
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
        if (nextProps.action === REVIEW_DEMAND) {
            this.setState({
                defaultContent:{
                    status: 0,
                    demandDevOwnerId: this.props.projectMembers[0].id,
                    iterationId : this.props.iteration[0].id,
                    id:nextProps.editData.id
                }
            });

        }

    }



    handleClose = () => {
        closeReviewDemand()
    };
    handleSave=()=>{

        saveReviewDemand(this.state.defaultContent);

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
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={!!this.props.openReviewDemand ? this.props.openReviewDemand : false}>
                <DialogTitle id="simple-dialog-title">评审需求 - {this.state.defaultContent["demandCode"]}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={12} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["demandDevOwnerId"]}
                                onChange={this.getContent}
                                InputLabelName="需求分派开发负责人"
                                nameIn="demandDevOwnerId"
                                nameArray={this.props.projectMembers}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["iterationId"]}
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="iterationId"
                                nameArray={iterationSelect}/>
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={this.state.defaultContent["status"]}
                                onChange={this.getContent}
                                InputLabelName="需求状态"
                                nameIn="status"
                                nameArray={status}/>
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

ReviewDemand.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    console.log("map数据:"+JSON.stringify(state.reducer.buildDemand.editData));
    return {
        openReviewDemand:state.reducer.buildDemand.openReviewDemand,
        editData : state.reducer.buildDemand.editData,
        action:state.reducer.buildDemand.action,
        projectMembers:state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(ReviewDemand));
