const Products = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Todos los productos</h1>
      </div>
      <div class="container my-3">
				<div class="row">
					<div class="col-12">
						<div class="d-flex justify-content-between align-items-center">
							<h2 class="products-title">Administrar Productos</h2>
						</div>
						<hr>
					</div>
				</div>

				<div class="col-12">

					<div class="card shadow-lg">
						<div class="card-header bg-warning">
							<div class="d-flex flex-column flex-md-row justify-content-between  gap-2">
								<div class="d-flex flex-column flex-md-row gap-2">
									<form class="d-flex align-items-center" role="search">
										<input class="form-control me-2" name="search" type="search" placeholder="Buscar..."
											aria-label="Search">
										<button class="btn btn-outline-dark" type="submit"><i
												class="fa fa-search"></i></button>
									</form>
									<form class="d-flex" role="search">
										<select class="form-select me-2" name="category">
											<option value="" <%= !filterCategory && 'selected' %>>Todos los productos</option>
											<% categories.forEach(category => { %>
											 <option value="<%= category.id %>" <%= filterCategory == category.id && 'selected' %>><%= category.name %></option>
											<% }) %>
										</select>
										<button class="btn btn-outline-dark" type="submit"><i
												class="fa fa-filter"></i></button>
									</form>
								</div>
							
								<a class="btn btn-outline-dark " href="/products/add"><i class="fa fa-plus"></i> Nuevo</a>
							</div>
						
						
						</div>
						<div class="card-body table-responsive">
							<% if (products.length) { %>
								<table class="table">
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
										<% products.forEach(({id, name, price, discount, description, image, brand, subcategory, category})=> { %>
											<tr>
												<th scope="row">
													<%= id %>
												</th>
												<td>
													<%= name %>
												</td>
												<td>
													<%= price %>
												</td>
												<td>
													<%= discount %>
												</td>
												<td>
													<%= brand.name%>
												</td>
												<td>
													<%= category.name%>
												</td>
												<td>
													<%= subcategory.name%>
												</td>
												<td>
													<div class="d-flex gap-2">
														<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal"
															data-bs-target="#showDetail<%= id %>">
															<i class="fas fa-search-plus"></i>													
														</button>
														<%- include('../partials/modalShowProduct',{ id, name,price,discount,description, image }) %>
														<a href="/products/edit/<%= id %>" class="btn btn-sm btn-success"><i
																class="fas fa-pencil-alt"></i></a>
	
														<button type="button" class="btn btn-sm btn-danger"
															data-bs-toggle="modal" data-bs-target="#modalDelete<%= id %>">
															<i class="fas fa-trash-alt"></i>
														</button>
														<%- include('../partials/modalDelete',{ id, name, }) %>
	
													</div>
	
												</td>
											</tr>
											<% }) %>
	
	
									</tbody>
								
								</table>
								<tfoot>
									<%- include('../partials/pager', {
										path : '/admin/products',
										filterCategory,
										currentPage,
										totalPages
									}) %>
								</tfoot>
							<% } else { %>
								<p class="alert alert-warning">No hay resultados</p>
							<% } %>
						
						</div>
					</div>

				</div>

			</div>
      
    </div>
  );
};

export default Products;
