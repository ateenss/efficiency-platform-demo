/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import {Link, NavLink, Route} from 'react-router-dom'


import {openProject} from "../../actions/ProjectPanelAction";
// import BuildProject from "../BuildProject/BuildProjectMain";
import EditProject from "../BuildProject/EditProjectMain";
import EditIcon from "@material-ui/icons/Edit"

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
        // fontSize:"22px"
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    wrapperDiv:{
        position:"relative"
    }
});

const image =
    {
        url: 'https://material-ui.com/static/images/grid-list/breakfast.jpg',
        title: 'Breakfast',
        width: '100%',
    }
;

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

class ProjectPanel extends React.Component {
    constructor(props) {
        super(props);
        this.btnRef = React.createRef();
        this.state = {
            expanded: this.props.expanded,
            popUpOpen: false
        };
    }

    handleClick = (e) => {
        e.preventDefault()
        console.log(this.btnRef.current.props.proejctid);
        openProject(this.btnRef.current.props.proejctid);
    };
    handleClickClose = () => {
        this.setState({popUpOpen: false});
    };
    handleClickOpen = (e) => {
        e.stopPropagation()
        e.preventDefault();
        this.setState({
            popUpOpen: true,
        });
        return false;

    };


    render() {
        const {classes, name, desc, onClick, keyNote} = this.props;
        const MyLink = props => <Link to="/task/my" {...props}/>
        return (
            <div className={classes.wrapperDiv}>
                <ButtonBase
                    ref={this.btnRef}
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    onClick={onClick}
                    name="1"
                    onClick={this.handleClick}
                    projectid="1"
                >
                  <span
                      className={classes.imageSrc}
                      style={{
                          backgroundImage: `url(${image.url})`,
                      }}
                  />

                    <span className={classes.imageBackdrop}/>
                    <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="headline"
                color="inherit"
                className={classes.imageTitle}
            >
              {this.props.name}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                </ButtonBase>

                <Button onClick={this.handleClickOpen} style={{position:"absolute",right:"0",top:"0", zIndex:"10"}}><EditIcon style={{color:"#FFFFFF"}}/></Button>
                <EditProject
                    open={this.state.popUpOpen}
                    onClose={this.handleClickClose}
                    keyNote={keyNote}
                />
            </div>


        );
    }
}

export default withStyles(styles, {withTheme: true})(ProjectPanel);
