import React, { useState } from "react";

const overallTachometer = new URL("./overall-tachometer.png", import.meta.url).href;
const maturitySlider = new URL("./maturity-slider.png", import.meta.url).href;

console.log("overallTachometer:", overallTachometer);
console.log("maturitySlider:", maturitySlider);

const questions = [
  {
    section: "Supply Chain Design",
    items: [
      "Our supply chain network is strategically aligned with business goals.",
      "We conduct regular network optimization studies.",
      "Inventory policies are based on demand segmentation.",
      "Leadership defines clear logistics and compliance terms.",
      "We use digital twins to evaluate trade-offs.",
      "Tariff schedules are well documented and monitored."
    ]
  },
  {
    section: "Supplier Relationship Management",
    items: [
      "We have a formal supplier segmentation strategy.",
      "We conduct performance reviews with key suppliers.",
      "Performance is measured and shared regularly.",
      "We have executive-level supplier relationships.",
      "Supplier account plans align with strategy.",
      "We have supplier development staff in-region."
    ]
  },
  {
    section: "Transparency and Visibility",
    items: [
      "We have end-to-end supply chain visibility.",
      "Data is updated in real time.",
      "We perform rapid impact analyses on global events.",
      "We use KPI dashboards.",
      "Critical supplier attributes are audited.",
      "Data governance supports decisions."
    ]
  },
  {
    section: "Supply Strategy",
    items: [
      "Supply strategy aligns with business growth.",
      "We balance cost, risk, and resilience.",
      "Localization and multisourcing are tracked.",
      "Strategic sourcing teams manage plans.",
      "Procurement leads early sourcing.",
      "Strategy is regularly reviewed."
    ]
  },
  {
    section: "Agility and Flexibility",
    items: [
      "Teams are empowered to shift rapidly.",
      "Scenario planning is documented.",
      "Modularity and redundancy are built in.",
      "Forecasting is responsive and data-driven.",
      "Buffer capacity is planning-aligned.",
      "Cross-functional collaboration is optimized."
    ]
  }
];

const guidanceText = {
  "Supply Chain Design": {
    low: "Supply Chain Design feedback highlights a need for a cross functional supply chain design review. There is high probability for significant cost and service improvement opportunities.",
    high: "High maturity in Supply Chain Design indicates a strong foundation for cost efficiency and competitive agility. Ensure this is continuously linked with business strategy."
  },
  "Supplier Relationship Management": {
    low: "Supplier Relationship Management (SRM) maturity feedback points to opportunity for improved ROI from your supplier relationships. A disciplined framework for strategic supplier engagement can reduce fixed investment, process costs, inventory and improve time to market.",
    high: "Strong SRM maturity supports innovation and scalability. Consider partnering with key suppliers to co-develop solutions that offer unique market value."
  },
  "Transparency and Visibility": {
    low: "Maturity feedback in the area of Transparency and Visibility indicates your supply chain actions and customer communication may be out of synch with your business reality. A supply chain technology review, potentially together with logistics partners, could reveal opportunities to reduce tariff exposure, regulatory risk and improve service levels.",
    high: "Advanced visibility enables faster response and alignment with real-time business events. Build on this to drive continuous improvement and automation."
  },
  "Supply Strategy": {
    low: "Your responses relative to Supply Strategy are indicative of a more transactional purchasing approach. In todays environment this highlights significant risk of cash flow and profitability impact due to the global trade environment. Impact mitigation activities should be prioritized.",
    high: "Mature supply strategies can optimize total cost of ownership and resilience. Continue to refresh based on regional dynamics and business objectives."
  },
  "Agility and Flexibility": {
    low: "Low scores in Agility and Flexibility highlight your vulnerability to market dynamics and potential for resulting negative surprises and reduced service levels for end customers. Supply chain scenario planning and actions plans should be developed.",
    high: "High agility allows for faster time to market and greater customer responsiveness. Reinforce this with cross-training, modular designs and localized capacity."
  }
};

export default function SupplyChainAssessment() {
  const [responses, setResponses] = useState(Array(30).fill(3));
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", company: "", city: "", state: "", country: "" });

  console.log("overallTachometer path:", overallTachometer);
  console.log("maturitySlider path:", maturitySlider);

  const totalScore = responses.reduce((a, b) => a + b, 0);
  let maturity = "";
  if (totalScore <= 40) maturity = "High Maturity Procurement";
  else if (totalScore <= 80) maturity = "Mid-Level Maturity Procurement";
  else if (totalScore <= 100) maturity = "Low Maturity Procurement";
  else maturity = "Basic Purchasing Operations";

  const sectionScores = questions.map((section, index) => {
    const start = index * 6;
    const end = start + 6;
    const score = responses.slice(start, end).reduce((a, b) => a + b, 0);
    return {
      section: section.section,
      score,
      feedback: score <= 20 ? guidanceText[section.section].low : guidanceText[section.section].high,
      sliderPosition: (score / 6).toFixed(1)
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
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
        responses: responses.join(", "),
        maturity,
        _subject: "New Supply Chain Assessment Submission"
      })
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      {!submitted && (
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
      )}
      {!submitted ? (
        <>
          <h1>Supply Chain Maturity Assessment</h1>
          <h2>Your Info</h2>
          {Object.keys(userInfo).map((field, i) => (
            <div key={i}>
              <input
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
              />
            </div>
          ))}
          {questions.map((section, sIdx) => (
            <div key={sIdx}>
              <h3>{section.section}</h3>
              {section.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <label>{item}</label><br />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={responses[sIdx * 6 + iIdx]}
                    onChange={(e) => handleSliderChange(sIdx * 6 + iIdx, e.target.value)}
                  />
                  <span> {responses[sIdx * 6 + iIdx]}</span>
                  <br /><br />
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Assessment</button>
        </>
      ) : (
        <div>
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
              <div style={{ position: "relative", marginBottom: 10 }}>
                <img src={maturitySlider} alt="Maturity Slider" style={{ width: "100%", maxWidth: 400 }} />
                <div
                  style={{
                    position: "absolute",
                    top: 5,
                    left: `calc(${2.5 + ((s.score / 6 - 1) * 11)}% - 10px)`,
                    width: 0,
                    height: 0,
		    borderLeft: "10px solid transparent",
		    borderRight: "10px solid transparent",
		    borderTop: "20px solid black"
                  }}
                ></div>
              </div>
              <p>{s.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
