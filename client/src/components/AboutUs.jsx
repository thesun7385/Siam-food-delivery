import aboutImg from "../assets/about.jpg";

export default function AboutUs() {
  return (
    <>
      <section className="about section bd-container" id="about">
        <div className="about-container bd-grid">
          <div className="about-data">
            <span>About us</span>
            <h2 className="section-title about-initial">
              We cook the best <br />
              tasty food
            </h2>
            <p className="about-description">
              We are a family-owned restaurant that has been serving authentic
              Thai cuisine for over 20 years.
            </p>
            <a href="#" className="btn-about">
              Explore history
            </a>
          </div>
          <img src={aboutImg} alt="" className="about-img" />
        </div>
      </section>
    </>
  );
}
