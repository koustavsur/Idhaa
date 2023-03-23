import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./style.css";


const CustomCard = ({
  basket,
  product,
  addProduct,
  categoryName,
  updateProduct,
  RemoveItemFromBasket,
  isCartUpdating
}) => {
  return (
    <Card className="custom-card">
      <Link className="link" to={`/product-view/${basket ? product.product_id : product.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="260"
            className="card-image"
            image={product.image.url}
            title="Contemplative Reptile"
            style={{
              height: categoryName === "Jute" ? "440px" : "",
            }}
          />
          <CardContent className="content">
          <Typography
              className="title"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Typography variant="h3">View</Typography>
      </Link>
      {basket && (
        <CardActions>
          <Typography
            className="basket-item-price"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.price.formatted_with_symbol}
          </Typography>
        </CardActions>
      )}
      <CardActions className="actions-content">
        {!basket && (
          <>
            <Typography
              className="price"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.price.formatted_with_symbol}
            </Typography>
            {product.inventory.available === 0? 
            (<Typography className="price">Out of stock</Typography>):
             (<Button
              size="large"
              className="custom-button"
              onClick={() => {
                addProduct(product.id, 1);
              }}
            >
              <ShoppingCart /> Add to basket
            </Button>)}
          </>
        )}
        {basket && (
          <>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                RemoveItemFromBasket(product.id);
              }}
            >
              Remove
            </Button>
            <>
              <Button
                size="small"
                variant="contained"
                className="increase-product-quantity"
                onClick={() => {
                  updateProduct(product.id, product.quantity + 1);
                }}
              >
                +
              </Button>
              {isCartUpdating === true ? (<CircularProgress color="#3d251e" />) : (<Typography>&nbsp;{product.quantity}&nbsp;</Typography>)}
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => {
                  updateProduct(product.id, product.quantity - 1);
                }}
              >
                -
              </Button>
            </>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CustomCard;
