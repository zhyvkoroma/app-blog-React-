import React from 'react';
import './post-add-form.css'

const PostAddForm = ({onAdd}) => {
    return (
        <div className="bottom-panel d-flex">
            <input
                type="text"
                placeholder='Add new post'
                className='form-control new-post-label'
            />
            <button
                type='submit'
                className='btn btn-secondary'
                onClick={() => onAdd('Hello')}
            >
                Add Post
            </button>
        </div>
    )
}


export default PostAddForm;
