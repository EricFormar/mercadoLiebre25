import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCallback, useMemo, useState } from "react";
import { Brand, Category, Section } from "../../interfaces";

interface IProps {
  handleClose: () => void;
  show: boolean;
}

const FormProduct = ({ handleClose, show }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }, []);

  const getSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sections`);
      const result = await response.json();
      if (result.success) {
        setSections(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }, []);

  const getBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/brands`);
      const result = await response.json();
      if (result.success) {
        setBrands(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }, []);

  const handleFocus = useMemo(
    () => async () => {
      if (!categories.length && !isLoading) {
        await getCategories();
      }

      if (!sections.length && !isLoading) {
        await getSections();
      }

      if(!brands.length &&!isLoading){
        await getBrands();
      }
    },
    [categories, isLoading, getCategories, sections, getSections, getBrands, brands]
  );

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="bg-warning" closeButton>
        <Modal.Title>Formulario de creación de productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <Form.Group className="col-12 col-lg-6 mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Control type="text" placeholder="Nombre del producto" />
          </Form.Group>

          <Form.Group className="col-12 col-md-6 col-lg-3 mb-3">
            <Form.Label>Precio del producto:</Form.Label>
            <Form.Control type="number" name="price" />
          </Form.Group>

          <Form.Group className="col-12 col-md-6 col-lg-3 mb-3">
            <Form.Label>Descuento:</Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Sección:</Form.Label>
            <Form.Select name="section" onFocus={handleFocus}>
              <option value="" hidden selected>
                Elegí la sección
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Marca:</Form.Label>
            <Form.Select onFocus={handleFocus}>
              <option hidden selected>
                Elegí la marca
              </option>
              {brands.map((brand) => 
                <option key={brand.id} value={brand.id}>    
                  {brand.name}
                  </option>
                )}
              <option>marca</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Categoría:</Form.Label>
            <Form.Select onFocus={handleFocus}>
              <option selected hidden>
                Elegí la categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Subcategoría:</Form.Label>
            <Form.Select>
              <option value="" hidden selected>
                Elegí la subcategoría
              </option>
              <option>subcategoría</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              rows={7}
              placeholder="Descripción del producto"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="col-12 col-md-6 mb-3">
            <Form.Label>Imagen:</Form.Label>
            <div
              className="border w-100 rounded d-flex justify-content-center p-2 "
              style={{ height: "185px" }}
              id="box-image-preview"
            >
              <img
                id="image-preview"
                src=""
                alt=""
                height="100%"
                className="img-fluid"
              />
            </div>
            <span className="text-danger" id="image-error"></span>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Agregar imagen
        </Button>
        <Button variant="dark" onClick={handleClose}>
          Guardar producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default FormProduct;
