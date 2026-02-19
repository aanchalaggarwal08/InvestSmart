
import "./Home.css";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import MarketChart from "../components/MarketChart"; // optional dashboard teaser

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="home-title">Invest Smart, Grow Smarter 💹</h1>
        <p className="home-subtitle">
          Analyze stock performance, compare companies, and make informed financial decisions
          — all in one place.
        </p>
        <Link to="/compare">
          <button className="home-cta">Start Comparing →</button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose InvestSmart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Compare Stocks</h3>
            <p>Quickly compare multiple stocks and see which ones perform better.</p>
          </div>
          <div className="feature-card">
            <h3>Market Trends</h3>
            <p>Stay updated with the latest market trends and make smarter decisions.</p>
          </div>
          <div className="feature-card">
            <h3>Resources</h3>
            <p>Access guides, tips, and tools to enhance your investment knowledge.</p>
          </div>
        </div>
      </section>

    <section className="stats-section">
        <h2 className="features-title">Quick Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Stocks Tracked</h3>
            <p>120+</p>
          </div>
          <div className="stat-card">
            <h3>Portfolio Growth</h3>
            <p>Avg. 12% 🚀</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>5000+</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}