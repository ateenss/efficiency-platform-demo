import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
});

class InputMy extends React.Component{
    render(){
        const {classes,placeholder,ref,onChange,type,onblur} = this.props;
        return (
            <div className={classes.container}>
                <Input
                    ref={ref}
                    type={type}
                    onChange={onChange}
                    onBlur={onblur}
                    placeholder={placeholder}
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
            </div>
        );
    }
}

InputMy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputMy);