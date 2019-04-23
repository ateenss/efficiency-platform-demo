import {createMuiTheme} from "@material-ui/core";

export const muiTableTheme = () => createMuiTheme({
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
                    fontWeight:"700"
                }
            }
        },
    }
});