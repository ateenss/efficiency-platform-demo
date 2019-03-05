import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "../TaskBoard/Task";
import CardHeader from "@material-ui/core/CardHeader";
import Green from '@material-ui/core/colors/green';

const styles = theme => ({
    card: {
        maxWidth: 1000,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        padding: "0px"

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    taskType: {
        backgroundColor: "#e4e4e4",
        color: "#121212",
        width: "auto",
        borderRadius: "2px",
        position: "absolute",
        right: "0",
        left: "0",
        textAlign: "left",
        top: "0",
        padding: "0 10px",
        fontSize: "14px",
        justifyContent: "left"
    },
    taskStatus: {
        backgroundColor: Green[500],
        fontSize: "14px",
        width: "50px",
        height: "50px",
        position: "absolute",
        right: "5px",
        top: "5px",
    },
    taskCard: {
        position: "relative"
    },
    taskContent: {
        paddingBottom: "0px"
    }
});

class  ShowCard extends React.Component{
    constructor(props){
        super(props);

    }

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;


        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.taskType}>
                            {this.props.taskType} - {this.props.taskNo}
                        </Avatar>
                    }
                    /*className={classes.taskHeader}*/

                    action={
                        <Avatar aria-label="Recipe" className={classes.taskStatus}>
                            {this.props.taskStatus}
                        </Avatar>
                    }
                />
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );

    }


}

ShowCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowCard);