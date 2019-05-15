import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {getProjects} from "../../actions/BuildProjectAction"
import {demandConst} from "../BuildDemand/DemandConst";
import {error} from "../../actions/NotificationAction";
import SingleSelect from "../SelfComponent/SingleSelect";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {getRecentIteration, getRecentIterationByProjectId} from "../../actions/IterationAction";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: "100%",
        marginTop: 0
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    association: {
        position: "absolute",
        top: "48px",
        width: "100%",
        background: "#FFFFFF",
        zIndex: "999",
        border: "1px solid #cecece"
    }
});


class CascadeSelect extends React.Component {
    state = {
        projects: [],
        curIterations : [],
        projectValue : "",
    };


    componentDidMount() {

        let self = this;

        getProjects().then(response => {

            if (response.data.respCode !== "00") {
                error(response.data.msg);
                return false;
            }

            this.setState({projects : response.data.data}, function(){

                for(let i in response.data.data){

                    if(response.data.data[i].currentProject){

                        self.setState({projectValue : response.data.data[i].id});

                        getRecentIteration().then(resp => {


                            self.setState({curIterations : resp.data.data})

                        }).catch(e => {
                            error("后台拉取数据失败", JSON.stringify(e));

                        });

                    }

                }


            });


        }).catch(e => {
            error("后台拉取数据失败", JSON.stringify(e));

        });


    }



    handleChange = (e) =>{

        let self = this;

        this.setState({projectValue : e.target.value});

        getRecentIterationByProjectId(e.target.value).then(resp => {

            if(!!resp.data.data && resp.data.data.length > 0){
                this.setState({iterationId : resp.data.data[0].id});
            }

            self.setState({curIterations : resp.data.data})

        }).catch(e => {
            error("后台拉取数据失败", JSON.stringify(e));

        });

    };

    renderValue = (e) =>{

        this.setState({iterationId : e.target.value});

        this.props.onChange({keyNote : "relatedIterationId", value : e.target.value})
    };

    render() {
        const {classes} = this.props;
        const {projects, curIterations} = this.state;
        let projectOptions = [];
        let defaultProject = "";
        for(let i in projects){

            let unit = projects[i];

            projectOptions.push({

                id : unit.id,
                name : unit.projectName
            })


        }
        let iterationOptions = [];
        let defaultIteration = "";
        for(let i in curIterations){

            let unit = curIterations[i];

            iterationOptions.push({
                id : unit.id,
                name : unit.iterationCode
            })

            if(i == 0){
                defaultIteration = unit.id;
            }

        }

        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Select style={{width:"100%"}}
                        value={this.state.projectValue}
                        onChange={this.handleChange}
                        name="projectId"
                    >
                        {
                            projectOptions.map((value, index) => {
                                return (
                                    <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Select style={{width:"100%"}}
                        name="版本"
                        onChange={this.renderValue}
                        value={this.state.iterationId}
                    >
                        {
                            iterationOptions.map((value, index) => {
                                return (
                                    <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </Grid>
            </Grid>
        );
    }
}

CascadeSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CascadeSelect);