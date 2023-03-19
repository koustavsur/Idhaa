import "./style.css";
import { Facebook, Instagram } from "@material-ui/icons";

const Footer = () => {
  const date = new Date();
  const fullYear = date.getFullYear();
  return (
    <footer className="footer">
      <div className="details">
        <div className="left">
          <div className="follow">Follow us on</div>
          <div className="social">
            <a href="https://www.facebook.com/IDHAA-_a-boho-collection-100908242898853/" target={"_blank"} rel="noreferrer noopener"><Facebook fontSize="large"/></a>
            <a href="https://www.instagram.com/idhaa_abohocollection/" target={"_blank"} rel="noreferrer noopener"><Instagram fontSize="large"/></a>
          </div>
        </div>
        <div className="right">
          <p>For custom/corporate orders contact us on <strong>idhaa_abohocollection@gmail.com</strong></p>
        </div>
      </div>
      <div  className="copyright">
        <p>All &copy; copy rights are reserved to Idhaa - a boho collection {fullYear}</p>
      </div>
    </footer>
  );
};

export default Footer;