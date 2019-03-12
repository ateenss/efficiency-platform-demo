import React from "react";
import MUIDataTable from "mui-datatables";
import {connect} from 'react-redux';

class MuiTable extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         dataStore:this.props.dataStore
    //     };
    // }
    // getData=()=>{
    //     this.setState({
    //         dataStore:this.props.dataStore
    //     })
    // };
    render() {
        const{dataStore} =this.props;

        const columns = [ '项目名称', '创建时间', '项目描述' , '组织架构','项目富文本'];
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
        };

        return (
            <MUIDataTable
                title={"新建任务列表"}
                data={dataStore}
                columns={columns}
                options={options}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataStore:state.reducer.buildProject.MuitableData
    }
};

export default connect(mapStateToProps)(MuiTable);

