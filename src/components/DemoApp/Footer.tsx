import ReactLogo from "../../assets/react.svg";
import ViteLogo from "../../assets/vite.svg";

const Footer = () => (
  <footer className="bg-gray-800 p-8 text-center text-white">
    <h4 className="m-4 text-xl font-bold">Made with:</h4>
    <div className="m-8 flex justify-center space-x-4">
      <img src={ReactLogo} alt="React Logo" className="inline h-32" />
      <img src={ViteLogo} alt="Vite Logo" className="inline h-32" />
    </div>
  </footer>
);

export default Footer;
