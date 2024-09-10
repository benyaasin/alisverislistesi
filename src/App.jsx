/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Form, Button, Table } from "react-bootstrap";
import { nanoid } from "nanoid";
import styled from "styled-components";
import JSConfetti from "js-confetti";

const markets = ["A101", "Bim", "Migros", "Şok", "TeknoSA", "Vatan "];
const categories = [
  "Elektronik",
  "Ev Gereçleri",
  "Fırın",
  "Gıda",
  "Giyim",
  "Kırtasiye",
  "Oyuncak",
  "Manav",
  "Temizlik Ürünler",
];

const jsConfetti = new JSConfetti();

const StyledTable = styled.td`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productMarket, setProductMarket] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [filteredMarket, setFilteredMarket] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [deletedItem, setDeletedItem] = useState(false);

  const urunEkle = () => {
    if (!productName || !productMarket || !productCategory) {
      alert("Lütfen Boş Alanları Doldurunuz");
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: productName,
      market: productMarket,
      category: productCategory,
      isBought: false,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductMarket("");
    setProductCategory("");
    setDeletedItem(false);
  };

  const handleBought = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );

    setProducts(updatedProducts);

    if (updatedProducts.every((product) => product.isBought) && !deletedItem) {
      alert("Alışveriş Tamamlandı");
      jsConfetti.addConfetti({
        confettiColors: [
          "#ff0a",
          "#ff477e",
          "#ff54",
          "#ffe",
          "#ff7096",
          "#ff85a1",
          "#b1bd",
          "#f7cad0",
          "#b4f2e1",
          "#ff7096",
        ],
        confettiShapes: ["square", "star"],
        confettiNumber: 444,
        confettiRadius: 6,
      });
    }
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());
    const marketMatch =
      product.market === filteredMarket || filteredMarket === "";
    const categoryMatch =
      product.category === filteredCategory || filteredCategory === "";
    return nameMatch && marketMatch && categoryMatch;
  });

  return (
    <>
      <div className="container d-flex gap-3 justify-content-center">
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Ürün ismi:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Listeye eklenecek ürün..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productMarket">
            <Form.Label>Mağaza:</Form.Label>
            <Form.Control
              as="select"
              value={productMarket}
              onChange={(e) => setProductMarket(e.target.value)}
            >
              <option>Mağaza Seç..</option>
              {markets.map((markets, index) => (
                <option key={index} value={markets}>
                  {markets}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productCategory">
            <Form.Label>Kategori:</Form.Label>
            <Form.Control
              as="select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Kategori Seç..</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="mt-3" onClick={urunEkle}>
            Ürün Ekle
          </Button>
        </Form>

        <Form>
          <Form.Group controlId="filteredName">
            <Form.Label>Ürüne göre filtrele</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ürün ismine göre ara..."
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="filteredMarket">
            <Form.Label>Mağazaya göre filtrele</Form.Label>
            <Form.Control
              as="select"
              value={filteredMarket}
              onChange={(e) => setFilteredMarket(e.target.value)}
            >
              <option value="">Hepsi</option>
              {markets.map((markets, index) => (
                <option key={index} value={markets}>
                  {markets}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filteredCategory">
            <Form.Label>Kategoriye göre filtrele</Form.Label>
            <Form.Control
              as="select"
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
            >
              <option value="">Hepsi</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="container mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ürün</th>
              <th>Market</th>
              <th>Kategori</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <StyledTable isBought={product.isBought}>
                  {product.id}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.name}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.market}
                </StyledTable>
                <StyledTable isBought={product.isBought}>
                  {product.category}
                </StyledTable>
                <td>
                  <Button onClick={() => handleBought(product.id)}>
                    {product.isBought ? "✅" : "❌"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Sil🧽
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
