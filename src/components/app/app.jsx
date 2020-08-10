import React, {Component} from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../app-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'You can perform an interview in a matter of minutes. Who is an important person in your area of interest that you believe would spark the interest of your readers?', important: true,  like: false, id: 1},
                {label: 'We all look for reviews before purchasing. It is what everyone does nowadays. So why not write a review for the latest gadget or service you’ve bought?', important: false, like: false, id: 2},
                {label: 'Video blogs, or “vlogging”, is becoming more and more popular these days. Video blogs give you the luxury of discussing a lot of content with relatively little effort.', important: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxID = 4;
    }

    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const before = data.slice(0, index)
            const after = data.slice(index + 1)
            const newArr = [...before, ...after]

            return {
                data: newArr
            }
        })
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxID++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id){
        this.setState(({data}) => {
            const index = data.findIndex((element) => element.id === id );
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)]

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex((element) => element.id === id );
            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)]

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if(term.length === 0){
            return items
        }

        return items.filter((item) => item.label.indexOf(term) > -1)
    }

    filterPosts(items, filter) {
        if(filter === 'like') {
            return items.filter(items => items.like)
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);

        return(
            <div className='app'>
                <AppHeader
                    liked = {liked}
                    allPosts={allPosts}
                />
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}




