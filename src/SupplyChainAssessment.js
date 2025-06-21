import React, { useState } from "react";

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

export default function SupplyChainAssessment() {
  const [responses, setResponses] = useState(Array(30).fill(3));
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "", company: "", city: "", state: "", country: "" });

  const totalScore = responses.reduce((a, b) => a + b, 0);
  let maturity = "";
  if (totalScore <= 40) maturity = "High Maturity Procurement";
  else if (totalScore <= 80) maturity = "Mid-Level Maturity Procurement";
  else if (totalScore <= 100) maturity = "Low Maturity Procurement";
  else maturity = "Basic Purchasing Operations";

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
          <p>Total Score: {totalScore}</p>
          <p>Maturity Level: {maturity}</p>
        </div>
      )}
    </div>
  );
}
