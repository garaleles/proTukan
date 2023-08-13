import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';



export const getAllProducts =asyncHandler( async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500);
    throw new Error('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
   
  }
});

export const getProductById = asyncHandler(async (req, res) => { 
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  }
  else {
    res.status(404);
    throw new Error('Ürün bulunamadı.');
  }
});


