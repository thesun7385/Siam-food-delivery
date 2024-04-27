import foodIcon from "../assets/diet.png";
import carteringIcon from "../assets/catering.png";
import deliveryIcon from "../assets/delivery-truck.png";

export default function Services() {
  return (
    <>
      <section className="services section bd-container" id="services">
        <h2 className="section-title">Services</h2>
        <div className="services-container bd-grid">
          <div className="services-content">
            <img className="services-img" src={foodIcon} alt="Food Icon" />
            <h3 class="services-title">Excellent food</h3>
            <p class="services-description">
              We offer our clients excellent quality services for many years,
              with the best and delicious food in the city.
            </p>
          </div>
          <div className="services-content">
            <img className="services-img" src={carteringIcon} alt="Food Icon" />
            <h3 class="services-title">Catering food</h3>
            <p class="services-description">
              Elevate your events with our impeccable catering service, where
              every dish is a masterpiece.
            </p>
          </div>
          <div className="services-content">
            <img className="services-img" src={deliveryIcon} alt="Food Icon" />
            <h3 class="services-title">Free Delivery</h3>
            <p class="services-description">
              Enjoy the convenience of our free delivery service, bringing the
              delectable flavors of Excellent Food right to your door.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
