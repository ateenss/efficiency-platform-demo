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
};

const s = new Intl.DateTimeFormat('zh-cn');
const timeInitial= s.format(new Date('2019-02-26'));

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
        this.setState({ data: date });
        // this.props.onStartChange(date);
        // console.log(this.props.nameIn);
        this.props.onDateChange({keyNote:this.props.nameIn,value:date})
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

        return (
            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cnLocale}>
                <Grid container className={classes.grid}  spacing={0}>
                    <Grid item xs={12}>
                    <DatePicker
                        fullWidth
                        name={nameIn}
                        margin="normal"
                        label={InputLabelName}
                        value={data}
                        onChange={this.handleDateChange}
                    />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

MaterialUIPickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIPickers);