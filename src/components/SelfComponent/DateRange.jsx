import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker, InlineDatePicker} from 'material-ui-pickers';
import cnLocale from "date-fns/locale/zh-CN";
import format from "date-fns/format";
import ForwardIcon from "@material-ui/icons/ChevronRightSharp"

const styles = theme => ({
    grid: {
        width: '100%',
    },
    provider: {
        marginTop: 0
    },
    body: {
        marginTop: 0
    }
});

const s = new Intl.DateTimeFormat('zh-cn');
const timeInitial = s.format(new Date());

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "yyyy-MM-dd", {locale: cnLocale});
    }
}


class DateRange extends React.Component {
    state = {
        from: null,
        to: null,
        locale: "cn",
        result: {from: "", to: ""},
        setLocale: "cn"
    };

    handleDateChangeFrom = date => {
        let ret = this.state.result;
        ret.from = s.format(date);

        this.setState({from: s.format(date), result: ret});

        this.props.onDateChange({keyNote: this.props.nameIn, value: ret})
    };

    handleDateChangeTo = date => {
        let ret = this.state.result;
        ret.to = s.format(date);

        this.setState({to: s.format(date), result: ret});

        this.props.onDateChange({keyNote: this.props.nameIn, value: ret})
    };

    componentWillMount() {
        //这里主要是给再编辑使用的
        if (this.props.defaultValue) {
            this.setState({
                result: this.props.defaultValue,
                from : this.props.defaultValue.from,
                to : this.props.defaultValue.to
            })
        }
    }


    render() {
        const {classes, nameIn, InputLabelName} = this.props;
        const {from, to} = this.state;
        const dateFormat = "yyyy-MM-dd";
        let labelFrom = InputLabelName + "从";
        let labelTo = "到";
        return (
            <Grid container spacing={8}>
                <Grid item xs={5}>
                    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cnLocale} className={classes.provider}>
                        <InlineDatePicker
                            fullWidth
                            name="from"
                            margin="normal"
                            label={labelFrom}
                            value={from}
                            onChange={this.handleDateChangeFrom}
                            format={dateFormat}
                            views={["year", "month", "day"]}
                            className={classes.body}
                            emptyLabel="选择"
                            maxDate={this.state.to}
                        />
                    </MuiPickersUtilsProvider>

                </Grid>
                <Grid item xs={2} style={{textAlign:"center"}}><ForwardIcon style={{marginTop:"20px", color:"rgba(0,0,0,0.54)"}}/></Grid>
                <Grid item xs={5}>
                    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cnLocale} className={classes.provider}>

                        <InlineDatePicker
                            fullWidth
                            name="to"
                            margin="normal"
                            label={labelTo}
                            value={to}
                            onChange={this.handleDateChangeTo}
                            format={dateFormat}
                            views={["year", "month", "day"]}
                            className={classes.body}
                            emptyLabel="选择"
                            minDate={this.state.from}

                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        );
    }
}

DateRange.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(DateRange);