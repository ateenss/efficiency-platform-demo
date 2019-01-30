import _ from 'lodash';
import React, { Component } from 'react';
import  Card  from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import  * as actions from '../../actions/index';
import authReducer from "../../reducers/authReducer";


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
}

class Login extends Component {

    handleFormSubmit({ email, password }) {
        this.props.loginUser({ email, password });

    }

    renderField(fieldConfig, field) {
        return (
            <Field
                component={TextField}
                name={field}
                key={field}
                {...fieldConfig}
            />
        );
    }

    render () {
        const { handleSubmit, errorMessage, isAuthenticating } = this.props;

        let wrapperClass = 'login-wrapper'
        if (errorMessage) {
            wrapperClass += ' login-err-animation';
            setTimeout(() => {
                this.wrapper.classList.remove('login-err-animation');
            }, 3000)
        }

        let submitProps = {};
        if (isAuthenticating) {
            submitProps = {
                disabled: true,
                icon: <CircularProgress size={30}/>,
                labelPosition: 'before'
            }
        }

        return (
            <div ref={(input) => this.wrapper = input} className={wrapperClass}>
                <Card>
                    <form className="login-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <h2>Welcome!</h2><br />
                        <hr className="colorgraph" />
                        {_.map(FIELDS, this.renderField.bind(this))}
                        <div className="error-message">{ errorMessage }</div>
                        <Button {...submitProps} className="login-button" type="submit" label="Login" primary={true} />
                    </form>
                </Card>
            </div>
        );
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

function mapStateToProps(state) {
    const { error, isAuthenticating } = state.reducer.auth;
    return {
        errorMessage: error,
        isAuthenticating: isAuthenticating
    };
}

Login = reduxForm({
    form: 'login',
    fields: _.keys(FIELDS),
    validate
})(Login);

export default connect(mapStateToProps, actions)(Login);