import React, { useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Button,
  Link,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  List,
  ListItem,
  ListIcon,
  Badge
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
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
    low: {
      title: "Supply Chain Strategy and Design",
      whyItMatters: "52% of engineers now spend 6+ hours weekly on supply chain work—that's lost innovation time.",
      situation: [
        "Lack intentional, cross-functional supply chain design",
        "Face significant cost disadvantages vs. competitors",
        "Vulnerable to tariff impacts and market disruptions"
      ],
      bottomLine: "Poor design compounds over time, making you less competitive on cost and service.",
      nextSteps: "Conduct a cross-functional supply chain design review to identify misalignment areas."
    },
    high: {
      title: "Supply Chain Strategy and Design",
      whyItMatters: "You've built a competitive advantage through optimized supply chain design.",
      strengths: [
        "Superior cost structure through optimized networks",
        "Reduced transportation expenses",
        "Strategic inventory positioning",
        "Rapid market response capability"
      ],
      nextSteps: "Continuously align with evolving business strategy to maintain your edge."
    }
  },
  "Supplier Relationship Management": {
    low: {
      title: "Supplier Relationship Management (SRM)",
      whyItMatters: "Companies with dedicated responsibilities for supplier management save up to 30% on material costs.",
      risks: [
        "Vulnerability to supply disruptions",
        "Limited access to supplier innovation",
        "Suboptimal pricing and terms",
        "Missing strategic partnership opportunities"
      ],
      nextSteps: "Run a cross-functional supplier segmentation workshop to identify partners and assign responsibility for relationship development."
    },
    high: {
      title: "Supplier Relationship Management (SRM)",
      whyItMatters: "Strong supplier relationships are your competitive differentiator.",
      advantages: [
        "Access to cutting-edge technologies",
        "Collaborative innovation opportunities",
        "Preferential support during disruptions",
        "Faster product development cycles",
        "Cost advantages through joint optimization"
      ],
      nextSteps: "Annual alignment checks with internal stakeholders on your strategic supplier list and your development plans are critical."
    }
  },
  "Transparency and Visibility": {
    low: {
      title: "Supply Chain Visibility and Transparency",
      whyItMatters: "Improving visibility is the top priority for 55% of manufacturing businesses.",
      challenges: [
        "Reactive vs. proactive management",
        "Higher costs and service failures",
        "Cannot respond efficiently to disruptions",
        "Limited tariff mitigation effectiveness",
        "Increased regulatory compliance risks"
      ],
      nextSteps: "Invest in real-time data systems to enable proactive decision-making."
    },
    high: {
      title: "Supply Chain Visibility and Transparency",
      whyItMatters: "Advanced visibility is your competitive differentiator.",
      capabilities: [
        "Faster response times",
        "Better alignment with real-time events",
        "Superior customer service",
        "Predictive analytics and automation",
        "Continuous performance optimization"
      ],
      nextSteps: "Drive continuous improvement and automation initiatives for operational excellence."
    }
  },
  "Supply Strategy": {
    low: {
      title: "Procurement and Sourcing Strategy",
      whyItMatters: "Companies report 80% of invoices come from non-preferred suppliers when procurement doesn't lead the sourcing strategy.",
      risks: [
        "Higher total costs",
        "Limited supplier innovation access",
        "Vulnerability to market disruptions",
        "Reduced negotiating power",
        "Missing strategic partnerships"
      ],
      nextSteps: "Assign and empower category leadership for strategic spend areas. Create linkage to engineering teams for alignment."
    },
    high: {
      title: "Procurement and Sourcing Strategy",
      whyItMatters: "Your mature procurement strategy creates multiple competitive advantages.",
      strengths: [
        "Optimized total cost of ownership",
        "Enhanced business resilience",
        "Strategic supplier partnerships",
        "Access to supplier innovation",
        "Preferential treatment for growth"
      ],
      nextSteps: "Refresh strategies regularly for evolving material and service needs, global market dynamics and regulatory changes."
    }
  },
  "Agility and Flexibility": {
    low: {
      title: "Supply Chain Agility and Flexibility",
      whyItMatters: "93% of companies plan to make supply chains more flexible and resilient.",
      vulnerabilities: [
        "Cannot adapt quickly to market changes",
        "Lost sales opportunities during disruptions",
        "Customer dissatisfaction and service failures",
        "Increased slow and excess inventory risks",
        "Competitive disadvantage vs. agile organizations"
      ],
      nextSteps: "Prioritize scenario planning and document action plans to improve response capabilities."
    },
    high: {
      title: "Supply Chain Agility and Flexibility",
      whyItMatters: "Your agility provides multiple competitive advantages.",
      capabilities: [
        "Faster product launches",
        "Superior customer service during disruptions",
        "Capitalize on unexpected opportunities",
        "Optimize inventory across demand variations",
        "Adapt quickly to changing requirements"
      ],
      nextSteps: "Leverage this capability to grow your business through cross-functional reviews with sales and marketing teams."
    }
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

    const scaledScore = score / 6;
    const sliderPercent = 3.5 + ((scaledScore - 1) * 16);

    return {
      section: section.section,
      score,
      isHighMaturity: score <= 12,
      feedback: score > 12 ? guidanceText[section.section].low : guidanceText[section.section].high,
      sliderPosition: scaledScore.toFixed(1),
      sliderPercent: sliderPercent
    };
  });

  // Results Page with Enhanced Chakra UI Layout
  if (submitted) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={12} align="stretch">
          
          {/* Top Section - Overall Assessment Results */}
          <Box bg="white" p={8} borderRadius="lg" shadow="md" textAlign="center">
            <Heading size="xl" color="brand.charcoal" mb={6}>
              Assessment Results
            </Heading>
            <VStack spacing={4}>
              <HStack spacing={8} justify="center" align="center">
                <VStack spacing={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="brand.steel">
                    Total Score:
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" color="brand.brick">
                    {totalScore}
                  </Text>
                </VStack>
                <VStack spacing={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="brand.steel">
                    Overall Maturity Level:
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.charcoal" textAlign="center">
                    {maturity}
                  </Text>
                </VStack>
              </HStack>
              <Box mt={6}>
                <img 
                  src={overallTachometer} 
                  alt="Overall Score Tachometer" 
                  style={{ width: "100%", maxWidth: "500px", height: "auto" }} 
                />
              </Box>
            </VStack>
          </Box>

          {/* Middle Section - Section Scores in 2-Column Grid */}
          <Box>
            <Heading size="lg" color="brand.charcoal" mb={6}>
              Section Feedback:
            </Heading>
            <SimpleGrid columns={2} spacing={8}>
              {sectionScores.map((s, idx) => (
                <Box key={idx} bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                  <VStack align="stretch" spacing={5}>
                    
                    {/* Section Header with Badge */}
                    <HStack justify="space-between" align="center">
                      <Heading size="md" color="brand.charcoal">
                        {s.feedback.title}
                      </Heading>
                      <Badge 
                        colorScheme={s.isHighMaturity ? "green" : "orange"}
                        fontSize="xs"
                        px={2}
                        py={1}
                      >
                        {s.isHighMaturity ? "HIGH MATURITY" : "LOW MATURITY"}
                      </Badge>
                    </HStack>
                    
                    {/* Score Display */}
                    <HStack justify="space-between" align="center">
                      <Text fontWeight="semibold" color="brand.steel">
                        Score: {s.score} / 30
                      </Text>
                    </HStack>
                    
                    {/* Custom Slider Image with Arrow */}
                    <Box position="relative">
                      <img 
                        src={new URL("./maturity-slider.png", import.meta.url).href} 
                        alt="Maturity Slider" 
                        style={{ width: "100%", maxWidth: "400px" }} 
                      />
                      <Box
                        position="absolute"
                        top="+10px"
                        left={`calc(${s.sliderPercent}% - 10px)`}
                        width="0"
                        height="0"
                        borderLeft="10px solid transparent"
                        borderRight="10px solid transparent"
                        borderTop="10px solid black"
                      />
                    </Box>
                    
                    {/* Why It Matters */}
                    <Box>
                      <Text fontWeight="bold" color="brand.charcoal" mb={2}>
                        Why it matters:
                      </Text>
                      <Text fontSize="sm" color="gray.700" fontStyle="italic">
                        {s.feedback.whyItMatters}
                      </Text>
                    </Box>
                    
                    {/* Dynamic Content Based on Maturity Level */}
                    {s.isHighMaturity ? (
                      <>
                        {/* High Maturity Content */}
                        {s.feedback.strengths && (
                          <Box>
                            <Text fontWeight="bold" color="green.600" mb={2}>
                              Your strengths:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.strengths.map((strength, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={CheckCircleIcon} color="green.500" />
                                  {strength}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.advantages && (
                          <Box>
                            <Text fontWeight="bold" color="green.600" mb={2}>
                              Your advantages:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.advantages.map((advantage, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={CheckCircleIcon} color="green.500" />
                                  {advantage}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.capabilities && (
                          <Box>
                            <Text fontWeight="bold" color="green.600" mb={2}>
                              Your capabilities:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.capabilities.map((capability, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={CheckCircleIcon} color="green.500" />
                                  {capability}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Low Maturity Content */}
                        {s.feedback.situation && (
                          <Box>
                            <Text fontWeight="bold" color="orange.600" mb={2}>
                              Your situation:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.situation.map((item, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={WarningIcon} color="orange.500" />
                                  {item}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.risks && (
                          <Box>
                            <Text fontWeight="bold" color="orange.600" mb={2}>
                              Your risks:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.risks.map((risk, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={WarningIcon} color="orange.500" />
                                  {risk}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.challenges && (
                          <Box>
                            <Text fontWeight="bold" color="orange.600" mb={2}>
                              Your challenges:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.challenges.map((challenge, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={WarningIcon} color="orange.500" />
                                  {challenge}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.vulnerabilities && (
                          <Box>
                            <Text fontWeight="bold" color="orange.600" mb={2}>
                              Your vulnerabilities:
                            </Text>
                            <List spacing={1}>
                              {s.feedback.vulnerabilities.map((vulnerability, i) => (
                                <ListItem key={i} fontSize="sm" color="gray.700">
                                  <ListIcon as={WarningIcon} color="orange.500" />
                                  {vulnerability}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {s.feedback.bottomLine && (
                          <Box>
                            <Text fontWeight="bold" color="red.600" mb={2}>
                              The bottom line:
                            </Text>
                            <Text fontSize="sm" color="gray.700" fontWeight="medium">
                              {s.feedback.bottomLine}
                            </Text>
                          </Box>
                        )}
                      </>
                    )}
                    
                    {/* What's Next */}
                    <Box bg="blue.50" p={4} borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.400">
                      <Text fontWeight="bold" color="blue.700" mb={2}>
                        What's next:
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        {s.feedback.nextSteps}
                      </Text>
                    </Box>
                    
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Print Button Section */}
          <Box textAlign="center" py={6}>
            <Button
              onClick={() => window.print()}
              bg="brand.charcoal"
              color="white"
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="semibold"
              leftIcon={<span>🖨️</span>}
              _hover={{ bg: '#2a2a2a' }}
              _focus={{ boxShadow: 'outline' }}
            >
              Print Results to PDF
            </Button>
            <Text mt={2} fontSize="sm" color="gray.600">
              Use your browser's print dialog to save as PDF
            </Text>
          </Box>

          {/* Bottom Section - Call to Action */}
          <Box bg="brand.steel" color="white" p={8} borderRadius="lg" textAlign="center">
            <VStack spacing={6}>
              <Heading size="lg" color="white" mb={4}>
                Let's Continue the Conversation
              </Heading>
              
              <VStack spacing={4} fontSize="lg" lineHeight="relaxed">
                <Text>
                  I hope the <strong>SRx Consulting Supply Chain assessment</strong> provided valuable insights into your current operations. This tool is designed to help you reflect on key performance drivers while identifying specific opportunities that could significantly impact your bottom line.
                </Text>
                <Text>
                  If any of the findings resonated with you or if you'd like to explore potential solutions in greater detail, I'd welcome the opportunity to discuss your results further. Please feel free to schedule a follow-up conversation at your convenience.
                </Text>
              </VStack>
              
              <HStack spacing={6} mt={8}>
                <Button 
                  as={Link}
                  href="https://www.SRxConsultingllc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  bg="brand.brick"
                  color="white"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="semibold"
                  _hover={{ bg: '#a04332', textDecoration: 'none' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  🔗 Visit My Website
                </Button>
                <Button 
                  as={Link}
                  href="https://tidycal.com/ttsouchlos/30-minute-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline" 
                  borderColor="white" 
                  color="white"
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontWeight="semibold"
                  _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  📅 Schedule a Meeting
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    );
  }
// User Info Form with Chakra UI
  if (currentSection === -1) {
    return (
      <>
        {/* White Header Section with Logo */}
        <Box width="100%" display="flex" justifyContent="center" py={4}>
          <Box
            maxW="4xl"
	    width="100%"
            px={8}
            py={6}
            bg="white"
            borderRadius="md"
            shadow="sm"
          >
            {/* Logo positioned top left */}
            <Box mb={4} display="flex" justifyContent="center">
              <img 
                src={new URL("./srx-logo.png", import.meta.url).href}
                alt="SRX Consulting Logo" 
                style={{ height: '80px', width: 'auto' }}
              />
            </Box>
            
            {/* Centered header text */}
            <VStack spacing={1} align="center">
              <Heading size="xl" color="brand.charcoal" textAlign="center">
                Supply Chain Maturity Assessment
              </Heading>
              <Text fontSize="lg" color="gray.700" fontWeight="semibold" textAlign="center">
                for Medium to Large Manufacturers
              </Text>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                (typically $25M to $1B Annual Revenue)
              </Text>
            </VStack>
          </Box>
        </Box>

        {/* Gray Intro Section */}
        <Box width="100%" display="flex" justifyContent="center" py={4}>
          <Box
            maxW="4xl"
            px={8}
            py={6}
            bg="gray.50"
            borderLeft="6px solid #a04332"
            borderRadius="md"
            shadow="sm"
          >
            <Text fontSize="md" color="gray.700" lineHeight="tall" textAlign="justify">
              <strong>Why it matters:</strong> Supply chain management maximizes value across your entire network—from supplier to consumer.<br /><br />
<strong>What We're Measuring</strong><br /><br />
This assessment evaluates <strong>5 foundational areas</strong> that build responsive, cost-effective, and resilient supply networks:<br /><br />
• <strong>Supply chain strategy and design</strong><br />
• <strong>Sourcing and procurement</strong><br />
• <strong>Inventory and production planning</strong><br />
• <strong>Logistics</strong><br />
• <strong>Warehousing</strong><br /><br />
<strong>What's Not Included</strong><br /><br />
We exclude operational production and customer service—these vary too much by industry for meaningful comparison.<br /><br />
<strong>The bottom line:</strong> The following questions will help you identify your maturity level and improvement opportunities across these core supply chain functions.
            </Text>
          </Box>
        </Box>

        {/* Form Container */}
        <Container maxW="md" py={8}>
          <VStack spacing={6} align="stretch">
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <VStack spacing={4}>
                {Object.keys(userInfo).map((field, i) => (
                  <FormControl key={i} isRequired>
                    <FormLabel color="brand.steel" fontWeight="semibold">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <Input
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      onChange={handleInputChange}
                      value={userInfo[field]}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'brand.brick', boxShadow: 'outline' }}
                    />
                  </FormControl>
                ))}
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <Button
                  onClick={() => {
                    if (isUserInfoComplete) {
                      setCurrentSection(0);
                    } else {
                      setError("Please complete all required information");
                    }
                  }}
                  bg={isUserInfoComplete ? "brand.brick" : "gray.400"}
                  color="white"
                  size="lg"
                  width="full"
                  mt={4}
                  _hover={{ bg: isUserInfoComplete ? '#a04332' : 'gray.400' }}
                  cursor={isUserInfoComplete ? "pointer" : "not-allowed"}
                  isDisabled={!isUserInfoComplete}
                >
                  Next
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </>
    );
  }

  // Questions/Assessment Form with Enhanced Chakra UI
  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        
        {/* Instructions */}
        <Box bg="blue.50" p={6} borderRadius="lg" border="1px" borderColor="blue.200">
          <Heading size="md" color="brand.charcoal" mb={4}>
            Instructions
          </Heading>
          <Text mb={4} color="gray.700">
            For each statement below, please move the slider to indicate your level of agreement:
          </Text>
          <List spacing={2}>
            <ListItem color="gray.700">
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <strong>1 = Strongly Agree</strong>
            </ListItem>
            <ListItem color="gray.700">
              <ListIcon as={CheckCircleIcon} color="green.400" />
              <strong>2 = Somewhat Agree</strong>
            </ListItem>
            <ListItem color="gray.700">
              <ListIcon as={CheckCircleIcon} color="yellow.500" />
              <strong>3 = Neutral</strong>
            </ListItem>
            <ListItem color="gray.700">
              <ListIcon as={WarningIcon} color="orange.400" />
              <strong>4 = Somewhat Disagree</strong>
            </ListItem>
            <ListItem color="gray.700">
              <ListIcon as={WarningIcon} color="red.500" />
              <strong>5 = Strongly Disagree</strong>
            </ListItem>
          </List>
        </Box>

        {/* Section Title */}
        <Box textAlign="center">
          <Badge colorScheme="blue" fontSize="sm" px={4} py={2} mb={4}>
            Section {currentSection + 1} of {questions.length}
          </Badge>
          <Heading size="lg" color="brand.charcoal">
            {questions[currentSection].section}
          </Heading>
        </Box>

        {/* Questions */}
        <VStack spacing={6}>
          {questions[currentSection].items.map((item, iIdx) => (
            <Box key={iIdx} bg="white" p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200" w="full">
              <VStack spacing={4} align="stretch">
                <Text fontSize="md" color="gray.700" lineHeight="tall">
                  {item}
                </Text>
                <HStack spacing={4} align="center">
                  <Text fontSize="sm" color="green.600" fontWeight="semibold">
                    Strongly Agree
                  </Text>
                  <Box flex="1">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={responses[currentSection * 6 + iIdx]}
                      onChange={(e) => handleSliderChange(currentSection * 6 + iIdx, e.target.value)}
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "#e2e8f0",
                        borderRadius: "4px",
                        outline: "none",
                        cursor: "pointer"
                      }}
                    />
                  </Box>
                  <Text fontSize="sm" color="red.600" fontWeight="semibold">
                    Strongly Disagree
                  </Text>
                  <Badge 
                    colorScheme={
                      responses[currentSection * 6 + iIdx] <= 2 ? "green" :
                      responses[currentSection * 6 + iIdx] === 3 ? "yellow" : "red"
                    }
                    fontSize="md"
                    px={3}
                    py={1}
                  >
                    {responses[currentSection * 6 + iIdx]}
                  </Badge>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>

        {/* Navigation Buttons */}
        <HStack justify="space-between" pt={6}>
          {currentSection > 0 ? (
            <Button
              onClick={() => setCurrentSection(currentSection - 1)}
              bg="gray.500"
              color="white"
              size="lg"
              px={8}
              leftIcon={<span>←</span>}
              _hover={{ bg: 'gray.600' }}
            >
              Back
            </Button>
          ) : (
            <Box /> // Empty box for spacing
          )}
          
          {currentSection < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentSection(currentSection + 1)}
              bg="brand.brick"
              color="white"
              size="lg"
              px={8}
              rightIcon={<span>→</span>}
              _hover={{ bg: '#a04332' }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              bg="green.600"
              color="white"
              size="lg"
              px={8}
              rightIcon={<span>✓</span>}
              _hover={{ bg: 'green.700' }}
            >
              Submit Assessment
            </Button>
          )}
        </HStack>
      </VStack>
    </Container>
  );
}