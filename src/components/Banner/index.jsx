import { Button,Typography /*Container, Grid*/ } from "@material-ui/core";
//import logo from "./Ban.jpeg";
import "./style.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="overlay">
        <Typography className="title" variant="h1">
            <div>Welcome</div>
            <div>to</div>
            <div>IDHAA - a boho collection</div>
        </Typography>
        <Button className="shopping-button" href="#products">
            Shop With Us
        </Button>
      </div>
    </div>
  );
};

export default Banner;