import { useEffect, useState } from "react";
import { Product } from "../interfaces";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
          setIsLoading(false);
        } else {
          alert(result.message);
        }
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Todos los productos</h1>
      </div>
      <div className="container my-3">
        <div className="col-12">
          <div className="card shadow-lg">
            <div className="card-header bg-warning">
              <div className="d-flex flex-column flex-md-row justify-content-between  gap-2">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <form className="d-flex align-items-center" role="search">
                    <input
                      className="form-control me-2"
                      name="search"
                      type="search"
                      placeholder="Buscar..."
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-dark" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                  <form className="d-flex" role="search">
                    <select
                      className="form-select me-2"
                      name="category"
                    ></select>
                    <button className="btn btn-outline-dark" type="submit">
                      <i className="fa fa-filter"></i>
                    </button>
                  </form>
                </div>

                <a className="btn btn-outline-dark " href="/products/add">
                  <i className="fa fa-plus"></i> Nuevo
                </a>
              </div>
            </div>
            <div className="card-body table-responsive">
              {products.length ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Descuento</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Categoría</th>
                      <th scope="col">Subcategoría</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <p>Cargando...</p>
                    ) : (
                      products.map(
                        ({
                          id,
                          name,
                          price,
                          discount,
                          brand,
                          category,
                          subcategory,
                        }) => (
                          <tr>
                            <th scope="row">{id}</th>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>{discount}</td>
                            <td>{brand.name}</td>
                            <td>{category.name}</td>
                            <td>{subcategory.name}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showDetail<%= id %>"
                                >
                                  <i className="fas fa-search-plus"></i>
                                </button>
                                <a
                                  href="/products/edit/<%= id %>"
                                  className="btn btn-sm btn-success"
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </a>

                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDelete<%= id %>"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="alert alert-warning">No hay resultados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
