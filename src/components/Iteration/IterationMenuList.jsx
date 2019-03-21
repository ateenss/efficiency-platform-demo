import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
                    <MenuItem onClick={this.handleEdit}>
                        编辑
                    </MenuItem>
                    <MenuItem >
                        生成上线检查表
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default IterationMenuList;