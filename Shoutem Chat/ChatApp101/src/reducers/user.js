
const initialState = {
    name: null,
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
    authorizing: false,
    authorized: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_NAME':
            debugger
            return Object.assign({}, state, {
                name: action.name
            });
        case 'SET_USER_AVATAR':
                debugger
            return Object.assign({}, state, {
                avatar: action.avatar
            });
        case 'USER_START_AUTHORIZING':
                debugger
            return Object.assign({}, state, {
                authorizing: true
            });
        case 'USER_AUTHORIZED':
                debugger
            return Object.assign({}, state, {
                authorizing: false,
                authorized: true
            });
        case 'USER_NO_EXIST':
                debugger
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false
            });

        default:
            return state
    }
}

export default user;
