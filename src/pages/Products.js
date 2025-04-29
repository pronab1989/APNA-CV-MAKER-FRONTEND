import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const products = [
    {
      name: "CV Maker Pro",
      description: "Our flagship CV creation tool with advanced templates and AI-powered suggestions.",
      features: [
        "Multiple professional templates",
        "AI-powered content suggestions",
        "One-click formatting",
        "PDF export"
      ]
    },
    {
      name: "Resume Analytics",
      description: "Get insights on how your resume performs and suggestions for improvement.",
      features: [
        "Resume performance tracking",
        "Keyword optimization",
        "Industry comparisons",
        "Improvement suggestions"
      ]
    },
    {
      name: "Portfolio Builder",
      description: "Create a stunning online portfolio to showcase your work.",
      features: [
        "Customizable layouts",
        "Project showcases",
        "Social media integration",
        "Custom domain support"
      ]
    }
  ];

  return (
    <div className="products-page">
      <div className="container py-5">
        <h1>Our Products</h1>
        <div className="products-intro">
          <p>Discover our suite of professional career development tools.</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <h2>{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="features-list">
                <h3>Key Features:</h3>
                <ul>
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Link to={`/products/${index}`} className="btn btn-outline-primary">Learn More</Link>
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

export default Products; 