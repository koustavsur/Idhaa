import {
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
  } from "@material-ui/core";
  import { ShoppingCart } from "@material-ui/icons";
  import { Link, useLocation } from "react-router-dom";
  import Idhaa from './Logo_brown.png'
  import { CircularProgress } from "@material-ui/core";
  
  import "./style.css";
  
  const NavBar = ({ basketItems, totalCost, isCartAdded }) => {
    const location = useLocation();
  
    return (
      <>
        <AppBar position="fixed" className="custom-navbar">
          <Container>
            <Toolbar>
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className="custom-title"
                color="inherit"
              >
                <img
                  src={Idhaa}
                  alt="Idhaa logo"
                  height="25px"
                  className="logo"
                />
              </Typography>
              {location.pathname === "/basket" ? (
                <div className="basket-wrapper">
                  <h2>
                    Total cost: <strong>{totalCost}</strong>
                  </h2>
                </div>
              ) :  (
                <div className="basket-wrapper">
                  {isCartAdded === true ? (<CircularProgress color="#3d251e"/>) :
                  (<IconButton
                    component={Link}
                    to="/basket"
                    aria-label="Show basket contents"
                    color="inherit"
                  >
                    <Badge badgeContent={basketItems} color="secondary">
                      <ShoppingCart className="custom-basket" />
                    </Badge>
                  </IconButton> )}
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  };
  
  export default NavBar;