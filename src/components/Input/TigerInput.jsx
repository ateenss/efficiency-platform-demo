import React from 'react';
import {withStyles} from '@material-ui/core/styles';

// @material-ui/icons
// core components
import Grid from "@material-ui/core/Grid";

import GlobalValidateRegex from "../../constants/GlobalValidateRegex.jsx"
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

//组件内部显示css
const styles = {

    textField: {
        margin: '15px 0 15px 0',
    }
};


class TigerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            data:{}
        };
    }

    onBLUR = e => {
        const regex = GlobalValidateRegex[e.target.name];
        console.log(e.target.value);
        if (!regex.ok(e.target.value)) {
            this.setState({message : regex.message})
        }else{
            this.setState({message:""})
        }

    };

    render() {
        // 这里的几个值open和message是通过redux过来的，他返回了需要提示和需要做message
        const {classes, placeholder, name, ...rest} = this.props;
        return (
            <Grid xs={12} sm={12} md={12} item>
                <TextField
                    id="regular"
                    placeholder={placeholder}
                    inputProps={{
                        onBlur: this.onBLUR
                    }}
                    name={name}
                    className={classes.textField}
                    {...rest}
                />
                <Typography color="error">{this.state.message}</Typography>
            </Grid>

        )
    }
}



export default withStyles(styles)(TigerInput);
