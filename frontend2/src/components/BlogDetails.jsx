import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return <p className="text-center mt-8">No blog details available.</p>;
  }

  const points = blog.content
    .split('\n') // Split content by newline characters
    .map((point) => point.trim()) // Trim whitespace from each point
    .filter((point) => point !== ''); // Remove empty strings

  return (
    <div className="container mx-auto py-16">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-200 h-[500px] object-cover rounded-lg shadow-lg mb-6"
        />
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
        <ul className="list-decimal list-inside text-gray-700 space-y-2">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
