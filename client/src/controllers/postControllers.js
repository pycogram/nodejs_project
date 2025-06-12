/*==================Get all posts==================*/
const getPost = async () => {
    const res = await fetch('/api/post');
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    return data;
}

/*==================Get user posts==================*/
const getUserPost = async() => {
    const res = await fetch('/api/post/user', {
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }
    return data;
}

/*==================Create - user posts==================*/
const createUserPost = async (title, body) => {
    const res = await fetch('/api/post/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({title, body})
    })
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }
    return data;
}

/*==================Update - user posts==================*/
const updateUserPost = async ({_id, title, body}) => {
    const res = await fetch(`/api/post/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({title, body})
    })
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }
    return data;
}

/*==================Delete user posts==================*/
const deleteUserPost = async(_id) => {
    
    const res = await fetch(`/api/post/${_id}`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }
    return data;
}

export {getPost, getUserPost, createUserPost, updateUserPost, deleteUserPost};