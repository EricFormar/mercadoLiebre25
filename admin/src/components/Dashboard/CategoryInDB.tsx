import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "../../interfaces";

const CategoryInDB = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCategories(result.data);
          setIsLoading(false);
        } else {
          alert(result.message);
        }
      });
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Categorías</h5>
        </div>
        <div className="card-body">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <div className="row">
              {categories.map((category: Category) => (
                <CategoryCard category={category} key={category.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryInDB;
