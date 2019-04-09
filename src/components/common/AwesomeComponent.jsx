import React from 'react';
import {css} from '@emotion/core';
// First way to import
import {PacmanLoader} from 'react-spinners';
// Another way to import
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {START_LOADING, STOP_LOADING} from "../../actions/types";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const styles = theme => ({

    overlay: {
        background: "rgba(245, 245, 245, 0.9)",
        position: "absolute",
        left: "0px",
        right: "0px",
        top: "0px",
        bottom: "0px",
        zIndex: "9999"
    },
    sweetLoading:{
        position:"absolute",
        left:"50%",
        marginLeft:"-50px",
        top:"50%",
        marginTop:"-50px"
    }

});

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }


    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.action === START_LOADING || nextProps.action === STOP_LOADING) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.action === START_LOADING || nextProps.action === STOP_LOADING) {
            this.setState({loading: nextProps.loading})
        }

    }

    render() {
        const {classes, theme} = this.props;
        return (
            <div>
                {this.state.loading === true ?
                <div className={classes.overlay}>
                    <div className={classes.sweetLoading}>
                        <PacmanLoader
                            css={override}
                            sizeUnit={"px"}
                            size={50}
                            color={'#4DAF7C'}
                            loading={this.state.loading}
                        />
                    </div>
                </div> : ""}
            </div>

        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            loading: state.reducer.common.doLoading,
            action: state.reducer.common.action
        }
    };

export default connect(mapStateToProps)

(
    withStyles(styles, {withTheme: true})

    (
        AwesomeComponent
    ))
;