import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GlobalValidateRegex from "../../constants/GlobalValidateRegex";
import store from '../../stores/index';
import {hintPopUp} from "../../actions/BuildProjectAction"
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Task from "../views/TaskBoard";

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

const temp = {
    czym: {id: 1, name: "长泽雅美"}, zzh: {id: 2, name: "电话的"}, zzh2:{id:3,name:"哈哈哈"}
};


class AssociationInputField extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        message: "",
        error: false,
        show: false,
        value:"",
        association : [],
        trueValue :""
    };

    handleChange = (rules, e) => {

        this.setState({value : e.target.value});
        this.setState({show: true});

        let value = e.target.value;

        let newValue = value.split(",");

        newValue = newValue[newValue.length-1];

        let association = [];
        for(let i in temp){

            if(i.startsWith(newValue)){
                let associationUnit = {};

                associationUnit.name = temp[i].name;
                associationUnit.id = temp[i].id;
                association.push(associationUnit);
            }

        }

        this.setState({association: association});

    };

    onBLUR = (rules, e) => {


        if (rules.required) {
            if (!e.target.value) {
                this.setState({message: "必填", error: true});
                this.props.validate({name: e.target.name, hasError: true});

                return false;
            }
        }

        if (rules.maxLength && e.target.value) {
            let maxLength = parseInt(rules.maxLength);
            if (e.target.value.length > maxLength) {
                this.setState({message: "长度超限，最大[" + rules.maxLength + "]", error: true});
                this.props.validate({name: e.target.name, hasError: true});
                return false;
            }
        }

        if (rules.expr && e.target.value) {
            let regex = new RegExp(rules.expr);
            if (!regex.test(e.target.value)) {
                this.setState({message: "格式校验错误", error: true});
                this.props.validate({name: e.target.name, hasError: true});
                return false;
            }
        }

        this.setState({message: "", error: false});

        this.props.validate({name: e.target.name, hasError: false});

        return true;
    };

    handleListItemClick = (ret) =>{

        let value = this.state.value;
        let newValueArray = value.split(",");

        newValueArray[newValueArray.length-1] = ret.name;

        let trueValue = this.state.trueValue;

        trueValue = trueValue + ret.id + ",";

        this.setState({trueValue : trueValue, value : newValueArray.toString(), show:false});

        this.props.onChange({keyNote: this.props.nameIn, value: trueValue})

    };

    render() {
        const {classes, InputLabelName, defaultValue, nameIn, disabled, error} = this.props;
        let rules = {
            required: this.props.required,
            expr: this.props.expr,
            maxLength: this.props.maxLength
        };
        let ret = [];
        let self = this;
        if(!!this.state.association){

            ret = this.state.association.map((prop, key) => {

                return (<ListItem key={key}
                    button
                    selected={this.state.selectedIndex === prop.id}
                    onClick={self.handleListItemClick.bind(self, {id : prop.id , name : prop.name})}
                >
                    <ListItemText primary={prop.name}/>
                </ListItem>);
            });
        }
        return (
            <form className={classes.container} noValidate autoComplete="off" style={{position: "relative"}}>
                <TextField
                    disabled={disabled}
                    id="standard-name"
                    label={InputLabelName}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange.bind(this, rules)}
                    name={nameIn}
                    inputProps={{
                        onBlur: this.onBLUR.bind(this, rules)
                    }}
                    fullWidth
                    type="email"
                    error={this.state.error}
                    value={this.state.value}
                />
                {this.state.show ?
                    <List component="nav" className={classes.association}>
                        {ret}
                        < Divider />
                    </List> : ""
                }
                <Typography color="error">{this.state.message}</Typography>
            </form>
        );
    }
}

AssociationInputField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssociationInputField);