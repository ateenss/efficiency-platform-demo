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

import GlobalValidateRegex from "../../constants/GlobalValidateRegex.jsx"

import store from "../../stores";
import {SHOW_NOTIFICATION} from "../../actions/types";
import Reminder from "../common/Reminder";
import TigerInput from "../Input/TigerInput"

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
            data: {}
        };
    }

    // 订阅你需要验证的元素
    getValidateEl = () => {

        return [{
            key: 'username',
            require: true
        }, {
            key: 'password',
            require: true
        }
        ]

    };

    onChange = e => {
        // 为他赋值
        const key = e.target.name;
        this.state.data[key] = e.target.value;
        this.setState(this.state.data);
    }

    onSubmit = () => {

        let validateEl = this.getValidateEl();
        let ok = false;
        let message = "";

        for (let idx in validateEl) {
            let el = validateEl[idx];
            if (el.require) {
                console.log(this.state.data[el.key]);
                const regex = GlobalValidateRegex[el.key];
                ok = regex.ok(this.state.data[el.key]);
                if (!ok) {
                    message = regex.message;
                    break;
                }
            }
        }
        if (!ok) {
            store.dispatch({type: SHOW_NOTIFICATION, payload: message});
            return false;
        }
        loginUser(this.state.data);
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
                            <TigerInput
                                id="regular"
                                placeholder="用户名"
                                name="username"
                                className={classes.textField}
                                fullWidth
                                onChange={this.onChange}
                            />
                            <TigerInput
                                id="regular"
                                placeholder="密码"
                                name="password"
                                className={classes.textField}
                                fullWidth
                                onChange={this.onChange}
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
