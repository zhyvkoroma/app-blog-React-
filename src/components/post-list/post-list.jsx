import React from "react";
import PostListItem from '../post-list-item/post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete}) => {

    const element = posts.map((item) => {
       return (
           <li key={item.id} className='list-group-item'>
               <PostListItem
                   {...item}
                    onDelete ={() => onDelete(item.id) }
               />
           </li>
       )
    });

    return (
        <ul className='app-list list-group'>
            {element}
        </ul>
    )
}

export default PostList;
