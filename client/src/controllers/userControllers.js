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

/*==================Request code by user==================*/
const requestCode = async (email) => {
    if(! email){
        throw new Error('Enter code sent to your email inbox or spam box')
    }
    const res = await fetch('/api/user/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });

    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    return data;
}

/*==================Verify user==================*/
const verifyUser = async (email_code) => {
    if(! email_code){
        throw new Error('Enter code sent to your email inbox or spam box')
    }
    const res = await fetch('/api/user/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email_code})
    });

    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    return data;
}

/*==================Register user==================*/
const registerUser = async ({name, email, password, confirm_password}) => {
    if(! name){
        throw new Error('Enter name')
    }
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
        body: JSON.stringify({name, email, password, confirm_password})
    });

    const data = await res.json();

    if(! res.ok){
        throw new Error(`${data.message}`);
    }

    // localStorage.setItem('token', data.getTokenSignature);
    // localStorage.setItem('email', data.email);

    return data;
}

export {loginUser, registerUser, requestCode, verifyUser}