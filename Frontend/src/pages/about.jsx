import "./about.css";
import aboutFinance from "../assets/about-finance.jpg"
export default function About() {
  return (
   <div className="about-page">

        <h1>Invest Smart — Compare Better. Invest Smarter.</h1>

      {/* Who We Are */}
      <section className="section fade-in">
        <h2>Who We Are</h2>
        <p className="content">
          A team of innovators building a platform that simplifies stock
          comparison and helps investors make confident, data-driven decisions
          in real time.
        </p>
      </section>

      {/* Mission */}
      <section className="section two-col fade-in">
        <div className="text-box">
          <h2>Our Mission</h2>
          <p>
            We empower retail investors with transparency, real-time data
            visibility and simplified metrics — helping them build financial
            confidence and long-term wealth.
          </p>
        </div>
        <img
          src= {aboutFinance}
          alt="Finance Mission"
          className="img-mission"
        />
      </section>

      {/* Features */}
      <section className="section fade-in">
        <h2>What We Do</h2>
        <div className="features">
          <div className="feature-box">
            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170452.png" alt="" />
            <h3>Live Market Data</h3>
            <p>Track latest prices & financial performance.</p>
          </div>

          <div className="feature-box">
            <img src="https://cdn-icons-png.flaticon.com/512/846/846449.png" alt="" />
            <h3>Stock Comparison</h3>
            <p>Instantly compare two or more stocks.</p>
          </div>

          <div className="feature-box">
            <img src="https://cdn-icons-png.flaticon.com/512/842/842198.png" alt="" />
            <h3>Smart Metrics</h3>
            <p>Insights like P/E, EPS, growth trends & more.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section fade-in">
        <h2>Our Story</h2>
        <p className="content">
          Started as a hackathon innovation — now growing into a powerful
          platform for the next generation of investors.
        </p>
      </section>

      {/* CTA */}
      <section className="cta fade-in">
        <h3>Join the Smarter Investing Revolution</h3>
        <p>Start comparing stocks and unlock your financial potential.</p>
        <button>Get Started</button>
      </section>

    </div>
  );
};



    