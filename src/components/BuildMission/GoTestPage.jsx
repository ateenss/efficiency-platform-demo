import DialogTitle from '@material-ui/core/DialogTitle';
import MultiSelect from "../SelfComponent/MultiSelect";
import Dialog from '@material-ui/core/Dialog';
import store from "../../stores";
import {closeAssignGoTest, doAssignGoTest, goToTest, init} from "../../actions/BuildMissionAction";
import React from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import permProcessor from "../../constants/PermProcessor";



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class GoTestPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignContent:null,
            errorList: {},
            perm: permProcessor.init('task')
        };
    }
    openAssignGoTest=()=>{
        let temp=this.props.tempAssignGoTest;
        temp["goTestMan"]=this.state.assignContent.goTestMan[0];
        if (permProcessor.bingo('goToTest', this.state.perm)) {
            goToTest(temp,this.props.demands.taskId);
        }else{
            console.log("您没有此项权限");
        }

    };

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value
            });
            this.setState({
                assignContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value
            });
            this.setState({
                assignContent:data
            })
        }
    };
    validate = (keyValue) => {

        let errorList = this.state.errorList;
        errorList[keyValue.name] = keyValue.hasError;

        this.setState({errorList: errorList});
    };
    render() {
        const {classes,projectMembers,assignGoTestShow } = this.props;
        return(
            <Dialog  onClose={()=>store.dispatch(closeAssignGoTest())} aria-labelledby="simple-dialog-title" open={assignGoTestShow}>
                <DialogTitle id="simple-dialog-title">走查状态变化</DialogTitle>
                <DialogContent>
                        <MultiSelect
                            nameArray={projectMembers}
                            onChange={this.getContent}
                            InputLabelName="指定走查人"
                            nameIn="goTestMan"
                            validate={this.validate}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.openAssignGoTest}>开始走查</Button>
                </DialogActions>

            </Dialog>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        demands:state.reducer.buildMission.demands,
        projectMembers:state.reducer.common.projectMembers,
        assignGoTestShow:state.reducer.buildMission.assignGoTestShow,
        tempAssignGoTest:state.reducer.buildMission.tempAssignGoTest
    }
};

export default connect(mapStateToProps)(withStyles(styles)(GoTestPage));


