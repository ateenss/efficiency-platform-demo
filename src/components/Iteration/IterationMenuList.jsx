import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import permProcessor from "../../constants/PermProcessor";

const ITEM_HEIGHT = 48;

class IterationMenuList extends React.Component {
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

    handleEdit = (id ,e) =>{
        this.props.handleEdit(id,e);
        this.setState({anchorEl: null});
    };

    handleConfirmDelete = (id, e) =>{
        this.props.handleDelete(id,e);
        this.setState({anchorEl: null});

    };

    handleReview = () =>{
        this.props.handleReview();
        this.setState({anchorEl: null});
    }

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div group={this.props.group} style={{display: this.props.display}} >
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
                    <MenuItem onClick={this.handleReview}>方案评审</MenuItem>
                    {permProcessor.bingo('save', this.props.perm) ? <MenuItem onClick={this.handleEdit}>编辑</MenuItem> :""}
                     <MenuItem onClick={this.handleConfirmDelete}>删除</MenuItem>

                </Menu>
            </div>
        );
    }
}

export default IterationMenuList;