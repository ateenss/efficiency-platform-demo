import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'
import Table from 'braft-extensions/dist/table'

class BraftOwnEditor extends React.Component {

    state = {
        editorState: BraftEditor.createEditorState('请填写开发方案！'),
        outputHTML:'<p></p>',
        aa : 0
    };
    options = {
        defaultColumns:3,
        defaultRows:3,
        withDropdown: true,
    };
    /*showTable=()=>{
      return <Table options={this.options}/>
    };*/

      componentDidMount() {

          BraftEditor.use(Table(this.options));
          !!this.props.defaultValue && (this.setState({
              editorState: BraftEditor.createEditorState(this.props.defaultValue)
          }))
      }


    /*handleChange = (editorState) => {
        this.setState({ editorState })
    };*/

    handleChange = (editorState) => {
        this.setState({editorState:editorState
        });
        console.log("我再大致");
        console.log(this.state.editorState);
        // this.props.onChange({keyNote: this.props.nameIn, value: editorState.toHTML(Object)})
        this.props.onChange({keyNote: this.props.nameIn, value:editorState.toHTML()})
    };


    render () {
        const controls=['bold','italic','underline','text-color','separator','link','separator'];
        /*const extendControls=[{
            key:'wantTable',
            type:'component',
            text:'表格',
            // component:<Table options={this.options}/>
            component:<Table controls={this.options}/>
            }]
        ;*/
        return (
            <BraftEditor value={this.state.editorState}
                         onChange={this.handleChange}
                         /*extendControls={extendControls}*/
                        /* controls={controls}*/
            />
        )
    }



}


export default BraftOwnEditor;