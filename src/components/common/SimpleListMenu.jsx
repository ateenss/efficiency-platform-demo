import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const ITEM_HEIGHT = 48;

class SimpleListMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
        if (this.props.openClickAction){
            this.props.openClickAction();
        }
    };

    handleClose = (callback, id, e) => {
        this.setState({anchorEl: null});
        // console.log(e.target.id);
        if (!!id) {
            if (typeof callback === "function")
                callback.call(this, id)
        }else{
            if (typeof callback === "function")
                callback.call()
        }
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div group={this.props.group} style={{display: this.props.display}}>
                <IconButton className={this.props.buttonClass}
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
                    {this.props.options.map(option => (
                        <MenuItem key={option.name} onClick={this.handleClose.bind(this, option.func, this.props.id)}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default SimpleListMenu;