import ReactQuill from 'react-quill';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },

};


class EditQuill extends React.Component {
    constructor (props) {
        super(props);
        this.state = { editorHtml: '', theme: 'snow' };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (html) {
        this.setState({ editorHtml: html });
        this.props.onChange({keyNote:this.props.nameIn,value:html})
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({editorHtml : nextProps.defaultValue})
    }

    handleThemeChange (newTheme) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
    }

    componentDidMount() {
        !!this.props.defaultValue&& ( this.setState({
            editorHtml:this.props.defaultValue
        }))
    }

    render () {
        const { classes,classStyle ,placeholder} = this.props;

        return (
            <div className={classes.wrapper}>
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={EditQuill.modules}
                    formats={EditQuill.formats}
                    bounds={'.app'}
                    placeholder={placeholder}
                    className={classStyle}
                />
            </div>
        )
    }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditQuill.modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditQuill.formats = [
    'header', 'font', 'size','background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

/*
 * PropType validation
 */
EditQuill.propTypes = {
    placeholder: PropTypes.string,
};

// export default EditQuill;
export default withStyles(styles)(EditQuill);

