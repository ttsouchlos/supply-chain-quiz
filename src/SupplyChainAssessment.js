import React, { useState } from "react";

const questions = [
  {
    section: "Supply Chain Design",
    items: [
      "Our supply chain network is strategically aligned with business goals and supply chain design decisions include cross functional collaboration.",
      "We regularly conduct network optimization studies and have clear visibility to country of origin and point of use for our materials.",
      "Our inventory placement and policies are based on demand segmentation.",
      "Supply chain leadership establishes contract templates that include Importer of record, tariff responsibility, logistics terms and customs compliance liability.",
      "Digital twin or simulations are used to evaluate risk and cost trade-offs in supply chain design.",
      "The Harmonized Tariff Schedule for all goods is documented and well maintained and compliance is monitored within our supply base."
    ]
  },
  {
    section: "Supplier Relationship Management",
    items: [
      "We have a documented supplier segmentation strategy that incorporates spend levels, customer impact, sole source areas and supplier partnership.",
      "We conduct regular performance reviews with key suppliers.",
      "We have data driven performance measurement for our suppliers that is shared regularly.",
      "Our relationship with key suppliers extends to the executive level and we have good understanding of their business objectives and key financial metrics.",
      "We have documented account plans with suppliers that align with our strategic objectives and align with supplier goals.",
      "We have resources with clear responsibility for supplier development that are located in our supplier operating region."
    ]
  },
  {
    section: "Transparency and Visibility",
    items: [
      "We have visibility of our products and materials from point of purchase to our customers door.",
      "Supplier and logistics data are updated in real time.",
      "We can provide level 1 impact analysis to our customers related to global events within hours, and level 2 (suppliers' suppliers) within 24 hours.",
      "We use dashboards to monitor KPIs across the supply chain.",
      "Critical Supplier attributes, such as country of origin, certifications and contact points are self managed and audited for reliability.",
      "Data governance and quality controls support decision-making."
    ]
  },
  {
    section: "Supply Strategy",
    items: [
      "Our supply strategy is directly linked to our business plans in terms of forecasted growth and profitability at the product line level.",
      "We balance cost, risk, and resilience in make vs buy and sourcing decisions.",
      "Multiple sourcing and localization are part of our product development strategy and are reported metrics.",
      "Strategic Sourcing or Category Management teams own the strategic sourcing plans for critical categories and outline procurement policies that cover all categories.",
      "Procurement is integrated early in new product development and leads sourcing decisions.",
      "The supply strategy is regularly reviewed and adapted to market changes."
    ]
  },
  {
    section: "Agility and Flexibility",
    items: [
      "We resource operation teams that work to a documented timeline.  They are empowered to rapidly shift production or sourcing in response to disruptions.",
      'Scenario planning and "what if" analysis are documented as part of the product development process.',
      "Our supply chain has modularity and redundancy built in.",
      "Forecasting resources utilize tools and real time data to drive responsive planning.",
      "Our buffer capacity and inventory levels are integrated with sourcing decision changes.",
      "Operations, procurement and suppliers collaborate to optimize supply chain design."
    ]
  }
];

const guidanceText = {
  "Supply Chain Design": {
    low: "Organizations that lack an intentional supply chain design built with cross-functional buy-in face significant cost disadvantages. This challenge is becoming increasingly critical, as 52% of engineers now spend 6 or more hours on supply chain-related work per week, representing lost resources for innovation and product improvement.  Poor supply change design limits agility during market disruptions and increases vulnerability to tariff impacts and regulatory changes. These challenges can compound over time, making it increasingly difficult to compete on cost and service while exposing the business to supply chain disruptions. A cross-functional Supply Chain design review should highlight areas of misalignment.",
    high: "Congratulations on your strong results in this area!  Organizations with mature supply chain design achieve superior cost structures through optimized network configurations, reduced transportation expenses, and strategic inventory positioning. This foundation enables rapid response to market opportunities, efficient scaling during growth periods, and effective risk mitigation during disruptions.  Maintaining this maturity level requires continuous alignment with your evolving business strategy and market dynamics to preserve competitive advantage."
  },
  "Supplier Relationship Management": {
    low: "Your responses to questions on Supplier Relationship Management point to significant opportunities for improved return on investment through strategic partnership development and performance optimization. The potential impact is substantial, as companies with a clear supplier management approach save up to 30% on their procurement costs. Weak supplier relationship management creates vulnerability to supply disruptions, limits access to supplier innovation and capabilities, and results in suboptimal pricing and terms.   A cross-functional supplier segmentation workshop will help to highlight where your team should focus their efforts.",
    high: "Congratulations on having a strong Supplier Relationship Management capability in place!  Strong SRM maturity creates a foundation for innovation, scalability, and competitive advantage through strategic supplier partnerships and collaborative value creation. Mature supplier relationships provide access to cutting-edge technologies, collaborative innovation opportunities, and preferential support during market disruptions or capacity constraints. These partnerships enable faster product development cycles, improved quality outcomes, and cost advantages through joint optimization initiatives. An internal cross-functional review of the strategic supply base is critical to conduct annually, to make sure any performance or capability gaps are uncovered and addressed."
  },
  "Transparency and Visibility": {
    low: "Your feedback indicates a lack of visibility within your supply chain. This represents a critical gap, as improving supply chain visibility is the top priority for 55% of manufacturing-related businesses. Limited visibility creates reactive rather than proactive supply chain management, leading to higher costs, service failures, and customer dissatisfaction. Organizations cannot efficiently respond to disruptions, optimize inventory levels, or provide accurate customer communications without real-time data. Poor visibility also increases regulatory compliance risks and limits ability to optimize trade routes for tariff mitigation.",
    high: "Advanced visibility enables faster response times, better alignment with real-time business events, and superior customer service through accurate information and proactive communication. This capability serves as a competitive differentiator by enabling predictive analytics, automated responses, and continuous optimization of supply chain performance. Building on this foundation to drive continuous improvement and automation initiatives will further enhance operational excellence and customer satisfaction."
  },
  "Supply Strategy": {
    low: "Your responses in this area indicate a more transactional purchasing approach. This approach carries significant risks, as many companies report as much as 80% of invoices from maverick spending, outside of the preferred supply base, when procurement does not lead the sourcing strategy. Transactional procurement normally results in higher total costs, limited supplier innovation access, and vulnerability to market disruptions and trade policy changes. Organizations miss opportunities for strategic partnerships, collaborative cost reduction, and risk sharing. A transactional approach also limits negotiating power and prevents effective category management. Impact mitigation activities should be prioritized.",
    high: "You scored well in this area, congratulations!  Mature procurement and sourcing strategies optimize total cost of ownership, enhance business resilience, and create competitive advantages through strategic supplier partnerships and category expertise. This capability enables proactive market engagement, innovation access, and risk mitigation that directly supports business growth objectives.   You also gain access to supplier innovation, collaborative development opportunities, and preferential treatment that accelerates business growth.  Continue to refresh procurement strategies in response to evolving regional dynamics, regulatory changes, and business objectives to maintain your competitive advantage."
  },
  "Agility and Flexibility": {
    low: "Low scores in Agility and Flexibility highlight significant vulnerability to market dynamics. This concern is widespread, as 93% of survey respondents intend to make their supply chains far more flexible, agile, and resilient. Inflexible supply chains cannot adapt quickly to market changes, resulting in lost sales opportunities, service failures, and customer dissatisfaction during disruptions. Poor agility also increases inventory risks, limits ability to optimize capacity utilization, and creates vulnerability to competitive threats from more responsive organizations. Prioritize a scenario planning process and document action plans to reduce risk and improve response capabilities.",
    high: "Your responses reflect strong capability in this area, congratulations!  Agile supply chains provide competitive advantages through faster product launches, superior customer service during disruptions, and ability to capitalize on unexpected market opportunities.  Organizations can optimize inventory levels across demand variations, maintain service levels during supply constraints, and adapt quickly to changing customer requirements.  Take advantage of this capability through cross-functional business reviews that include your sales and marketing teams."
  }
};

export default function SupplyChainAssessment() {
  const [responses, setResponses] = useState(Array(30).fill(3));
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(-1);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", company: "", city: "", state: "", country: "" });
  const [error, setError] = useState("");

  const isUserInfoComplete = Object.values(userInfo).every(val => val.trim() !== "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (error) setError("");
  };

  const handleSliderChange = (index, value) => {
    const updated = [...responses];
    updated[index] = Number(value);
    setResponses(updated);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    await fetch("https://formsubmit.co/ajax/tim@SRxconsultingllc.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userInfo,
        responses: responses.join(", ")
      })
    });
  };

  const totalScore = responses.reduce((a, b) => a + b, 0);
  let maturity = "";
  if (totalScore <= 60) maturity = "High Maturity Procurement";
  else if (totalScore <= 90) maturity = "Mid-Level Maturity Procurement";
  else if (totalScore <= 120) maturity = "Low Maturity Procurement";
  else maturity = "Basic Purchasing Operations";

  let overallTachometer = new URL("./overall-tachometer4.png", import.meta.url).href;
  if (totalScore <= 60) overallTachometer = new URL("./overall-tachometer1.png", import.meta.url).href;
  else if (totalScore <= 90) overallTachometer = new URL("./overall-tachometer2.png", import.meta.url).href;
  else if (totalScore <= 120) overallTachometer = new URL("./overall-tachometer3.png", import.meta.url).href;

  const sectionScores = questions.map((section, index) => {
    const start = index * 6;
    const end = start + 6;
    const score = responses.slice(start, end).reduce((a, b) => a + b, 0);
    return {
      section: section.section,
      score,
      feedback: score > 12 ? guidanceText[section.section].low : guidanceText[section.section].high,
      sliderPosition: (score / 6).toFixed(1)
    };
  });

  if (submitted) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h2>Assessment Results</h2>
        <p><strong>Total Score:</strong> {totalScore}</p>
        <p><strong>Overall Maturity Level:</strong> {maturity}</p>
        <img src={overallTachometer} alt="Overall Score Tachometer" style={{ width: "100%", maxWidth: 500 }} />
        <hr />
        <h3>Section Feedback:</h3>
        {sectionScores.map((s, idx) => (
          <div key={idx} style={{ marginBottom: 30 }}>
            <h4>{s.section}</h4>
            <p><strong>Score:</strong> {s.score} / 30</p>
            <img src={new URL("./maturity-slider.png", import.meta.url).href} alt="Maturity Slider" style={{ width: "100%", maxWidth: 400 }} />
            <p>{s.feedback}</p>
          </div>
        ))}
        <div style={{ marginTop: 40, fontSize: "1.2em" }}>
          <p>
            I hope the <strong>SRx Consulting Supply Chain assessment</strong> provided valuable insights into your current operations. This tool is designed to help you reflect on key performance drivers while identifying specific opportunities that could significantly impact your bottom line.
          </p>
          <p>
            If any of the findings resonated with you or if you'd like to explore potential solutions in greater detail, I'd welcome the opportunity to discuss your results further. Please feel free to schedule a follow-up conversation at your convenience.
          </p>
          <p>
            🔗 <a href="https://www.SRxConsultingllc.com" target="_blank" rel="noopener noreferrer">Visit my website</a><br />
            📅 <a href="https://tidycal.com/ttsouchlos/30-minute-meeting" target="_blank" rel="noopener noreferrer">Schedule a 30-minute meeting</a>
          </p>
        </div>
      </div>
    );
  }

  if (currentSection === -1) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>Supply Chain Maturity Assessment</h1>
        {Object.keys(userInfo).map((field, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)} <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleInputChange}
              value={userInfo[field]}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={() => {
            if (isUserInfoComplete) {
              setCurrentSection(0);
            } else {
              setError("Please complete all required information");
            }
          }}
          style={{ backgroundColor: isUserInfoComplete ? "#007bff" : "#cccccc", color: "white", padding: "10px 20px", borderRadius: "20px", border: "none", cursor: isUserInfoComplete ? "pointer" : "not-allowed" }}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <p><strong>Instructions:</strong> For each statement below, please move the slider to indicate your level of agreement:</p>
        <ul>
          <li>1 = Strongly Agree</li>
          <li>2 = Somewhat Agree</li>
          <li>3 = Neutral</li>
          <li>4 = Somewhat Disagree</li>
          <li>5 = Strongly Disagree</li>
        </ul>
      </div>
      <h2>{questions[currentSection].section}</h2>
      {questions[currentSection].items.map((item, iIdx) => (
        <div key={iIdx} style={{ marginBottom: 20 }}>
          <label>{item}</label><br />
          <input
            type="range"
            min="1"
            max="5"
            value={responses[currentSection * 6 + iIdx]}
            onChange={(e) => handleSliderChange(currentSection * 6 + iIdx, e.target.value)}
          />
          <span> {responses[currentSection * 6 + iIdx]}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        {currentSection > 0 && (
          <button
            onClick={() => setCurrentSection(currentSection - 1)}
            style={{ backgroundColor: "#6c757d", color: "white", padding: "10px 20px", borderRadius: "20px", border: "none", cursor: "pointer" }}
          >
            Back
          </button>
        )}
        {currentSection < questions.length - 1 ? (
          <button
            onClick={() => setCurrentSection(currentSection + 1)}
            style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "20px", border: "none", cursor: "pointer" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "20px", border: "none", cursor: "pointer" }}
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
}
