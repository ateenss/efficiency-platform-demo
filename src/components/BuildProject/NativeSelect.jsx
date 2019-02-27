import React from 'react';
import Select from 'react-select';

// the default options. Anyway, we can based on user input then send a request to server, then make the response data as options.
// options contains basic value and label. Label can use HTML tag so that it can contain some user header or infomation. And options often made into propertity in class. this.options or this.state.options.
const options = [
    { value: '全渠道团队', label: '全渠道团队' },
    { value: '二维码团队', label: '二维码团队' },
    { value: '结算清算团队', label: '结算清算团队' }
];

class App extends React.Component {

    // get selection as selectionoption
    state = {
        selectedOption: null,
    }

    // handle select change
    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });
        console.log(`Option selected:`, selectedOption);
        // if selection change, send request to server => get response as new options.
    }

    render() {
        const {onChange}=this.props;
        return (
            <Select
                value={this.state.selectedOption}
                // onChange={this.handleChange}
                onChange={onChange}
                options={options}
            />
        );
    }
}

export default App