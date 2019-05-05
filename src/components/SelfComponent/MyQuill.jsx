import React from "react";
import Quill from "quill";
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
        value: ""
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

        // 实例化 Quill 并且储存在实例原型上
        this.editor = new Quill("#editor", options);
        // 实现输入受控，从state中读取html字符串写入编辑器中
        const { value } = this.state;
        // 判断value中是否有值，如果有那么就写入编辑器中
        if (!!this.props.defaultValue) this.editor.clipboard.dangerouslyPasteHTML(this.props.defaultValue);
        // 设置事件，change事件，
        this.editor.on("text-change", this.handleChange);
    }

    handleChange = () => {
        // change 事件将HTML字符串更新到state里面，
        this.setState({
            value: this.editor.root.innerHTML,
            mediaVisbile: false
        });
        this.props.onChange({keyNote: this.props.nameIn, value: this.editor.root.innerHTML})
    };

    render() {
        return (
                <div id="editor" style={{height:"500px"}}/>
        );
    }
}
export default withStyles(styles,{withTheme: true})(MyQuill);
