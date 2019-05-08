import React from 'react';
import {withStyles} from '@material-ui/core/styles';

// @material-ui/icons
// core components
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Check";

import GlobalValidateRegex from "../../constants/GlobalValidateRegex.jsx"
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import {connect} from "react-redux";

//组件内部显示css
const styles = {
    search: {
        marginLeft: "0",
        marginRight: "0",
    },
    inputBase:{
        paddingTop:"0",
        paddingBottom:"5px"
    }
    //
    // textField: {
    //     margin: '15px 0 15px 0',
    // }
};


class SearchTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curValue: "",
            prevValue: "",
            actualResult:""
        };
    }

    handleSearch = (e) => {
        // console.log(324242423423);
        // this.props.onClick(e);
        this.setState({
            actualResult:e.target.value
        })
    };

    submit=()=>{
        this.props.onClick({actualResult:this.state.actualResult,testCase:this.props.testCase});
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.clearInput){
            // this.setState()
        }
    }


    render() {
        const {classes, ...rest} = this.props;
        return (
            <TextField className={classes.search}
                       name="iteration"
                       margin="dense"
                       InputProps={{
                           endAdornment: <InputAdornment
                               style={{color: "rgba(0, 0, 0, 0.54)"}}><SearchIcon style={{marginBottom:"6px"}} onClick={this.submit}/></InputAdornment>,
                           classes:{
                                   input : classes.inputBase
                           }
                       }}
                       onChange={this.handleSearch}
                       variant="standard"


            />

        )
    }
}
const mapStateToProps = (state) => {
    return {
        openTestCaseEditor: state.reducer.buildMission.openTestCaseEditor,
        testCase:state.reducer.buildMission.testCase,
        action:state.reducer.buildMission.action,
        singleTestCase:state.reducer.buildMission.singleTestCase,
        demandId : state.reducer.buildMission.demandId
    }
};

export default connect(mapStateToProps)(withStyles(styles)(SearchTextField));

// export default withStyles(styles)(SearchTextField);
