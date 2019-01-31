import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputMy from './inputMy'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class  PaperSheet extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showValue:""
        }
    }

    changValue= value=>{
        console.log("我的验证"+value);
        this.setState({
            showValue:value
        })
    };

    onBLUR=()=>{
        alert("我弹出来了");
    };

    clickMe=()=>{
        alert("我被点击了"+this.state.showValue);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                    <InputMy
                        ref="email"
                        placeholder="Input email"
                        type="email"
                        /*onChange={this.changValue.bind(this,)}*/
                        onChange={(e) => { this.setState({showValue:e.target.value}) ;console.log(e.target.type) }}
                        onblur={this.onBLUR}
                    />
                    <Button onClick={this.clickMe}>点击我</Button>
                    <br/>
                    <div className="showValue">{this.state.showValue}</div>
                </Paper>
            </div>
        );
    }
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);