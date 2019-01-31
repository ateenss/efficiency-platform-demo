import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
// import * as actions from "../../actions";
import { connect } from 'react-redux';
import {Button} from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent';
import InputMy from './inputMy';

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
            message:""
        }
    }

    handleFormSubmit({email, password }) {
        console.log("刚把命令发送出去");
        console.log({ email, password });
        this.props.loginUser({ email, password });
    }

    OnChange=e=>{
        if (e.target.placeholder==="Input email") {
            this.setState({showEmail:e.target.value});
        }else{
            this.setState({showPassword:e.target.value});
        }
        console.log(e.target.value)
    };

    emailValidate = value =>
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined;
    passwordValidate = value =>
        value &&  !/^[a-zA-Z0-9]{6,10}$/.test(value)
            ? '6-10 letters or Numbers'
            :undefined;


    onBLUR=e=>{
        console.log("进行焦点移除");
        //进行相关信息验证
        if (e.target.placeholder==="Input email") {
            if(!e.target.value){
                this.setState({
                    message:'email is Required!'
                })
            } else if(this.emailValidate(e.target.value)==='Invalid email address'){
                this.setState({
                    message:'Invalid email address'
                })
            }else{
                this.setState({
                    message:'',
                    showEmail:e.target.value
                })
            }
        }else {
            if(!e.target.value){
                this.setState({
                    message:'password is Required!'
                })
            } else if(this.passwordValidate(e.target.value)==='6-10 letters or Numbers'){
                this.setState({
                    message:'6-10 letters or Numbers'
                })
        }else{
                this.setState({
                    message:'',
                    showPassword:e.target.value
                })
            }
        }
    };

onSubmit=()=>{
    alert("邮箱："+this.state.showEmail+"//"+"密码："+this.state.showPassword)
};

    render(){
        const { classes  } = this.props;
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
                        <Button  size="large" color="primary"  className="login-button"
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
const mapStateToProps=state=>{
    return {
        errorMessage: state.reducer.auth.error,
        isAuthenticating: state.reducer.auth.isAuthenticating
    }
};

// 动作的自动触发执行
const mapDispatchToProps=dispatch=>
    bindActionCreators(actions,dispatch);



export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
// export default withStyles(styles)(SimpleCard);