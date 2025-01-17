import {
  insertData,
  readTable,
  updateData,
  deleteAllData,
} from '../utils/SQLiteDatabase';

let cart: any[] = [];

export const addToCart = (product: any) => {
  const existingProduct = cart.find(item => item.id == product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
    let data = {
      quantity: existingProduct.quantity,
    };
    updateData('cart', data, `product_id=${product.id}`);
  } else {
    cart.push({...product, quantity: 1});
    let data = {
      product_id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0] != null ? product.images[0] : product.image,
    };
    insertData('cart', data);
  }
};
export const updateCart =async (product: any, isMinus: boolean | null = null) => {
  let carts = await getCart()
  const existingProduct = carts.find(item => item.id == product.id);
  console.log("product.product_id",product.product_id)
  console.log("product.id",product.id)
  console.log("cart",carts[0])
  if (existingProduct) {
    if (!isMinus) {
      existingProduct.quantity += 1;
      let data = {
        quantity: existingProduct.quantity,
      };
      updateData('cart', data, `product_id=${product.product_id}`);
    } else {
      existingProduct.quantity -= 1;
      let data = {
        quantity: existingProduct.quantity,
      };
      updateData('cart', data, `product_id=${product.product_id}`);
    }
  } 
};
export const getCart = async () => {
  let data = await readTable('cart');
  return data;
};

export const resetCart = async () => {
  cart = [];
  deleteAllData('cart');
};
