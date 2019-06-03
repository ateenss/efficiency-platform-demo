import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker, InlineDatePicker} from 'material-ui-pickers';
import cnLocale from "date-fns/locale/zh-CN";
import format from "date-fns/format";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";



const styles = theme => ({
    grid: {
        width: '100%',
    },
    provider:{
        marginTop:0
    },
    body:{
        marginTop:0
    }
});

const s = new Intl.DateTimeFormat('zh-cn');
const timeInitial= s.format(new Date());

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "yyyy-MM-dd", { locale: cnLocale });
    }
}


const theme = createMuiTheme({
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor:"#f5f5f5",
                "&:hover":{
                    background:"#f5f5f5 !important",
                },
                '&:before': {
                    borderBottom: "none"
                },
                '&:disabled':{
                    backgroundColor:"#f5f5f5",
                }
            },
            disabled:{
                backgroundColor:"#f5f5f5 !important",
            },

            underline:{
                "&:hover":"1px solid #4DAF7C !important",
                '&:before': {
                    borderBottom: "none"
                },
                '&:after':{
                    borderBottom:"1px solid #4DAF7C !important"
                }
            },
            focused:{
                backgroundColor:"#f5f5f5 !important"
            },
        },
        MuiFormLabel: {
            root:{
                "&:focused":{
                    color:"#4daf7c !important"
                }
            },
            focused:{
                color:"#4daf7c !important"
            }

        }

    },
});
class MaterialUIPickers extends React.Component {
    state = {
        data:null,
        locale:"cn",
        setLocale:"cn"
    };

    handleDateChange = date => {
        // this.setState({ data: date });
        console.log(s.format(date));
        this.setState({ data: s.format(date) });
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
            <MuiThemeProvider theme={theme}>

            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={cnLocale} className={classes.provider}>
                        <InlineDatePicker
                            fullWidth
                            name={nameIn}
                            margin="normal"
                            label={InputLabelName}
                            value={data}
                            variant="filled"
                            onChange={this.handleDateChange}
                            format={dateFormat}
                            views={["year", "month", "day"]}
                            className={classes.body}
                            emptyLabel="选择"
                        />
            </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

MaterialUIPickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme:true})(MaterialUIPickers);