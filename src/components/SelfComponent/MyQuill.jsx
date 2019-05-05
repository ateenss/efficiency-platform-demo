import React from "react";
import Quill, {Delta} from "quill";
import "quill/dist/quill.snow.css";
import {withStyles} from '@material-ui/core/styles';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    }

};

class MyQuill extends React.Component {
    state = {
        value: "",
        defaultValue : ""
    };
    componentDidMount() {
        // 配置项，在Quill 官网上有详细说明


        const options = {
            debug: "warn",
            theme: "snow",
            modules: { // 自定义 toolbar 填写这个属性， 值写上 div 的 id
                toolbar: [
                    [{'font': []}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                        {'indent': '-1'}, {'indent': '+1'}],
                    [{'color': []}, {'background': []}],
                    [{'align': []}],
                    ['clean'],
                    ['link', 'image'],
                ],
                clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                }
            },
            formats : [
                'header', 'font', 'size', 'background',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
            ]
        };

        if (!!this.props.readOnly) {
            options.modules.toolbar = false;
            options.readOnly = this.props.readOnly
        }

        this.editor = new Quill("#editor", options);
        if (!!this.props.defaultValue){
            this.editor.clipboard.dangerouslyPasteHTML(this.props.defaultValue);
        }
        this.editor.on("text-change", this.handleChange);
    }

    handleChange = () => {
        // change 事件将HTML字符串更新到state里面，
        // this.setState({
        //     value: this.editor.root.innerHTML,
        // });
        this.props.onChange({keyNote: this.props.nameIn, value: this.editor.root.innerHTML})
    };

    render() {
        return (
                <div id="editor" style={{height:"500px"}}/>
        );
    }
}
export default withStyles(styles,{withTheme: true})(MyQuill);
