import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DevelopPlanMenuList from "./DevelopPlanMenuList";

const ITEM_HEIGHT = 48;
class OnlineTestCasesMenuList extends React.Component{
    state = {
        anchorEl: null,
    };

    handleClick = e => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({anchorEl: e.currentTarget});
    };

    handleClose = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({anchorEl: null});
    };

    handleCloseOnLineTest = () =>{
        this.props.handleCloseOnlineTestCases();
        this.setState({anchorEl: null});
    };

    handleProveCases=(id)=>()=>{
        this.props.handleProveOnlineTestCases(id);
        // this.props.handleCloseOnlineTestCases();
        this.setState({anchorEl: null});
    };



    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div group={this.props.group} style={{position: "absolute", right: "0", top: "0", "zIndex": "9999"}} >
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {this.props.icon}
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleCloseOnLineTest}>
                        关闭
                    </MenuItem>
                    <MenuItem onClick={this.handleProveCases(this.props.useId)}>
                        评审通过并关闭
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default OnlineTestCasesMenuList;