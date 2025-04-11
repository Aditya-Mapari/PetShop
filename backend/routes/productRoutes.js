const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Fetch products by category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    console.log(`Fetching products for category: ${categoryName}`); // Log the category name

    const products = await Product.find({ category: categoryName });
    if (!products || products.length === 0) {
      console.log(`No products found for category: ${categoryName}`); // Log if no products are found
      return res.status(200).send([]); // Return an empty array instead of 404
    }

    console.log(`Products found for category ${categoryName}:`, products); // Log the fetched products
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products by category:', error); // Log the error
    res.status(500).send({ error: 'Failed to fetch products.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Seed products for the Health category
router.post('/seed-health-products', async (req, res) => {
  try {
    const healthProducts = [
      {
        name: 'Bird Multivitamin Supplement',
        price: 15.99,
        description: 'A multivitamin supplement to keep your bird healthy and active.',
        category: 'Health',
        image: '/images/bird-medicine.jpg',
      },
      {
        name: 'Dog Deworming Tablets',
        price: 25.99,
        description: 'Effective deworming tablets for dogs of all sizes.',
        category: 'Health',
        image: '/images/dog-medicine.jpg',
      },
      {
        name: 'Cat Immune Booster',
        price: 19.99,
        description: 'An immune booster to keep your cat healthy and strong.',
        category: 'Health',
        image: '/images/cat-medicine.jpg',
      },
      {
        name: 'Bird Calcium Supplement',
        price: 12.99,
        description: 'Calcium supplement to strengthen your bird’s bones.',
        category: 'Health',
        image: '/images/bird-calcium.jpg',
      },
      {
        name: 'Dog Joint Support',
        price: 29.99,
        description: 'Joint support tablets to improve mobility in dogs.',
        category: 'Health',
        image: '/images/dog-joint-support.jpg',
      },
      {
        name: 'Cat Hairball Remedy',
        price: 14.99,
        description: 'A remedy to reduce hairballs and improve digestion in cats.',
        category: 'Health',
        image: '/images/cat-hairball-remedy.jpg',
      },
    ];

    await Product.insertMany(healthProducts);
    res.status(201).send({ message: 'Health products added successfully!' });
  } catch (error) {
    console.error('Error seeding health products:', error);
    res.status(500).send({ error: 'Failed to seed health products' });
  }
});

// Increase pricing of all products by a random value between 300 and 500
router.put('/increase-pricing', async (req, res) => {
  try {
    const products = await Product.find();
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const randomIncrease = Math.floor(Math.random() * (500 - 300 + 1)) + 300; // Random value between 300 and 500
        product.price += randomIncrease;
        await product.save();
        return product;
      })
    );
    res.status(200).send({ message: 'Product prices updated successfully!', updatedProducts });
  } catch (error) {
    console.error('Error updating product prices:', error);
    res.status(500).send({ error: 'Failed to update product prices' });
  }
});

module.exports = router;
