import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import React from "react"
import {connect} from 'react-redux';
// import Table from '@material-ui/core/Table';

/*
"@devexpress/dx-react-core": "^1.8.0",
    "@devexpress/dx-react-grid": "^1.8.0",
    "@devexpress/dx-react-grid-material-ui": "^1.8.0",
*/

const rows=[
        { id: 0, product: 'DevExtreme', time: 'DevExpress' , description: 'DevExpress', organize: 'DevExpress', quill: 'DevExpress'},
{ id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
];
const columns=[
        { name: 'id', title: 'ID' },
{ name: 'product', title: '项目名称' },
{ name: 'time', title: '创建时间' },
{ name: 'description', title: '项目描述' },
{ name: 'organize', title: '组织架构' },
{ name: 'quill', title: '项目富文本' },
];
class DxGrid extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        // const {rows} =this.props;
        return (
            <Grid
                rows={rows}
                columns={columns}
            >
                <Table/>
                <TableHeaderRow/>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return {}
};
export default connect(mapStateToProps)(DxGrid)