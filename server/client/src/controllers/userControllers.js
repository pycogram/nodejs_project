/*==================Login user==================*/

const loginUser = async (email, password) => {
    if(! email){
        throw new Error('Enter email address')
    }
    if(! password){
        throw new Error('Enter password')
    }
    const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    
    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    localStorage.setItem('token', data.getTokenSignature);
    localStorage.setItem('email', data.email);

    return data;
}

/*==================Register user==================*/
const registerUser = async ({email, password, confirm_password}) => {
    if(! email){
        throw new Error('Enter email address')
    }
    if(! password){
        throw new Error('Enter password')
    }
    if(! confirm_password){
        throw new Error('Confirm password')
    }
    if( password !== confirm_password){
        throw new Error('confirm password do not match')
    }
    const res = await fetch('/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, confirm_password})
    });

    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    // localStorage.setItem('token', data.getTokenSignature);
    // localStorage.setItem('email', data.email);

    return data;
}

export {loginUser, registerUser}