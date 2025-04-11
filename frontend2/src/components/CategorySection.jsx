import React from 'react';

const categories = [
  { name: 'Food', image: 'https://media.istockphoto.com/id/1361708626/photo/various-types-of-dry-food-for-dog-on-table-top.jpg?s=1024x1024&w=is&k=20&c=8uIw_xhFfMKSA5O5ljHgOEgSWhR-SK228p7ZdL5Osqs=', path: '/categories/food' },
  { name: 'Toys', image: 'https://img.freepik.com/free-photo/pet-accessories-still-life-concept-with-colorful-objects_23-2148949578.jpg?t=st=1743531156~exp=1743534756~hmac=50fe2d6087e4f475e653e68250695383d2a1aa751ed340a3bfdf0778ee42485c&w=1380', path: '/categories/toys' },
  { name: 'Accessories', image: 'https://img.freepik.com/free-photo/pet-accessories-still-life-with-chew-bone-toys_23-2148949561.jpg?t=st=1743531481~exp=1743535081~hmac=605401e25e84c660b9e8f9ee4539656e7061f78f8f008d6eadee128de9492dd8&w=1380', path: '/categories/accessories' },
  { name: 'Health', image: 'https://media.istockphoto.com/id/1397526585/photo/veterinary-pills-or-medication-pet-medication-pet-supplements-or-vitamins-with-pet-food-in.jpg?s=2048x2048&w=is&k=20&c=0WEOJS1yM75QLr56o4LFQuNMIdS0kQOadAmSYFpxFso=', path: '/categories/health' }, // Ensure Health category is linked
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a href={category.path} key={category.name} className="block">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover rounded-lg shadow-md hover:scale-110 hover:shadow-xl transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
