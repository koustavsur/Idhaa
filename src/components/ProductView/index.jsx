import { Button, Container, Typography, Grid } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { commerce } from "../../lib/commerce";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = ({ addProduct }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    const { name, price, assets, image, quantity, description, inventory: { available }} = response;
    setProduct({
      id,
      name,
      assets,
      quantity,
      description,
      src: image.url,
      price: price.formatted_with_code,
      available
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  const handleQuantity = (param) => {
    if (param === "decrease" && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
    if (param === "increase" && quantity < product.available) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const updateProduct = src => {
    setProduct({
      ...product,
      src,
    });
  };

  return (
    <Container className="product-view">
    (<Grid container spacing={4}>
      <Grid item xs={12} md={6} className="image-wrapper">
        <img
          onLoad={() => {
            setLoading(false);
          }}
          src={product.src}
          alt={product.name}
        />
        {product.assets?.length ? (
            <div className="asset-title" variant="h4">
              Click to open expanded view
            </div>
          ) : null}
          <div className="asset-wrapper">
            {product.assets?.length
              ? product.assets.map((asset) => (
                  <img
                    key={asset.id}
                    src={asset.url}
                    alt={product.name}
                    onClick={() =>
                      updateProduct(asset.url)
                    }
                  />
                ))
              : null}
          </div>
      </Grid>
      <Grid item xs={12} md={4} className="text">
        <Typography variant="h4">{product.name}</Typography>
        <Typography
          dangerouslySetInnerHTML={createMarkup(product.description)}
        />
        <Typography variant="h3">Price: {product.price}</Typography>
        { product.available === 0 ? (<Typography variant="h3">Out of Stock</Typography>) :
        (<Grid container spacing={4}>
          <Grid item xs={12}>
            <Button
              size="small"
              variant="contained"
              className="increase-product-quantity"
              onClick={() => {
                handleQuantity("increase");
              }}
            >
              +
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className="quantity" variant="h3">
              Quantity: {quantity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                handleQuantity("decrease");
              }}
            >
              -
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              className="custom-button"
              onClick={() => {
                addProduct(product.id, quantity, product.available);
              }}
            >
              <ShoppingCart /> Add to basket
            </Button>
          </Grid>
        </Grid>)
        }
      </Grid>
    </Grid>
    {loading && <Spinner />}
  </Container>

  );
};

export default ProductView;