import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import cnLocale from "date-fns/locale/zh-CN";
import format from "date-fns/format";



const styles = {
    grid: {
        width: '100%',
    },
    provider:{
        marginTop:0
    },
    body:{
        marginTop:0
    }

};

const s = new Intl.DateTimeFormat('zh-cn');
const timeInitial= s.format(new Date());

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "yyyy MMM d", { locale: cnLocale });
    }
}


class MaterialUIPickers extends React.Component {
    state = {
        data:timeInitial,
        locale:"cn",
        setLocale:"cn"
    };

    handleDateChange = date => {
        // this.setState({ data: date });
        console.log(s.format(date));
        this.setState({ data: s.format(date) });
        // this.props.onStartChange(date);
        // console.log(this.props.nameIn);
        this.props.onDateChange({keyNote:this.props.nameIn,value:s.format(date)})
    };

    componentWillMount() {
        //这里主要是给再编辑使用的
        if(this.props.defaultValue){
            this.setState({
                data:this.props.defaultValue,
            })
        }
    }



    render() {
        const { classes ,nameIn,InputLabelName} = this.props;
        const { data } = this.state;
        const dateFormat = "yyyy-MM-dd";
        return (
            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cnLocale} className={classes.provider}>
                        <DatePicker
                            fullWidth
                            name={nameIn}
                            margin="normal"
                            label={InputLabelName}
                            value={data}
                            onChange={this.handleDateChange}
                            format={dateFormat}
                            views={["year", "month", "day"]}
                            className={classes.body}
                        />
            </MuiPickersUtilsProvider>
        );
    }
}

MaterialUIPickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIPickers);