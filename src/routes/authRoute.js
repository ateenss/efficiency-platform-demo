import React from 'react';
import { Route,Redirect} from "react-router-dom";
import indexRoutes from "../routes/index.jsx";
import { connect } from 'react-redux';
class AuthenticatedComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {authenticated}=this.props;
        let token = localStorage.getItem('token');
        // let link=(<Redirect to="/login" />);
        // if (authenticated || !!token) {
        //     link=(indexRoutes.map((prop, key) => {
        //             return <Route path={prop.path} component={prop.component} key={key} />;
        //         }))
        // }
        let link=(indexRoutes.map((prop, key) => {
                        return <Route path={prop.path} component={prop.component} key={key} />;
                    }))
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
