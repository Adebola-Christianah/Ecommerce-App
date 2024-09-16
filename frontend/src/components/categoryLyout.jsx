import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryLayout = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="flex gap-3">
      {/* Categories Section */}
      <div className="w-1/5 border-r bg-white">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img src={category.image} alt={category.name} className="w-10 h-10 object-cover mr-3" />
                <span className="font-semibold text-gray-700">{category.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategory Layout */}
      <div className="flex-1 bg-white shadow-md p-6">
        {categories.map((category) => (
          hoveredCategory === category.id && (
            <div key={category.id} className="grid grid-cols-4 gap-6">
              {/* Subcategories */}
              {category.subcategories.length > 0 && (
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 mb-3">{category.name}</h3>
                  <ul className="space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <Link
                          to={`/subcategory/${subcategory.id}`}
                          className="text-sm text-gray-500 hover:text-gray-800"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Child Categories */}
              {category.children.length > 0 && category.children.map((child) => (
                <div key={child.id} className="flex flex-col">
                  <h4 className="font-medium text-gray-600">{child.name}</h4>
                  {child.subcategories && (
                    <ul className="space-y-1">
                      {child.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={`/subcategory/${sub.id}`}
                            className="text-sm text-gray-500 hover:text-gray-800"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CategoryLayout;
