import { useState, useEffect, useRef } from "react";
import {
  Step,
  Paper,
  Stepper,
  StepLabel,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { renderRelatedComponent } from "./helpers";
import "./style.css";

const steps = ["order-address", "order-details"];

const convertObjectToArray = (countries) =>
  Object.entries(countries || {}).map(([code, name]) => ({ code, name }));

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Checkout = ({ basketData, orderInfo, orderError, handleCheckout }) => {
  const [user, setUser] = useState({
    city: "",
    email: "",
    phone: "",
    address: "",
    postCode: "",
    lastName: "",
    firstName: "",
    shippingOption: {},
    shippingOptions: [],
    shippingCountry: {},
    shippingCountries: [],
    shippingSubdivision: {},
    shippingSubdivisions: [],
  });
  const [bookingStep, setBookingStep] = useState("order-address");
  const [checkoutData, setCheckoutData] = useState("");

  const previousShippingCountry = usePreviousState(user.shippingCountry);

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingStep("order-details");
  };

  const handleNextStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleBackStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = /^[0-9\b]+$/;
    if(name === 'phone') {
      if (value === "" || regex.test(value)) {
        setUser({ ...user, [name]: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSelectChange = (e, state) => {
    const { name, value } = e.target;
    if (state === "shippingOptions") {
      setUser({
        ...user,
        [name]: {
          id: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: {
          name: user[state].find((country) => country.code === value).name,
          code: value,
        },
      });
    }
  };

  useEffect(() => {
    if (basketData.id) {
      const generateToken = async () => {
        try {
          const response = await commerce.checkout.generateToken(
            basketData.id,
            {
              type: "cart",
            }
          );
          setCheckoutData(response);
        } catch (error) {
          console.error("Checkout error: ", error);
        }
      };
      generateToken();
    }
  }, [basketData, history]);

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutData.id
      );
      const FormattedCountries = convertObjectToArray(countries);
      setUser({
        ...user,
        shippingCountries: FormattedCountries,
        shippingCountry: FormattedCountries[FormattedCountries.length - 1],
      });
    };
    if (!user.shippingCountries.length && checkoutData.id) {
      fetchShippingCountries();
    }
  }, [user, checkoutData]);

  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      const shippingSubdivisions = convertObjectToArray(subdivisions);
      setUser({
        ...user,
        shippingSubdivisions,
        shippingSubdivision: shippingSubdivisions[0],
      });
    };

    if (
      (user.shippingCountry.code && !user.shippingSubdivisions.length) ||
      (previousShippingCountry &&
        previousShippingCountry.code !== user.shippingCountry.code)
    )
      fetchSubdivisions(user.shippingCountry.code);
  }, [user, previousShippingCountry]);

  if (
    !user.shippingSubdivisions.length ||
    !user.shippingCountries.length
  ) {
    return (
      <div className="checkout">
        <Container>
          <Paper className="paper" elevation={3}>
            <div className="products-spinner">
              <CircularProgress />
            </div>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Container>
        <Paper className="paper" elevation={3}>
          <Typography align="center" variant="h5" gutterBottom>
            Checkout
          </Typography>
          {bookingStep !== "confirmation" && (
            <Stepper
              className="stepper"
              activeStep={steps.indexOf(bookingStep)}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {renderRelatedComponent({
            user,
            orderInfo,
            orderError,
            bookingStep,
            handleChange,
            handleSubmit,
            checkoutData,
            handleBackStep,
            handleNextStep,
            handleCheckout,
            handleSelectChange,
          })}
        </Paper>
      </Container>
    </div>
  );
};

export default Checkout;