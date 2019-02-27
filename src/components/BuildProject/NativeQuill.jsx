import React from "react";
import Quill from "quill";
import { render } from "react-dom";
import "quill/dist/quill.snow.css";

class NativeQuill extends React.Component {
    state = {
        value: ""
    };
    componentDidMount() {
        // 配置项
        const options = {
            debug: "warn",
            theme: "snow",
            modules: {
                toolbar: "#toolbar"
            }
        };
        // 实例化 Quill 并且储存在实例原型上
        this.editor = new Quill("#editor", options);
        // 实现输入受控，从state中读取html字符串写入编辑器中
        const { value } = this.state;
        // 判断value中是否有值，如果有那么就写入编辑器中
        if (value) this.editor.clipboard.dangerouslyPasteHTML(value);
        this.editor.on("text-change", this.handleChange);
    }
    handleChange = () => {
        // change 事件将HTML字符串更新到state里面，
        this.setState({
            value: this.editor.root.innerHTML,
            mediaVisbile: false
        });
        this.props.onChange(this.state.value)
    };

    doRetrive=()=>{
        console.log(this.state.value)
    };
    render() {

        return (
            <div style={{ backgroundColor: "#fff" }} >
                <div id="toolbar" style={{ display: "flex", alignItems: "center" }}>
                    <select className="ql-size" defaultValue="small">
                        <option value="small">小</option>
                        <option value="large">中</option>
                        <option value="huge">大</option>
                    </select>
                    <button className="ql-bold" />
                    <select className="ql-color" defaultValue="">
                        <option value="#f5222d" />
                        <option value="#fa541c" />
                        <option value="#fa8c16" />
                        <option value="#faad14" />
                    </select>
                    <select className="ql-background" defaultValue="">
                        <option value="#f5222d" />
                        <option value="#fa541c" />
                        <option value="#fa8c16" />
                        <option value="#faad14" />
                    </select>
                    {/*<button
                        style={{ width: "80px" }}
                        onClick={this.bind(onChange,this.state.value)}
                    >
                        提交
                    </button>*/}
                </div>
                <div id="editor" />
            </div>
        );
    }
}

export default NativeQuill