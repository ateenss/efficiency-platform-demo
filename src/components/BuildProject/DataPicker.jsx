import 'date-fns';
import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
    grid: {
        width: '60%',
    },
};

class MaterialUIPickers extends React.Component {
    state = {
        // The first commit of Material-UI
        startDate: new Date('2019-02-26T21:11:54'),
        endDate: new Date('2019-02-26T21:11:54')
    };

    handleStartDateChange = date => {
        this.setState({ startDate: date });
        // this.props.onStartChange(date);
        this.props.onStartChange({keyNote:"startTime",value:date})
    };
    handleEndDateChange = date => {
        this.setState({ endDate: date });
        // this.props.onEndChange(date);
        this.props.onEndChange({keyNote:"endTime",value:date})
    };

    componentWillMount() {
        if(this.props.startValue&&this.props.endValue){
            this.setState({
                startDate:this.props.startValue,
                endDate:this.props.endValue
            })
        }
    }


    render() {
        const { classes ,startValue,endValue} = this.props;
        const { startDate,endDate } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                    <DatePicker
                        name="startTime"
                        margin="normal"
                        label="开始时间"
                        value={startDate}
                        onChange={this.handleStartDateChange}
                    />
                    <DatePicker
                        name="endTime"
                        margin="normal"
                        label="结束时间"
                        value={endDate}
                        onChange={this.handleEndDateChange}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

// MaterialUIPickers.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MaterialUIPickers);