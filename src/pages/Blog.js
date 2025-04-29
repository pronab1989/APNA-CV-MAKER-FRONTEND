import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      title: "Tips for Creating a Standout Resume",
      date: "March 15, 2024",
      excerpt: "Learn the essential elements that make your resume stand out from the crowd.",
      category: "Resume Tips"
    },
    {
      title: "The Future of Job Applications",
      date: "March 10, 2024",
      excerpt: "Discover how AI and modern tools are changing the way we apply for jobs.",
      category: "Industry Insights"
    },
    {
      title: "Common Resume Mistakes to Avoid",
      date: "March 5, 2024",
      excerpt: "Don't let these common mistakes hold back your job application.",
      category: "Resume Tips"
    }
  ];

  return (
    <div className="blog-page">
      <div className="container py-5">
        <h1>Blog</h1>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <div key={index} className="blog-card">
              <div className="blog-category">{post.category}</div>
              <h2>{post.title}</h2>
              <div className="blog-date">{post.date}</div>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${index}`} className="read-more">Read More →</Link>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Blog; 