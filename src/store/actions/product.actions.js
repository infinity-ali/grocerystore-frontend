import axios from "axios";
import Server_Domain from "../../lib/config"
import { NotificationContainer, NotificationManager } from "react-notifications";
export const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS";
export const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";
export const GET_CART_PRODUCT = "GET_CART_PRODUCT";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PTODUCT_FROM_CART = "REMOVE_PTODUCT_FROM_CART";
export const CLIENT_SIGNUP = "CLIENT_SIGNUP";
export const EMAIL_VERIFICAION = "EMAIL_VERIFICAION";
export const CLIENT_LOGIN = "CLIENT_LOGIN";
export const CLIENT_ORDER = "CLIENT_ORDER";
export const CLIENT_ORDER_SUCCESS = "CLIENT_ORDER_SUCCESS";
export const CURRENT_CLIENT_DATA = "CURRENT_CLIENT_DATA";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const GET_PRODUCTS_CATEGORY = "GET_PRODUCTS_CATEGORY";
export const GET_SINGLE_CATEGORY = "GET_SINGLE_CATEGORY";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const FILTER_BY_SEARCH = "FILTER_BY_SEARCH";

export const LOADING_ALL_PRODUCTS = "LOADING_ALL_PRODUCTS";
export const LOADING_PRODUCTS_CATEGORY = "LOADING_PRODUCTS_CATEGORY";
export const LOADING_SINGLE_PRODUCT = "LOADING_SINGLE_PRODUCT";


export const getProductsList = () =>{
        const request = axios.post(
        "http://localhost:3002/api/product/view");
        return (dispatch) => {
            dispatch({type: "LOADING_ALL_PRODUCTS"});
            request.then((response)=>{
                // console.log("Response -action", response)
                return dispatch({
                    type:"GET_ADMIN_PRODUCTS",
                    payload: response?.data?.result,
                })
            }).then((response)=>{
                // console.log("Data Fetched successfully!", response)
            }).catch((err)=>{
                // console.log("Error Occurred:", err)
            })
        }
}

export const getSingleProduct = (id) =>{
    const request = axios.get(
    `http://localhost:3002/api/product/view/${id}`);
    return (dispatch) => {
        dispatch({type: "LOADING_SINGLE_PRODUCT"});
        request.then((response)=>{
            // console.log("Response -action", response)
            return dispatch({
                type:"GET_SINGLE_PRODUCT",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
        })
    }
}

// export const getProductCart = () =>{
//     return (dispatch) => {
//             return dispatch({
//                 type:"GET_CART_PRODUCT",
//                 // payload: data,
//             })
//     }
// }

export const addProductToCart = (data) =>{
    // console.log("Add to cart Data:", data)
    return (dispatch) => {
            // console.log("Add to product:", data)
            return dispatch({
                type:"ADD_PRODUCT_TO_CART",
                payload: data,
            })
    }
}

export const removeProductFromCart = (id) =>{
    
    return (dispatch) => {
            // console.log("Product Data:", data)
            return dispatch({
                type:"REMOVE_PTODUCT_FROM_CART",
                payload: id,
            });
    }
}

export const increaseProductQuantity = (id) => {
    return (dispatch) => {
        return dispatch({
            type:"INCREASE_PRODUCT_QUANTITY",
            payload: id,
        })
    }
}

export const decreaseProductQuantity = (id) => {
    return (dispatch) => {
        return dispatch({
            type:"DECREASE_PRODUCT_QUANTITY",
            payload: id,
        })
    }
}


export const clientSignup = (data) =>{
    // console.log("Data:", data)
    debugger
    const request = axios.post("http://localhost:3002/api/client/signup", {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        phone: data?.phone,
    });
    // console.log("resquest 1:", request)
    debugger
    return (dispatch) => {
        // console.log("resquest 2:", request)
        request.then((response)=>{
            // console.log("Response -action", response)
            debugger
            return dispatch({
                type:"CLIENT_SIGNUP",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
            debugger
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
            debugger
        })
    }
}

export const emailVerify = (data) =>{
    // console.log("Data:", data)
    
    const request = axios.post("http://localhost:3002/api/client/verify", data);
    // console.log("resquest 1:", request)

    return (dispatch) => {
        // console.log("resquest 2:", request)
        debugger
        request.then((response)=>{
            // console.log("Response -action", response)
            debugger
            return dispatch({
                type:"EMAIL_VERIFICAION",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
            debugger
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
            NotificationManager.error(err?.data?.msg || "Invalid Credentials")
            debugger
        })
    }
}

export const clientLogin = (data) =>{
    // console.log("Data:", data)
    
    const request = axios.post("http://localhost:3002/api/client/login", data);
    // console.log("resquest 1:", request)

    return (dispatch) => {
        // console.log("resquest 2:", request)
        
        request.then((response)=>{
            // console.log("Response -action", response)
            
            return dispatch({
                type:"CLIENT_LOGIN",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            NotificationManager.success("Logged In Successfully!")
            // console.log("Logged In Successfully!", response)
            
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
            NotificationManager.error(err?.response?.data?.message)
        })
    }
}

export const clientOrder = (data) =>{
    // console.log("Data:", data)
    const {accountEmail, name, phone, address, city, delievryNote, normalDelievery, items} = data;
    const note = delievryNote;
    const newData = ({ phone, address, city, items, note });
    // console.log("New Data:", newData)
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;
    const request = axios.post("http://localhost:3002/api/order/add", newData);
    // console.log("resquest 1:", request)
    
    return (dispatch) => {
        // console.log("resquest 2:", request)
        
        request.then((response)=>{
            // console.log("Response -action", response)
            
            return dispatch({
                type:"CLIENT_ORDER",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            NotificationManager.success("Order Placed Successfully")
            dispatch({
                type: "CLIENT_ORDER_SUCCESS",
            })
            // window.location.replace("/");
            // history.push("/")
            // console.log("Logged In Successfully!", response)
            
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
            NotificationManager.error(err?.response?.data?.message || "Order not placed, Some error occured")
            
        })
    }
}

export const currentClientData = (data) =>{
    // console.log("Data:", data)
    debugger
    return (dispatch) => {
        return dispatch({
            type:"CURRENT_CLIENT_DATA",
            payload: data,
        })
    }
}

// export function getCartProducts(){
//     return (dispatch) => {
//         return dispatch({
//             type: "GET_CART_PRODUCTS",
//         })
//     }
// }

export const getProductCategory = () =>{
    
    const request = axios.post(
    "http://localhost:3002/api/product/category/view");
    return (dispatch) => {
        dispatch({type: "LOADING_PRODUCTS_CATEGORY"});
        request.then((response)=>{
            // console.log("category - action", response)
            return dispatch({
                type:"GET_PRODUCTS_CATEGORY",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
        })
    }
}

export const getSingleCategory = (id) =>{
    
    const request = axios.get(
    `http://localhost:3002/api/product/category/view/${id}`);
    return (dispatch) => {
        request.then((response)=>{
            // console.log("single category - action", response)
            return dispatch({
                type:"GET_SINGLE_CATEGORY",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
        })
    }
}

export const setFilterProducts = (data) =>{
    // console.log("filtered products data:", data)
    const request = axios.post(
    "http://localhost:3002/api/product/view", data);
    return (dispatch) => {
        request.then((response)=>{
            // console.log("filter by price - action", response)
            return dispatch({
                type:"FILTER_PRODUCTS",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
        })
    }
}

export const searchProduct = () =>{

    const request = axios.post(
    "http://localhost:3002/api/product/view", {
        page: 0,
        limit: 10,
    });
    return (dispatch) => {
        request.then((response)=>{
            // console.log("filter by search - action", response)
            return dispatch({
                type:"FILTER_BY_SEARCH",
                payload: response?.data?.result,
            })
        }).then((response)=>{
            // console.log("Data Fetched successfully!", response)
        }).catch((err)=>{
            // console.log("Error Occurred:", err)
        })
    }
}