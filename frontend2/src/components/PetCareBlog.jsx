import React from 'react';
import { useNavigate } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: 'How to Keep Your Dog Happy',
    description: 'Learn tips and tricks to keep your furry friend happy and healthy.',
    image: 'https://plus.unsplash.com/premium_photo-1667673941713-ad4d4751c93b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `
      Dogs are loyal companions, and keeping them happy is essential for their well-being.
      Provide regular exercise to keep them physically active and healthy.
      Feed them a balanced diet to ensure they get the necessary nutrients.
      Spend quality time with them to strengthen your bond.
      Ensure regular vet checkups to monitor their health.
      Provide mental stimulation with toys and training to keep them engaged.
      Create a comfortable living environment for them.
      Socialize them with other dogs and people to improve their behavior.
      Groom them regularly to maintain their hygiene.
      Show them love and affection to make them feel secure and happy.
    `,
  },
  {
    id: 2,
    title: 'Choosing the Right Cage for Your Bird',
    description: 'Find out how to select the perfect cage for your feathered companion.',
    image: 'https://plus.unsplash.com/premium_photo-1664304957188-a2f67dd1f721?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `
      Choosing the right cage for your bird is crucial for their comfort and safety.
      Ensure the cage is spacious to allow free movement.
      Provide proper ventilation to maintain fresh air circulation.
      Use non-toxic materials to ensure your bird's safety.
      Add perches for resting and climbing.
      Include toys for mental stimulation and entertainment.
      Use food and water bowls that are easy to access and clean.
      Ensure the cage is easy to clean to maintain hygiene.
      Place the cage in a safe and quiet location away from direct sunlight and drafts.
      Avoid overcrowding the cage with too many birds or accessories.
      Regularly inspect the cage for wear and tear to ensure it remains safe.
    `,
  },
  {
    id: 3,
    title: 'Essential Accessories for Your Cat',
    description: 'Discover must-have accessories to keep your cat entertained and comfortable.',
    image: 'https://img.freepik.com/free-photo/pet-accessories-still-life-with-chew-bone-toys_23-2148949561.jpg?t=st=1743531481~exp=1743535081~hmac=605401e25e84c660b9e8f9ee4539656e7061f78f8f008d6eadee128de9492dd8&w=1380',
    content: `
      Scratching posts to keep their claws healthy and protect your furniture.
      Interactive toys to keep them mentally stimulated.
      A cozy bed for comfortable naps.
      A litter box with proper litter for hygiene.
      A cat tree for climbing and lounging.
      Food and water bowls that are easy to clean.
      A carrier for safe transportation.
      Grooming tools like brushes and nail clippers.
      A window perch for watching the outside world.
      A variety of treats to reward good behavior and keep them happy.
    `,
  },
];

const PetCareBlog = () => {
  const navigate = useNavigate();

  const handleBlogClick = (blog) => {
    navigate(`/pet-care-blog/${blog.id}`, { state: blog });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Pet Care Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleBlogClick(blog)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetCareBlog;
