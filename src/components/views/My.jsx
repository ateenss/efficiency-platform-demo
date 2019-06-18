/* eslint-disable */
import React from "react";
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
// import store from "../../stores";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import MuiCardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCard from '@material-ui/core/Card';
import {Avatar, createMuiTheme} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {getMy, showChangePassword, sysInit} from "../../actions/CommonAction";
import {Link} from "react-router-dom";
import Goto from "@material-ui/icons/ArrowUpward";
import ChangePasswordIcon from "@material-ui/icons/Lock";
import classNames from 'classnames';
import face from "../../assets/img/faces/marc.jpg";
import {error} from "../../actions/NotificationAction";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newBuildButton: {
        color: red[500]
    },
    head: {
        background: "#FFFFFF"
    },
    orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    toolbar: {
        boxShadow: "none",
        background: "#FFFFFF",
        minHeight: "64px"
    },
    chip: {
        fontSize: "12px",
        marginRight: theme.spacing.unit
    },
    toolTipIteration: {
        background: "#F5F5F5", padding: "8px", maxWidth: "600px"
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 120,
        height: 120,
        margin: "0 auto"
    },
    chipStyle: {
        // background: "#f5f5f5",
        // color: "#232323",
        margin: "5px",
        fontSize: "14px",
        borderRadius: "3px",
        minWidth: "100%",
        background: "#f5f5f5",
        height: "40px"
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.grey,
        },
    },
});
const CustomTableCell = withStyles(theme => ({
    head: {
        // backgroundColor: "#f5f5f5",
        // color: theme.palette.grey,
        borderBottom: "0"
    },
    body: {
        fontSize: 14,
        borderBottom: "0"
    },
}))(TableCell);


const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                marginTop: 0
            },
            marginNormal: {
                marginTop: 0
            }
        },
        MuiFilledInput: {
            root: {
                backgroundColor: "#f5f5f5",
                "&:hover": {
                    background: "#f5f5f5 !important",
                },
                '&:before': {
                    borderBottom: "none"
                },
                '&:disabled': {
                    backgroundColor: "#f5f5f5",
                }
            },
            multiline: {
                padding: "10px"
            },
            disabled: {
                backgroundColor: "#f5f5f5 !important",
            },
            underline: {
                "&:hover": "1px solid #4DAF7C !important",
                '&:before': {
                    borderBottom: "none"
                },
                '&:after': {
                    borderBottom: "1px solid #4DAF7C !important"
                }
            },
            focused: {
                backgroundColor: "#f5f5f5 !important"
            },
        },
        MuiFormLabel: {
            root: {
                "&:focused": {
                    color: "#4daf7c !important"
                }
            },
            focused: {
                color: "#4daf7c !important"
            }

        }

    },
});
const CardHeader = withStyles({
    title: {
        fontSize: "18px"
    }


})(props => <MuiCardHeader {...props} />);


const CardContent = withStyles({})(props => <MuiCardContent {...props} />);


const Card = withStyles({
    root: {
        boxShadow: "none"
    }
})(props => <MuiCard {...props} />);


class My extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myInfo: {
                demands: [],
                iterations: []
            }
        };
    }

    componentWillMount() {
        let content = this.getDefault();
        this.setState({memo: content});
    }

    componentDidMount() {

        let self = this;

        sysInit(function (initParams) {

            getMy().then(resp => {




                self.setState({
                    myInfo: resp.data.data,
                    projectMembers: initParams.projectMembers,
                    modules: initParams.modules
                });

            }).catch(e => {
                error("后台拉取数据失败", JSON.stringify(e));

            });


        });


    }


    getDefault = () => {
        let currentUser = localStorage.getItem("currentUser");
        return localStorage.getItem("myMemo-" + currentUser);
    };

    handleBlur = (e) => {

        let currentUser = localStorage.getItem("currentUser");
        localStorage.setItem("myMemo-" + currentUser, e.target.value)
    };

    changePassword = () => {
        showChangePassword();
    }


    render() {
        const {classes, buildDemandShow, editDemandShow, tableData} = this.props;

        //todo:结果都在这个result里面，选取值去定位这个result里面的数组（被选取的索引值和result里面是保持一致的）
        return (
            <Grid container spacing={16}>
                <Grid item xs={3}>
                    <Card style={{height: "250px"}}>
                        <CardHeader
                            title={this.state.myInfo.realName}
                            action={
                                <IconButton onClick={this.changePassword}>
                                    <ChangePasswordIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Typography align="center"><Avatar aria-label="Recipe" src={face}
                                                               className={classNames(classes.avatar, classes.bigAvatar)}/></Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Link color="transparent" to="/project">
                        <Card style={{height: "250px"}}>
                            <CardHeader
                                title="当前项目"
                                action={
                                    <IconButton>
                                        <Goto style={{transform: "rotate(45deg)"}}/>
                                    </IconButton>
                                }
                            />
                            <CardContent style={{height:"154px", paddingTop:"0"}}>
                                <Grid container spacing="0" alignItems="center" justify="center" direction="row" style={{height:"100%"}}>
                                    <Grid item >
                                        <Typography variant="display1"
                                                    style={{fontWeight: "500", height:"100%"}}>{this.state.myInfo.projectName}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link color="transparent" to="/taskboard">
                        <Card style={{height: "250px"}}>
                            <CardHeader
                                title="需求任务"
                                action={
                                    <IconButton>
                                        <Goto style={{transform: "rotate(45deg)"}}/>
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <Typography variant="display4" align="center" style={{fontWeight: "500"}}>{this.state.myInfo.unfinishedDemandTaskCnt}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                    <Link color="transparent" to="/taskboard">

                        <Card style={{height: "250px"}}>
                            <CardHeader
                                title="其他任务"
                                action={
                                    <IconButton>
                                        <Goto style={{transform: "rotate(45deg)"}}/>
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <Typography variant="display4" align="center"
                                            style={{fontWeight: "500"}}>{this.state.myInfo.unfinishedOtherTaskCnt}</Typography>
                            </CardContent>
                        </Card>
                    </Link>

                </Grid>
                <Grid item xs={9}>
                <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title="我参与的版本"
                            action={
                                <IconButton>
                                    <Goto style={{transform: "rotate(45deg)"}}/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={16}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <CustomTableCell>版本编号</CustomTableCell>
                                            <CustomTableCell>开发方案提交时间</CustomTableCell>
                                            <CustomTableCell>代码走查时间</CustomTableCell>
                                            <CustomTableCell>提测时间</CustomTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.myInfo.iterations.map((row, key) => {
                                            return (
                                                <TableRow key={key} className={classes.row}>
                                                    <CustomTableCell component="th" scope="row">
                                                        <Chip label={row.iterationCode} style={{
                                                            background: "#e0ecfb",
                                                            borderRadius: "3px",
                                                            color: "#176fdc"
                                                        }}/>
                                                    </CustomTableCell>
                                                    <CustomTableCell>{row.developPlanSubmitDate}</CustomTableCell>
                                                    <CustomTableCell>{row.codeReviewDate}</CustomTableCell>
                                                    <CustomTableCell>{row.testDate}</CustomTableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>

                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title="我参与的需求"
                            action={
                                <IconButton>
                                    <Goto style={{transform: "rotate(45deg)"}}/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={16}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <CustomTableCell>需求编号</CustomTableCell>
                                            <CustomTableCell>需求名称</CustomTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.myInfo.demands.map((row, key) => {
                                            if (!row.demandCode) {
                                                return "";
                                            }
                                            let literal = row.demandCode.split(",");

                                            let link = literal[0];
                                            if(!!literal[1]) {
                                                let href = "http://172.17.249.10/NewSys/Requirement/External/ReqDetail.aspx?Id=" + literal[1];
                                                link = <a href={href} target="new" style={{
                                                    fontWeight: "400px",
                                                    color: "#121212",
                                                    textDecoration: "underline"
                                                }}>
                                                    {literal[0]}
                                                </a>
                                            }
                                            return (
                                                <TableRow key={key} className={classes.row}>
                                                    <CustomTableCell>{link}</CustomTableCell>
                                                    <CustomTableCell>{row.demandName}</CustomTableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>

                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>

                </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Card style={{height: "500px"}}>
                        <CardHeader
                            title="备忘(只存在浏览器里^_^)"
                        />
                        <CardContent>
                            <MuiThemeProvider theme={theme}>

                                <TextField
                                    multiline
                                    rows="20"
                                    margin="normal"
                                    variant="filled"
                                    fullWidth
                                    onBlur={this.handleBlur}
                                    defaultValue={this.state.memo}
                                />
                            </MuiThemeProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        )
    }
}


export default withStyles(styles)(My);
