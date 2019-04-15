import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/loginAction';
import Grid from '@material-ui/core/Grid';
// @material-ui/icons
// core components
import GridItem from "../Grid/GridItem.jsx";
import Card from "../Card/Card.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import Button from "../CustomButtons/Button.jsx";

import Reminder from "../common/Reminder";
import {Rules, validating} from "../../actions/validateAction";
import {error} from "../../actions/NotificationAction";
import InputField from "../SelfComponent/InputField";

//组件内部显示css
const styles = {
    card: {
        minWidth: 400,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {
        margin: '15px 0 15px 0',
    },
    grid: {
        marginTop: 150
    },
    loginButton: {
        textAlign: "center",
        margin: "30px 0 0 0",
        minHeight: 60,
        fontSize: 20,
        fontWeight: 700

    },
    cardTitle: {
        // marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        // marginBottom: "3px",
        textDecoration: "none",
        textAlign: "center",
        fontSize: 20,
    },
    subTilte: {
        textAlign: "center"
    },

};


class SimpleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            defaultContent: {},
        };
    }

    onSubmit = () => {

        let ret = validating(this.state.defaultContent, "loginProps");
        if(!ret.result){
            error(ret.message);
            return false;
        }
        loginUser(this.state.defaultContent);
    };


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


    render() {
        // 这里的几个值open和message是通过redux过来的，他返回了需要提示和需要做message
        const {classes} = this.props;
        return (
            <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}
                  ref={(input) => this.wrapper = input}>
                <Reminder/>
                <GridItem xs={6} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitle}>效率平台</h4>
                            <p className={classes.subTilte}>welcome</p>
                        </CardHeader>
                        <CardBody>

                            <InputField
                                nameIn="username"
                                onChange={this.getContent}
                                InputLabelName="用户名"
                                validateEl={Rules.loginProps.username}
                            />
                            <InputField
                                nameIn="password"
                                onChange={this.getContent}
                                InputLabelName="密码"
                                validateEl={Rules.loginProps.password}
                                password
                            />

                            <GridItem xs={12} sm={12} md={12} item>
                                <Button className={classes.loginButton} size="lg" fullWidth
                                        color="transparent"
                                        type="submit" label="登陆" onClick={this.onSubmit}>登陆</Button>
                            </GridItem>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        )
    }
}


SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

// 从store里面取数据给组件
const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(withStyles(styles)(SimpleCard));
