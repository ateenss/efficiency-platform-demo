import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import {logoutUser} from '../../actions/index';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import history from '../../history/history';


class Logout extends React.Component {
    componentWillMount() {
        this.props.logoutUser();
        console.log("查看位置："+history);
        console.log(history.location);
    }
    // doChange=()=>{
    //     console.log("定时发动之前");
    //     console.log(history.location);
        // setTimeout(() => {
        //     console.log("我是跳转之前");
        //     history.push('/login');
        //     console.log("我是历史："+history);
        //     console.log(localStorage.getItem('token'));
        //     console.log(history.location);
        // }, 1000);
        // history.push('/login');
    // };
    render() {
        history.push('/');
        return (
            <div className="logout-wrapper">
                <Card>
                    <CardHeader title="You have been successfully logged off"/>
                    <CardContent>
                        <p>Returning to home screen...</p>
                        <LinearProgress mode="indeterminate" />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default connect(null, {logoutUser})(Logout);