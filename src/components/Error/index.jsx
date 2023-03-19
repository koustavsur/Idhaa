import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../Basket/style.css";

const NotFound = () => {
  return (
    <div className="basket-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
                Oops !! Landed on the wrong page. Basket is empty press Shopping for adding new products.
            </Typography>
            <Button className="shopping-button" component={Link} to="/">
              Shopping
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NotFound;