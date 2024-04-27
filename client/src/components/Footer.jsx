import {
  FaFacebookSquare,
  FaInstagram,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  return (
    <>
      <footer className="footer section bd-container">
        <div className="footer-container bd-grid">
          <div class="footer-content">
            <h3 class="footer-title">Services</h3>
            <ul>
              <li>
                <a href="#" class="footer-link">
                  Home Delivery
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  Menu & Pricing
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  Online Ordering
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  Catering Services
                </a>
              </li>
            </ul>
          </div>

          <div class="footer-content">
            <h3 class="footer-title">Information</h3>
            <ul>
              <li>
                <a href="#" class="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-content">
            <a href="#" className="footer-logo">
              SIAM FOOD
            </a>
            {/* Icon */}
            <div>
              <a href="#" className="footer-social">
                <FaFacebookSquare />
              </a>
              <a href="#" className="footer-social">
                <FaInstagram />
              </a>
              <a href="#" className="footer-social">
                <FaTiktok />
              </a>
              <a href="#" className="footer-social">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy">
          &#169; 2024 Supachai R. All right reserved
          <p className="footer-copy-logo">
            <a href="https://github.com/thesun7385/Siam-food-delivery">
              <FaSquareGithub />
            </a>
            <a href="https://www.linkedin.com/in/supachai-ruknuy-2487b5198/">
              <FaLinkedin />
            </a>
          </p>
        </p>
      </footer>
    </>
  );
}
