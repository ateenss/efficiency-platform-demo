import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: 200,
        marginTop:0
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});



class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: ''
    };

    handleChange = event => {
        // this.setState({ [name]: event.target.value });
        this.props.onChange({keyNote:event.target.name,value:event.target.value})
    };

    render() {
        const { classes ,InputLabelName,defaultValue,nameIn,disabled,onChange} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                {/*如果是标准件可以使用如下信息*/}
                {/*<TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />*/}
                {/*如果是错误提示信息可以参考以下信息填写*/}
                {/*<TextField
                    error
                    id="standard-error"
                    label="Error"
                    defaultValue="Hello World"
                    className={classes.textField}
                    margin="normal"
                />*/}
                <TextField
                    disabled={disabled}
                    id="standard-disabled"
                    label={InputLabelName}
                    defaultValue={defaultValue}
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                    name={nameIn}
                    fullWidth
                />


            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);