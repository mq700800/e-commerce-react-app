import {applyMiddleware, combineReducers, createStore}  from 'redux';
import thunk from 'redux-thunk';
import {productListReducer,productDetailsReducer} from './reducers/productReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducer'; 
import { userLoginReducer ,userRegisterReducer,
    userDetailsReducer, userUpdateProfileReducer
} from './reducers/userReducer';
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducer';
import { JsonWebTokenError } from 'jsonwebtoken';

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')):
{
    
}

const userInfoFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;
const cartItemsForStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]

const reducer = combineReducers({ 
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister :userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy : orderListMyReducer
});
const initialState = {
    //  cart :{cartItems:"mqasimdogar"},
     cart :{cartItems:cartItemsForStorage,shippingAddress: shippingAddressFromStorage},
     userLogin:{userInfo:userInfoFormStorage}
};
const middleware = [thunk];

const store = createStore(
    reducer , 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

    export default store;