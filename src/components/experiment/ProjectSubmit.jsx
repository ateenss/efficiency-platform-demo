import React from 'react';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ReactQuill from "react-quill";
import store from "../../stores";

class TaskEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            openTask: false,
            data: {}
        }
    }


    render() {
        return (
            <div></div>
        )
    }
}