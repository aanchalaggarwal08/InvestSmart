import "./resources.css";
export default function Resources() {
  return (
    <div className="resources-page">
      {/* Header Section */}
      <header className="resources-header">
        <h1>Resources</h1>
        <p>
          Learn. Analyze. Grow. Access expert knowledge and smart tools to become
          a confident investor.
        </p>
      </header>

      {/* Categories Section */}
      <section className="resources-categories">
        <div className="resource-card">
          <h3>📘 Stock Market Basics</h3>
          <p>Understand how the stock market works and start investing smartly.</p>
          <a href="/basics" className="resource-btn">Explore Basics</a>
        </div>

        <div className="resource-card">
          <h3>📊 Reports & Insights</h3>
          <p>Access insights, trends, and updates based on market performance.</p>
          <a href="/insights" className="resource-btn">View Insights</a>
        </div>

        <div className="resource-card">
          <h3>🎯 Strategy Guides</h3>
          <p>Pick proven investment strategies to boost your returns.</p>
          <a href="/strategies" className="resource-btn">Read Guides</a>
        </div>

        <div className="resource-card">
          <h3>❓ FAQs</h3>
          <p>Find answers to commonly asked questions by new investors.</p>
          <a href="/faqs" className="resource-btn">Browse FAQs</a>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="tutorials-section">
        <h2>🎥 Video Tutorials</h2>
        <p>Watch beginner-friendly tutorials to improve your trading knowledge.</p>
        <div className="tutorial-box">
          <p>Coming Soon 🚀</p>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <h2>📈 Investor Tools</h2>
        <p>Enhance decision-making with our stock comparison tools.</p>
        <ul>
          <li>Real-time stock comparison</li>
          <li>Returns calculator</li>
          <li>Investment suggestion engine</li>
        </ul>
      </section>
    </div>
  );
};
