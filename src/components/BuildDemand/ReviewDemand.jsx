import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {saveReviewDemand, closeReviewDemand} from "../../actions/DemandAction"
import {connect} from "react-redux";
import SingleSelect from "../SelfComponent/SingleSelect"
import { REVIEW_DEMAND} from "../../actions/types";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";
import TrueMuitiSelect from "../SelfComponent/TrueMuitiSelect";


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
                    status: !!nextProps.editData.status ? nextProps.editData.status : "",
                    demandDevOwnerId:!!nextProps.editData.demandDevOwnerId ? nextProps.editData.demandDevOwnerId : "",
                    id:nextProps.editData.id,
                    iterationId : !!nextProps.editData.iterationId ? nextProps.editData.iterationId : "",
                }
            });

        }

    }



    handleClose = () => {
        closeReviewDemand()
    };
    handleSave=()=>{

        let ret = validating(this.state.defaultContent, "reviewDemandProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }

        saveReviewDemand(this.state.defaultContent);

    };



    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent:data
            })
        }
    };


    render() {
        const {classes,buttonStyle} = this.props;
        let iterationSelect = [];

        let reviewDemand = {};
        if(!!this.props.editData){
            reviewDemand = this.props.editData;
        }
        for(let i in this.props.iteration){
            let unit = this.props.iteration[i];
            let ret = {
                id : unit.id,
                name : unit.iterationCode
            }
            iterationSelect.push(ret);
        }
        let projectMember4MultiSelect = [];
        let defualtValue4MultiSelect = [];
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };

            if(reviewDemand.demandDevOwnerId === member.id){
                defualtValue4MultiSelect.push(ret);
            }


            projectMember4MultiSelect.push(ret);
        }
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={!!this.props.openReviewDemand ? this.props.openReviewDemand : false}>
                <DialogTitle id="simple-dialog-title">评审需求 - {reviewDemand["demandCode"]}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={8} >
                        <Grid item xs={12} className={classes.gridStyle}>

                            <TrueMuitiSelect data={projectMember4MultiSelect} onChange={this.getContent}
                                             nameIn="demandDevOwnerId"
                                             label="需求分派开发负责人"
                                             singleSelect
                                             defaultValue={defualtValue4MultiSelect}

                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <SingleSelect
                                onChange={this.getContent}
                                InputLabelName="关联版本"
                                nameIn="iterationId"
                                nameArray={iterationSelect}
                                validateEl={Rules.reviewDemandProps.iterationId}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <SingleSelect
                                defaultValue={reviewDemand.status}
                                onChange={this.getContent}
                                InputLabelName="需求状态"
                                nameIn="status"
                                nameArray={status}
                                validateEl={Rules.reviewDemandProps.status}
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

ReviewDemand.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};


const mapStateToProps = (state) => {
    return {
        openReviewDemand:state.reducer.buildDemand.openReviewDemand,
        editData : state.reducer.buildDemand.editData,
        action:state.reducer.buildDemand.action,
        projectMembers:state.reducer.common.projectMembers
    }
};

export default connect(mapStateToProps)(withStyles(styles)(ReviewDemand));
