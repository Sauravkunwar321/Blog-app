"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") router.push("/login");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const blogKey = `blogs_${currentUser.email}`;
    let storedBlogs = JSON.parse(localStorage.getItem(blogKey) || "[]");
    if (storedBlogs.length === 0) {
      storedBlogs = [
        {
          title: "Dogs-The Loyal Animals",
          description:
            "Dogs are loyal companions and known as man's best friend. They bring joy and companionship. All families should have a dog with whom they can enjoy their time.",
          image:
            "https://static.vecteezy.com/system/resources/thumbnails/005/857/332/small_2x/funny-portrait-of-cute-corgi-dog-outdoors-free-photo.jpg",
        },
        {
          title: "Forest-The Most Mysterious",
          description:
            "Forests are magical places filled with biodiversity and hidden wonders. They’re essential for the planet. But sometimes I wonder, what mystries does a forest hold. When I enter a huge forest, they took my breath away. The creatures existing in forest may be small or huge. I always wonder how much mystries had it captured within itself.",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePvI_cF2gdEOaNkE-ArSnmkvVrd76RXJYbg&s",
        },
        {
          title: "Summer-My Favourite Season",
          description:
            "Summer is a time of joy, vacation, and sunshine. People love beach days and outdoor activities. I too love summer but my hometown is Butwal and currently summer is not quite enjoyable there. The sorching heat of the sun take away all the enjoyment I used to had during my childhood days. During childhood, I used to wonder how my father was working in the high tempreature of Dubai and currently I think, our country is experiencing the same thing. I hope we as a human can controll the climate change and improve overall health of our nature.",
          image:
            "https://miro.medium.com/v2/resize:fit:1400/0*1DtL639ZXJQj8ZDA.jpg",
        },
        {
          title: "Winter- The Slow mode",
          description:
            "Winter brings snow, cold air, and holidays. It’s the perfect season for hot cocoa and cozy nights. I love winters too as I love being around my parents and enjoy taking the warmth from the fire while listening to my parents talk. I want to make their life more comfortable like we feel when we are in our bed during winter days.",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIvvuHtaW3DFi2rgJVErmbFWGAkuVrTaQvw&s",
        },
        {
          title: "Discipline- The Powerful Truth",
          description:
            "Discipline helps you achieve goals, stay focused, and build good habits that last a lifetime. I too try to be disciplined. ",
          image:
            "https://thumbs.dreamstime.com/b/man-jumping-over-abyss-text-discipline-goals-man-jumping-over-abyss-text-discipline-goals-front-sunset-111231220.jpg",
        },
      ];
      localStorage.setItem(blogKey, JSON.stringify(storedBlogs));
    }
    setBlogs(storedBlogs);
  }, []);

  const saveBlogs = (newBlogs) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const blogKey = `blogs_${currentUser.email}`;
    localStorage.setItem(blogKey, JSON.stringify(newBlogs));
    setBlogs(newBlogs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlogs = [...blogs];
    if (editingIndex !== null) {
      newBlogs[editingIndex] = form;
      setEditingIndex(null);
    } else {
      newBlogs.unshift(form);
    }
    saveBlogs(newBlogs);
    setForm({ title: "", description: "", image: "" });
  };

  const handleEdit = (index) => {
    setForm(blogs[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newBlogs = blogs.filter((_, i) => i !== index);
    saveBlogs(newBlogs);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">📝 My Blogs</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4 mb-10"
        >
          <h3 className="text-xl font-semibold text-gray-700">
            {editingIndex !== null ? "Edit Blog" : "Add New Blog"}
          </h3>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
            {editingIndex !== null ? "Update Blog" : "Add Blog"}
          </button>
        </form>

        
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mb-3">{blog.description}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-white font-bold px-3 py-2 bg-blue-400 rounded-xl cursor-pointer hover:bg-blue-500 hover:scale-105 transition-all  ease-in-out "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-white font-bold px-3 py-2 bg-red-600 rounded-xl cursor-pointer hover:bg-red-700 hover:scale-105 transition-all  ease-in-out "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
