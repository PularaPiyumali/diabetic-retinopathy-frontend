import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
  const blogPosts = [
    {
      image: "post1.jpg",
      title: "Understanding Diabetic Retinopathy: Symptoms and Risk Factors",
      excerpt:
        "Learn about the early signs of Diabetic Retinopathy and who is at risk for developing this condition.",
      date: "Jan 15, 2025",
      author: "Dr. Emily Johnson",
      slug: "understanding-diabetic-retinopathy",
    },
    {
      image: "post2.jpg",
      title: "The Importance of Regular Eye Exams for Diabetic Patients",
      excerpt:
        "Discover why routine eye check-ups are crucial for managing diabetes and preventing vision loss.",
      date: "Feb 5, 2025",
      author: "Sarah Thompson",
      slug: "importance-of-regular-eye-exams",
    },
    {
      image: "post3.jpg",
      title: "Advances in AI-Powered Retinal Imaging Systems",
      excerpt:
        "Explore how artificial intelligence is revolutionizing the detection and monitoring of eye diseases.",
      date: "March 20, 2025",
      author: "Michael Chen",
      slug: "advances-in-ai-retinal-imaging",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">Blog & Resources</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={`/images/${post.image}`}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-black hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
