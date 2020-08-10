import React, {Component} from 'react';

import './search-panel.css';


class SearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input type="text"
                   className='form-control search-input'
                   placeholder='Search posts'
                   value={this.state.term}
                   onChange={this.onUpdateSearch}
            />
        );
    }
}

export default SearchPanel;

