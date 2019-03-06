import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48;

class SimpleListMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (callback, e) => {
        this.setState({anchorEl: null});
        if (!!e && !!e.target && !!e.target.id) {
            // console.log(e.target.id);
            callback(e.target.id);
        }
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
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
                {this.props.options.map(option => (
                    <MenuItem id={this.props.id} key={option.name} onClick={this.handleClose.bind(this, option.func)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        );
    }
}

export default SimpleListMenu;