import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Confirmation = ({ orderInfo, orderError }) => {
  
  if (orderError) {
    console.log(`OrderError: ${orderError}`);
    return (
      <div className="confirmation">
        <Typography variant="h5">Something went wrong!!!! Please try again later or contact us on idhaa_abohocollection@gmail.com</Typography>
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </div>
    );
  }
  return (
    <div className="confirmation">
      <Typography variant="h5">
        Thank you {orderInfo.customer.firstname} {orderInfo.customer.lastname}{" "}
        for your purchase!
      </Typography>
      <Button component={Link} variant="contained" type="button" to="/">
        Continue shopping
      </Button>
    </div>
  );
};

export default Confirmation;
