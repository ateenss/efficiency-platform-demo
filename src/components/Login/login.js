import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';
import InputMy from '../Input/inputMy';
import {loginUser,validate,Unvalidate} from '../../actions/index';


//组件内部显示css
const styles = ()=>({
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
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class SimpleCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showEmail:"",
            showPassword:"",
            message:"",
            disabled:false
        };
        }





    // emailValidate = value =>
    //     value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    //         ? 'Invalid email address'
    //         : undefined;

    emailValidate= value =>
    value &&  !/^[a-zA-Z0-9]{4,10}$/.test(value)
? '6-10 letters or Numbers'
        :undefined;
    passwordValidate = value =>
        value &&  !/^[a-zA-Z0-9]{4,10}$/.test(value)
            ? '6-10 letters or Numbers'
            :undefined;


    onBLUR=e=>{
        console.log("进行焦点移除");
        //进行相关信息验证
        if (e.target.placeholder==="Input email") {
            if(!e.target.value){
                this.setState({
                    message:'email is Required!',
                });
                validate()
            } else if(this.emailValidate(e.target.value)==='Invalid email address'){
                this.setState({
                    message:'Invalid email address',
                });
                validate()
            }else{
                this.setState({
                    message:'',
                    showEmail:e.target.value,
                });
                Unvalidate();
            }
        }else {
            if(!e.target.value){
                this.setState({
                    message:'password is Required!',
                });
                validate()
            } else if(this.passwordValidate(e.target.value)==='6-10 letters or Numbers'){
                this.setState({
                    message:'6-10 letters or Numbers',
                });
                validate()
            }else{
                this.setState({
                    message:'',
                    showPassword:e.target.value,
                });
                Unvalidate();
            }
        }
    };



    onSubmit=()=>{
        console.log("邮箱："+this.state.showEmail+"//"+"密码："+this.state.showPassword);
        loginUser({email:this.state.showEmail,password:this.state.showPassword});
    };


    render(){
        const { classes ,errorMessage ,isAuthenticating,isValidating} = this.props;
        let submitProps = {};
        if (isAuthenticating||isValidating) {
            submitProps = {
                disabled: true,
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
                        <InputMy
                            type="email"
                            placeholder="Input email"
                            onblur={this.onBLUR}
                        />
                        <div className="password-wrapper">
                            <InputMy
                                type="password"
                                placeholder="Input password"
                                onblur={this.onBLUR}
                            />
                        </div>
                        <div className="message">{this.state.message}</div>
                        <div className="error-message">{errorMessage}</div>
                        <Button  size="large" color="primary"  className="login-button"  {...submitProps}
                                 variant="contained" type="submit" label="Login" onClick={this.onSubmit}>Login</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

// 从store里面取数据给组件
const mapStateToProps=state=>{
    return {
        errorMessage: state.reducer.auth.error,
        isAuthenticating: state.reducer.auth.isAuthenticating,
        authenticated: state.reducer.auth.authenticated,
        isValidating: state.reducer.auth.isValidating
    }
};

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
