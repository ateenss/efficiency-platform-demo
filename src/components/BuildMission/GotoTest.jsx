import DialogTitle from '@material-ui/core/DialogTitle';
import MultiSelect from "../SelfComponent/MultiSelect";
import Dialog from '@material-ui/core/Dialog';
import store from "../../stores";
import {closeAssignGoTest, doAssignGoTest,goToTest} from "../../actions/BuildMissionAction";
import React from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class GotoTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignContent:null,
            errorList: {}
        };
    }
    openAssignGoTest=()=>{
        // store.dispatch(doAssignGoTest(this.state.assignContent.goTestMan));
        let temp=this.props.tempAssignGoTest;
        temp["goTestMan"]=this.state.assignContent.goTestMan;
        goToTest(temp);
    };

    getContent=e=>{
        if (e.keyNote){
            const keyNote=e.keyNote;
            const value=e.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value.toString()
            });
            this.setState({
                assignContent:data
            })
        }else{
            const keyNote=e.target.name;
            const value=e.target.value;
            let data = Object.assign({}, this.state.assignContent, {
                [keyNote]: value.toString()
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

export default connect(mapStateToProps)(withStyles(styles)(GotoTest));


