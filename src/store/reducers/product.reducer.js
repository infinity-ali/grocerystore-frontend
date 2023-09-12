import { CgOpenCollective } from "react-icons/cg";
import * as Actions from "../actions"

const initialState = {
    AdminProducts: {
        loading: false,
        rows: 0,
        totalProducts: 0,
    },
    SingleProduct:{
        Loading: false,
        details: null,
    },
    CartProducts:{
        Loading: false,
        productDetail: JSON.parse(localStorage.getItem("cart-products")),
        items: JSON.parse(localStorage.getItem("items")),
    },
    ClientSignup:{
        Loading: false,
        clientDetails: null,
    },
    EmailVerify:{
      Loading: false,
      verificationDetails: null,
    },
    ClientLogin:{
      Loading: false,
      clientDetails: JSON.parse(localStorage.getItem("client")),
      token: localStorage.getItem("token"),
    },
    ClientOrder:{
      Loading: false,
      orderDetails: null,
      success: false,
    },
    CurrentClientData:{
      Loading: false,
      clientDetails: null,
    },
    ProductCategory:{
      Loading: false,
      totalCategories: null,
      categories: null,
    },
    SingleProductCategory: {
      Loading: false,
      singleCategory: null,
    },
    FilterProducts: {
      loading: false,
      filterProducts: null,
    },
    FilterBySearch:{
      loading: false,
      filterBySearch: null,
    }
};

const adminReducer = function (state = initialState, action){
    switch(action.type){

      // Loading Reducers
        case Actions.LOADING_ALL_PRODUCTS:{  
          return {
            ...state,
            AdminProducts: {
              loading: true,
              rows: 0,
              totalProducts: 0,
            },
          }
        }

        case Actions.LOADING_PRODUCTS_CATEGORY:{  
          return {
            ...state,
            ProductCategory:{
              Loading: true,
              totalCategories: null,
              categories: null,
            },
          }
        }

        case Actions.LOADING_SINGLE_PRODUCT:{  
          return {
            ...state,
            SingleProduct:{
              Loading: true,
              details: null,
           },
          }
        }
        

        // Response Reducers
        case Actions.GET_ADMIN_PRODUCTS:{
            let responseMapped = [];
            let totalProducts;
            if(action.payload){
                let res = action.payload;
                totalProducts = res.count;
                responseMapped = res.rows.map((products)=>({
                    id: products.id,
                    title: products.title,
                    price: products.price,
                    discount: products.discount,
                    description: products.description,
                    unitQuantity: products.unitQuantity,
                    categoryId: products.categoryId,
                    productimages: products.productImages[0],
                  }));
                }
                
                return {
                    ...state,
                    AdminProducts: {
                        loading: false,
                        rows: responseMapped,
                        totalProducts,
                    },
                };
        }

        case Actions.GET_SINGLE_PRODUCT: {
            let resFormattedMapped = {};
            if (action.payload) {
              let product = action.payload;
              // console.log("Product - single - reducer:", product)
              resFormattedMapped = {
                id: product.id,
                title: product.title,
                price: product.price,
                discount: product.discount,
                description: product.description,
                unitQuantity: product.unitQuantity || 0,
                categoryId: product.categoryId,
                quantity: product.quantity,
                productimages: product.productImages,
              }
            }
            // console.log("Product - single - reducer 11:", resFormattedMapped)
            return {
              ...state,
              SingleProduct: {
                Loading: false,
                details: resFormattedMapped,
              },
            };
          }

        //   case Actions.GET_CART_PRODUCT: { 
        //     // const newCartArray = initialState?.CartProducts?.productId;
        //     let resFormattedMapped = {};
        //     if(action.payload){
        //         let data = action.payload;
        //     return{
        //         ...state,      
        //     }
        //   }
        // }

          case Actions.ADD_PRODUCT_TO_CART: { 
            // const newCartArray = initialState?.CartProducts?.productId;
            let resFormattedMapped = {};
            if(action.payload){
                let data = action.payload;
                // console.log("Action . payload:", action.payload)
                // console.log("Product detail - reduces: ", data)
                // console.log("Product images in reducer:", JSON.parse(data.getAll("productimages")))
                resFormattedMapped = {
                    id: data.get("id"),
                    title: data.get("title"),
                    price: data.get("price"),
                    discount: data.get("discount"),
                    description: data.get("description"),
                    unitQuantity: data.get("unitQuantity"),
                    categoryId: data.get("categoryId"),
                    productimages: JSON.parse(data.getAll("productimages")),
                    quantity: data.get("quantity"),
                // newCartArray.push(id);
            }
            console.log("resFormatted:", resFormattedMapped)

            var productData=[]; 
            var items = []

            if(initialState.CartProducts.productDetail===null || initialState.CartProducts.productDetail===undefined){
              productData.push(resFormattedMapped);
              var item = {
                productId: resFormattedMapped.id,
                quantity: 1
              };

              items.push(item)
            }
            

            else{
            
              // increment on previous item
              const id = resFormattedMapped?.id;
              const productsArray = initialState?.CartProducts?.productDetail;
              // console.log("Products Array:", productsArray);
              const itemsArray = initialState?.CartProducts?.items;

              // products
              var newProductsArray = [];
              newProductsArray = productsArray.findIndex((product)=>{
                // console.log(product?.id, id)
                return product?.id === id;
              })
              // console.log("Already Present Product Index---:", newProductsArray)

              // items
              var newItemsArray = [];
              newItemsArray = itemsArray?.findIndex((item)=>{
                return item?.productId === id;
              })
              // console.log("Already Present Item Index :", newItemsArray)

              // add to the previos one
              if(newProductsArray>=0){
                // console.log("Quantity added", newProductsArray)
                itemsArray[newItemsArray].quantity += 1; 
                items = itemsArray;
                // productData.push(resFormattedMapped);
                // console.log("product data-- if:", productData)
                productData = initialState?.CartProducts?.productDetail;
              }
              
              else{
                // add new product
                productData = initialState?.CartProducts?.productDetail;
                productData.push(resFormattedMapped);
                // console.log("product-Data-- else:", productData)
              }

              
                // items
                var items = []
                // console.log("initial state:", initialState)

                  if(initialState?.CartProducts?.items===null || initialState?.CartProducts?.items===undefined || initialState?.CartProducts?.items===""){
                  var item = {
                    productId: resFormattedMapped.id,
                    quantity: 1
                  };

                  items.push(item)
                  localStorage.setItem("items", JSON.stringify(items))
                  // console.log("item added: forst time")
                }

                else{

                  // increment on previous item
                  const id = resFormattedMapped?.id;
                  const itemsArray = initialState?.CartProducts?.items;
                  var presentId = null;

                  // console.log("id:", id)
                  // console.log("items array:", itemsArray)

                  var newItemsArray = [];
                  newItemsArray = itemsArray.findIndex((item)=>{
                    return item.productId === id;
                  })
                  // console.log("id---:", newItemsArray)

                  if(newItemsArray>=0){
                    // itemsArray[newItemsArray].quantity += 1; 
                    items = itemsArray;
                  }

                  else{
                    // add new product
                    items = initialState?.CartProducts?.items;
                    var item = {
                      productId: resFormattedMapped.id,
                      quantity: 1
                    };

                    items.push(item)
                  }

                  // console.log("itemsArray-- quanity added:", items)
                  localStorage.setItem("items", JSON.stringify(items))
                }
            }

            localStorage.setItem("items", JSON.stringify(items))
            localStorage.setItem("cart-products", JSON.stringify(productData))
            // const response = JSON.parse(localStorage.getItem("cart-products"))
            // console.log("cart response:", response)

            return{
                ...state,
                CartProducts: {
                    loading: false,
                    productDetail: JSON.parse(localStorage.getItem("cart-products")),
                    items: localStorage.getItem("items"),
                }               
            }
          }
        }

        case Actions.REMOVE_PTODUCT_FROM_CART: { 
          // const newCartArray = initialState?.CartProducts?.productId;
          
          // console.log("Action.payload:", action.payload)
          
          if(action.payload!==null){
              let data = action.payload;
              // console.log("product details 1", data)
              

              var productData=[];
              productData = initialState.CartProducts.productDetail;
              if(productData===null){
                productData = JSON.parse(localStorage.getItem("cart-products"))
              }
              // console.log("product details 2", productData)
              
              //delete items
              var itemsData = [];
              itemsData = initialState?.CartProducts?.items;
              // console.log("itemsData:", itemsData)
              if(itemsData===null){
                itemsData = JSON.parse(localStorage.getItem("items"))
              }
              itemsData?.splice(data, 1)
              // console.log("items Data:", itemsData)
              localStorage.setItem("items", JSON.stringify(itemsData))

              // delete cart products
              productData.splice(data, 1);
              // console.log("product details 3", initialState.CartProducts.productDetail)
              localStorage.setItem("cart-products", JSON.stringify(productData))
          }
  
          return{
              ...state,
              CartProducts: {
                  loading: false,
                  productDetail: JSON.parse(localStorage.getItem("cart-products")),
                  items: itemsData
              }               
          }
       
      }

        case Actions.INCREASE_PRODUCT_QUANTITY: {
          let item = 0;
          // console.log("initial state:", initialState)
          if(action.payload!==null){

            let id = action?.payload;
            let cart = initialState?.CartProducts;
            // console.log("Cart:", cart)

            let cartProducts = JSON.parse(localStorage.getItem("cart-products"));
            // console.log("cart products:", cartProducts)
           
            let singleProduct = cartProducts[id];
            let singleProductQuantity = singleProduct?.quantity;
            
            item = initialState.CartProducts.items;
            // console.log("Items:", item)
            if(item===null){
              item = JSON.parse(localStorage.getItem("items"))
            }
            let quantity = Number(item[id]?.quantity);
            // console.log("quantity--reduces:", quantity);

            if(quantity<singleProductQuantity){
              quantity += 1;
              item[id].quantity = quantity
              // console.log("Product:", item)
            }
            else{
              alert("Product quantity is exceeding stock limit")
            }
          
            const items = item;
            localStorage.setItem("items", JSON.stringify(items))
          }

          // console.log("State:", state)
          return{
            ...state,
            CartProducts:{
              loading: false,
              productDetail: JSON.parse(localStorage.getItem("cart-products")),
              items: JSON.parse(localStorage.getItem("items"))
            }
          }
        }

        case Actions.DECREASE_PRODUCT_QUANTITY: {
          // console.log("initial state:", initialState)
          let item = 0;
          if(action?.payload!==null){
            let id = action?.payload;
            let cart = initialState?.CartProducts;
            // console.log("Cart:", cart)

            item = initialState.CartProducts.items;
            if(item===null){
              item = JSON.parse(localStorage.getItem("items"))
            }
            // console.log("items--:", item)
            let quantity = Number(item[id].quantity);

            if(quantity>1){
              quantity -= 1;
              item[id].quantity = quantity
              // console.log("Product:", item)
            }

            const items = item;
            localStorage.setItem("items", JSON.stringify(items))

          }
          return{
            ...state,
            CartProducts:{
              loading: false,
              productDetail: JSON.parse(localStorage.getItem("cart-products")),
              items: JSON.parse(localStorage.getItem("items"))
            }
          }
        }

        case Actions.CLIENT_SIGNUP:{
          let resFormattedMapped = {};
          // console.log("Reducer--signup:", action.payload)
          debugger
          if(action.payload!==null){
            const data = action.payload;
            resFormattedMapped = {
              name: data.name,
              email: data.email,
              phone: data.phone,
              password: data.password,
            }
            
          }
          // console.log("mapped:", resFormattedMapped);
          debugger

          return{
            ...state,
            ClientSignup: {
                loading: false,
                clientDetails: resFormattedMapped,
            }               
          }
        }

        case Actions.EMAIL_VERIFICAION:{
          let resFormattedMapped = {};
          // console.log("Reducer--verification:", action.payload)
          debugger
          if(action.payload!==null){
            const data = action.payload;
            // console.log("Data----:", data)
            debugger
            resFormattedMapped = {
              client: data?.clientInfo,
              // token: data?.tokenInfo,
            }
            
          }
          // console.log("mapped:", resFormattedMapped);
          debugger

          return{
            ...state,
            EmailVerify: {
                loading: false,
                verificationDetails: resFormattedMapped,
            }               
          }
        }

        case Actions.CLIENT_LOGIN:{
          let resFormattedMapped = {};
          // console.log("Reducer--login:", action.payload)
          
          if(action.payload!==null){
            const data = action.payload;
            // console.log("data:", data)
            resFormattedMapped = {
              client: data?.clientInfo,
              token: data?.tokenInfo,
            }
            localStorage.setItem("token", data?.tokenInfo)
            localStorage.setItem("client", JSON.stringify(data?.clientInfo))
          }
          // console.log("mapped:", resFormattedMapped);
          // console.log("Token:", localStorage.getItem("token"));

          return{
            ...state,
            ClientLogin: {
                loading: false,
                clientDetails: localStorage.getItem("client"),
                token: localStorage.getItem("token"),
            }               
          }
        }

        case Actions.CLIENT_ORDER:{
          let resFormattedMapped = {};
          // console.log("Reducer--order:", action.payload)
          
          if(action.payload!==null){
            const data = action.payload;
            resFormattedMapped = {
              amount: data?.amount,
              client_id: data?.client_secret,
              items: data?.items,
              orderId: data?.orderId
            }
          }
          // console.log("mapped:", resFormattedMapped);
          

          return{
            ...state,
            ClientOrder: {
                loading: false,
                orderDetails: resFormattedMapped,
                success: false,
            }               
          }
        }

        case Actions.CLIENT_ORDER_SUCCESS:{
          localStorage.setItem("order-status", true)
          return{
            ...state,
            ClientOrder: {
              // loading: false,
              // orderDetails: ,
              success: true,
          }       
          }
        }

        case Actions.CURRENT_CLIENT_DATA: { 
          // const newCartArray = initialState?.CartProducts?.productId;
          
          // console.log("Action.payload:", action.payload)
          debugger
          let resFormattedMapped = {};
          if(action.payload!==null){
              let data = action.payload;
              // console.log("product details 1", data)
              debugger
              resFormattedMapped = {
                email: data?.accountEmail,
                name: data?.name,
                phone: data?.phone,
                address: data?.address,
                city: data?.city,
                note: data?.delievryNote,
              }
          }
  
          // console.log("Mapped:", resFormattedMapped)
          debugger
          return{
              ...state,
              CurrentClientData: {
                  loading: false,
                  clientDetails: resFormattedMapped,
              }               
          }
       
      }

      case Actions.GET_PRODUCTS_CATEGORY:{
        let totalProducts, res;
        if(action.payload){
            res = action.payload;
            // console.log("Response of Reducer:", res);
            totalProducts = res.count;
            // console.log("Res:", res)
            }
            return {
                ...state,
                ProductCategory: {
                    Loading: false,
                    totalCategories: totalProducts,
                    categories: res,
                },
            };
    }

    case Actions.GET_SINGLE_CATEGORY:{
      let res;
      if(action.payload!==null){
          res = action.payload;
          // console.log("Response of Reducer:", res);
          // console.log("Res:", res)
          }
          return {
              ...state,
              SingleProductCategory: {
                  loading: false,
                  singleCategory: res,
              },
          };
      }

      case Actions.FILTER_PRODUCTS:{
        let res;
        if(action.payload!==null){
            res = action.payload;
            // console.log("Response of Reducer:", res);
            // console.log("Res:", res)
            }
            return {
                ...state,
                FilterProducts: {
                    loading: false,
                    filterProducts: res,
                },
            };
        }

        case Actions.FILTER_BY_SEARCH:{
          let res;
          if(action.payload!==null){
              res = action.payload;
              // console.log("Response of Reducer:", res);
              // console.log("Res:", res)
              }
              return {
                  ...state,
                  FilterBySearch: {
                      loading: false,
                      filterBySearch: res,
                  },
              };
          }

        default: return state;
    }
}
export default adminReducer;