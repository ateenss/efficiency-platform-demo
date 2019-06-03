import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import MultiLineInput from "./MultiLineInput";
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
    iOSSwitchBase: {
        '&$iOSChecked': {
            color: theme.palette.common.white,
            '& + $iOSBar': {
                backgroundColor: '#52d869',
            },
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp,
        }),
    },
    iOSChecked: {
        transform: 'translateX(15px)',
        '& + $iOSBar': {
            opacity: 1,
            border: 'none',
        },
    },
    iOSBar: {
        borderRadius: 13,
        width: 42,
        height: 26,
        marginTop: -13,
        marginLeft: -21,
        border: 'solid 1px',
        borderColor: theme.palette.grey[400],
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
        width: 24,
        height: 24,
    },
    iOSIconChecked: {
        boxShadow: theme.shadows[1],
    },
});


class SelectThenInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: 'Cat in the Hat',
            age: '',
            message: "",
            error: false,
            selected : true,
            inputFocus : true,
            initialized : false,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!this.state.initialized){
            this.setState({selected : nextProps.defaultChecked, initialized : true});
        }
    }

    handleChange = (e) => {
        this.props.onChange({keyNote: e.target.name, value: e.target.value})
    };

    handleSwitch = (event) => {
        this.setState({selected : event.target.checked});
        if(!event.target.checked){
            this.setState({showTextInput : !this.state.showTextInput})
        }else{
            this.setState({showTextInput : !this.state.showTextInput})
        }
        this.props.onChange({keyNote: this.props.nameIn, value: ""})
    };

    render() {
        const { classes ,InputLabelName,defaultValue,nameIn, ...others} = this.props;

        return (
            <div>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                classes={{
                                    switchBase: classes.iOSSwitchBase,
                                    bar: classes.iOSBar,
                                    icon: classes.iOSIcon,
                                    iconChecked: classes.iOSIconChecked,
                                    checked: classes.iOSChecked,
                                }}
                                checked={this.state.selected}
                                onChange={this.handleSwitch}

                            />
                        }
                        label={InputLabelName}
                    />
                </FormGroup>
                {this.state.showTextInput ?
                    <MultiLineInput classes={classes} InputLabelName={InputLabelName} defaultValue={defaultValue} nameIn={nameIn} {...others}/> : false
                }
            </div>
        );
    }
}

SelectThenInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectThenInput);