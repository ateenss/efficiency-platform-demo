/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import MUIDataTable from "mui-datatables";
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {iterationConst} from "./IterationConst";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Grid from "../BuildMission/TestCaseEditor";

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
    avatar: {},
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
    }
});

const muiTableTheme = () => createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                boxShadow: "none !important"
            }
        },
        MUIDataTableBodyCell: {
            root: {
                backgroundColor: "#FFF",
                padding: "4px 0px 4px 4px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                border:"none",

            }
        },
        MUIDataTableHeadCell:{
            fixedHeader:{
                backgroundColor:"#FFF !important"
            }
        },
        MUIDataTableSelectCell:{
            root:{
                padding:"0 6px",
            },

        },
        MuiCheckbox:{
            root:{
                "&$checked":{
                    color:"#4DAF7C !important"
                }
            },
        },
        MuiTableCell:{
            root:{
                padding:"4px 0px 4px 4px",
                "&:nth-child(5)": {
                    fontWeight:"700",
                    maxWidth:"300px"
                }
            }
        },
    }
});

function EmptyFooter() {
    return (
        <TableFooter style={{display: "none"}}>
            <TableRow>
                <TableCell>
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}

function EmptyHeader() {
    return (
        <div style={{display: "none"}}>

        </div>
    );
}

class DetailTable extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {

        // startLoading();
    }


    componentDidMount() {


    }


    componentWillReceiveProps(nextProps, nextContext) {


    }

    render() {
        const {classes} = this.props;
        const colSpan = this.props.rowData.length + 1;
        let cells = [];
        let cell = [];
        let detailColumns = new Array();

        for (let i in this.props.columns) {

            if (!!this.props.columns[i].options.children && this.props.columns[i].options.children == true) {

                cell.push(this.props.rowData[i]);

                let c = {name: this.props.columns[i].name, options: {}}
                if (this.props.columns[i].options.dataType === "array") {
                    c.options.customBodyRender = (value, tableMeta, updateValue) => {
                        return JSON.stringify(value);
                    }
                }

                detailColumns.push(c);
            }

        }
        cells.push(cell);

        const detailOptions = {
            print: false,
            sort: false,
            filter: false,
            search: false,
            viewColumns: false,
            download: false,
            selectableRows: "none",
            customFooter: () => {
                return (<EmptyFooter/>)
            }
        }

        return (
            (
                <MuiThemeProvider theme={muiTableTheme}>
                    <MUIDataTable
                        data={cells}
                        columns={detailColumns}
                        options={detailOptions}
                    />
                </MuiThemeProvider>

            )

        )
    }
}

const
    mapStateToProps = (state) => {

        return {}
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        DetailTable
    ))
;
