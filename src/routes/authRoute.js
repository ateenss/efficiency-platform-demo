import React from 'react';
import { Router, Route, Switch ,Redirect} from "react-router-dom";
import mainFrame from "../components/layouts/mainFrame";
import indexRoutes from "../routes/index.jsx";
import { connect } from 'react-redux';
import MainFrame from "../index";
class AuthenticatedComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {authenticated}=this.props;
        let link=(<Redirect to="/login" />);
        if (authenticated) {
            link=(indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                }))
        }
        return(
            <div>
                {link}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        authenticated: state.reducer.auth.authenticated,
    }
};

export default connect(mapStateToProps)(AuthenticatedComponent)
