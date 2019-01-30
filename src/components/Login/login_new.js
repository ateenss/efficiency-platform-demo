import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';
import {bindActionCreators} from 'redux'
import {Input,Button,Message} from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';

//组件内部显示css
const styles = theme=>({
    card: {
        minWidth: 275,
        width:200,
        height:350,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

//登录输入框信息
const FIELDS = {
    email: {
        floatingLabelText: 'E-mail',
        hintText: 'Enter e-mail'
    },
    password: {
        floatingLabelText: 'Password',
        hintText: 'Enter password',
        type: 'password'
    }
};

class SimpleCard extends React.Component{
    constructor(props){
        super(props)
    }

    handleFormSubmit({email, password }) {
        console.log("刚把命令发送出去");
        console.log({ email, password });
        this.props.loginUser({ email, password });
    }

    // handleFormSubmit=value=>{
    //     console.log("刚把命令发送出去");
    //     console.log(value);
    //     const result={
    //         email:value.email,
    //         password:value.password
    //     };
    //     this.props.loginUser(result);
    // };


    textEmailField(classes){
        return(
            <TextField
                id="standard-with-placeholder"
                label="Input Email"
                placeholder="Email"
                className={classes.textField}
                margin="normal"
            />
        )
    };

    textPasswordField(classes){
        return(
            <TextField
                id="standard-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
            />
        )
    };


    render(){
        const { classes ,handleSubmit, errorMessage, isAuthenticating,pristine } = this.props;
        let submitProps = {};
        if (isAuthenticating) {
            submitProps = {
                disabled: true,
                icon: <CircularProgress size={30}/>,
                labelPosition: 'before'
            }
        }
        return (
            <div ref={(input) => this.wrapper = input} className="wrapperClass">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                            效率平台
                        </Typography>
                        <Typography variant="h4" component="h3" align="center">
                            Welcome
                        </Typography>
                        <form className="login-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Field
                                component={this.textEmailField.bind(this,classes)}
                                name="email"
                                key="email"
                            />
                            <Field
                                component={this.textPasswordField.bind(this,classes)}
                                name="password"
                                key="password"
                            />
                            <div className="error-message">{ errorMessage }</div>
                            <div className="hint">{pristine}</div>
                            <Button  size="large" color="primary" {...submitProps} className="login-button"
                                     variant="contained" type="submit" label="Login" >Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        const fieldHelper = FIELDS[field];

        if (!values[field]) {
            errors[field] = `${fieldHelper.floatingLabelText} is required.`;
        }
        else {
            if (field === "email" && !values[field].match(/^\S+@\S+\.\S+$/) ) {
                errors[field] = "Invalid email."
            }
        }
    });

    return errors;
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps=state=>{
    return {
        errorMessage: state.reducer.auth.error,
        isAuthenticating: state.reducer.auth.isAuthenticating
    }
};

//动作的自动触发执行
// const mapDispatchToProps=dispatch=>
//     bindActionCreators(actions,dispatch);

SimpleCard = reduxForm({
    form: 'login',
    fields: _.keys(FIELDS),
    validate
})(withStyles(styles)(SimpleCard));

export default connect(mapStateToProps, actions)(SimpleCard);
// export default withStyles(styles)(SimpleCard);
