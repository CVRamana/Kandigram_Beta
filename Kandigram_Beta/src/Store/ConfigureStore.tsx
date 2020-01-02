import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../rootReducer/rootReducers";

import {
    persistStore,
    persistReducer
} from 'redux-persist';

const enhancer = compose(applyMiddleware(thunk));
const config : any = {
    key: 'root',
    keyPrefix: '',
    storage: AsyncStorage,
    whitelist: ["PersistReducer"],
    debug: true,
};
const storeReducer: any = persistReducer(
    config,
    rootReducer,
);

const store = createStore(storeReducer, enhancer);
persistStore(store)

export default store;