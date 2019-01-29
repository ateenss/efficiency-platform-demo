import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import store from "../../stores";
import CardBody from '../Card/CardBody';
// import {getInitial} from '../../actions/doAction';


class Dashboard extends React.Component {
    constructor(props){
        super(props);
        // store.dispatch(getInitial());
        this.state = {
            value: 0,
            bugs:[],
            website:[],
            server:[],
            rightInfo:[],
            bugsTaskIndexes:store.getState().reducer.bugsTaskIndexes,
            websiteTaskIndexes:store.getState().reducer.websiteTaskIndexes,
            serverTaskIndexes:store.getState().reducer.serverTaskIndexes
        };
    }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

    getBugs= ()=>{
        return store.getState().reducer.bugs;
    };
    getServer= ()=>{
        return store.getState().reducer.server;
    };
    getWeb= ()=>{
        return store.getState().reducer.website;
    };
    getRightInfo = () =>{
        const newState=store.getState();
        return newState.reducer.rightTableData;
    };
    trySubScribe=()=>{
        store.subscribe(this.changeContent);
    };
    changeContent=()=>{
        this.setState({
            bugs:store.getState().reducer.bugs,
            rightInfo:store.getState().reducer.rightTableData
        })
    };
    componentDidMount() {
        this.trySubScribe();
    }
    componentWillMount() {
        this.setState({
            bugs:this.getBugs(),
            website:this.getWeb(),
            server:this.getServer(),
            rightInfo:this.getRightInfo(),
        })
    }

    render() {
      const { classes} = this.props;
      const {bugs,website,server,rightInfo,bugsTaskIndexes,websiteTaskIndexes,serverTaskIndexes}=this.state;
      return (
          <div>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={6} >
                      <CustomTabs
                          title="Tasks:"
                          headerColor="primary"
                          tabs={[
                              {
                                  tabName: "Bugs",
                                  tabIcon: BugReport,
                                  tabContent: (
                                      <Tasks
                                          checkedIndexes={[0, 3]}
                                          tasksIndexes={bugsTaskIndexes}
                                          tasks={bugs}
                                      />
                                  )
                              },
                              {
                                  tabName: "Website",
                                  tabIcon: Code,
                                  tabContent: (
                                      <Tasks
                                          checkedIndexes={[0]}
                                          tasksIndexes={websiteTaskIndexes}
                                          tasks={website}
                                      />
                                  )
                              },
                              {
                                  tabName: "Server",
                                  tabIcon: Cloud,
                                  tabContent: (
                                      <Tasks
                                          checkedIndexes={[1]}
                                          tasksIndexes={serverTaskIndexes}
                                          tasks={server}
                                      />
                                  )
                              }
                          ]}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} >
                      <Card>
                          <CardHeader color="warning">
                              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                              <p className={classes.cardCategoryWhite}>
                                  New employees on 15th September, 2016
                              </p>
                          </CardHeader>
                          <CardBody>
                              <Table
                                  tableHeaderColor="warning"
                                  tableHead={["ID", "Name", "Salary", "Country"]}
                                  tableData={rightInfo}
                              />
                          </CardBody>
                      </Card>
                  </GridItem>
              <GridItem>
              <Card >
                      <CardBody>
                          <Table
                              tableHeaderColor="warning"
                              tableHead={["ID", "Name", "Salary", "Country"]}
                              tableData={[
                                  ["1", "Dakota Rice", "$36,738", "Niger"],
                                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                              ]}
                          />
                      </CardBody>
                  </Card>
              </GridItem>
                  <GridItem>
                      <Card >
                          <CardBody>
                          <Table
                              tableHeaderColor="warning"
                              tableHead={["ID", "Name", "Salary", "Country"]}
                              tableData={[
                                  ["1", "ming ming", "￥36,738", "Tom"],
                                  ["2", "hong hong", "￥23,789", "Jerry"],
                                  ["3", "hua hua", "￥56,142", "Amm"],
                                  ["4", "hello ", "￥38,735", "Japan"]
                              ]}
                          />
                          <Button color="primary">
                              点击我移动位置
                          </Button>
                      </CardBody>
                  </Card>
                  </GridItem>
              </GridContainer>
          </div>
      )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};



export default withStyles(dashboardStyle)(Dashboard);
