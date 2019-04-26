import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {
    CLOSE_ITERATION_FILTER,
    OPEN_ITERATION_FILTER
} from "../../actions/types";
import {Rules} from "../../actions/validateAction";
import InputField from "../SelfComponent/InputField";
import Grid from "@material-ui/core/Grid";
import {Menu} from "@material-ui/core";
import {closeFilter} from "../../actions/IterationAction";

const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
    root:{
        zIndex:1200,

    },
    paper:{
        boxShadow:"none",
        padding:"20px 30px 30px 30px"
    }
});

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            defaultContent:{}
        };
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.action === OPEN_ITERATION_FILTER){

            this.setState({open : nextProps.openIterationFilter, anchorEl : nextProps.currentTarget});

            this.setState({defaultContent : !!nextProps.filters ? nextProps.filters : {}})

        }else if(nextProps.action === CLOSE_ITERATION_FILTER){


            this.setState({open : nextProps.openIterationFilter, anchorEl : nextProps.currentTarget})
        }
    }


    getContent = e => {

        if (e.keyNote) {
            const keyNote = e.keyNote;
            const value = e.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent: data
            })
        } else {
            const keyNote = e.target.name;
            const value = e.target.value;
            let data = Object.assign({}, this.state.defaultContent, {
                [keyNote]: value
            });
            this.setState({
                defaultContent: data
            })
        }
    };

    handleClose = () => {
        closeFilter(this.state.defaultContent);
    };


    render() {
        const { classes } = this.props;
        const { anchorEl, open } = this.state;
        let iterationSelect = [];
        for (let i in this.props.iteration) {
            let unit = this.props.iteration[i];
            let ret = {
                id: unit.id,
                name: unit.iterationCode
            }
            iterationSelect.push(ret);
        }

        let projectMember4MultiSelect = []
        for (let i in this.props.projectMembers) {

            let member = this.props.projectMembers[i];

            let ret = {
                id: member.id,
                label: member.name + "(" + member.username + ")",
                group:member.deptName

            };
            projectMember4MultiSelect.push(ret);
        }
        return (
            <div>
                <Menu open={Boolean(anchorEl)} anchorEl={anchorEl}  className={classes.root} onClose={this.handleClose}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={8}>
                                    <Grid item xs={6}>
                                        <InputField
                                            nameIn="iterationCode"
                                            onChange={this.getContent}
                                            InputLabelName="版本编号"
                                            validateEl={Rules.iterationProps.iterationCode}
                                            defaultValue={this.state.defaultContent.iterationCode}
                                        />
                                    </Grid>
                                    <Grid item xs={6} className={classes.gridStyle}>
                                        <InputField
                                            onChange={this.getContent}
                                            InputLabelName="版本名称"
                                            nameIn="iterationName"
                                            validateEl={Rules.iterationProps.iterationName}
                                            defaultValue={this.state.defaultContent.iterationName}
                                        />
                                    </Grid>
                                </Grid>



                            </Paper>
                </Menu>
            </div>
        );
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
};

const
    mapStateToProps = (state) => {
        return {
            openIterationFilter: state.reducer.iteration.openIterationFilter,
            action:state.reducer.iteration.action,
            currentTarget : state.reducer.iteration.currentTarget,
            projectMembers: state.reducer.common.projectMembers,
            filters : state.reducer.iteration.filters

        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        Filter
    ))
;
