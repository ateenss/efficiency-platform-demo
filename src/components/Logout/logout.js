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
    }
    render() {
        setTimeout(() => {
            history.push('/login');
        }, 3000);
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