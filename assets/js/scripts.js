// Scripts for FortiPath Landing Page

// OSINT POI Web Crawler Demo
function osintPOICrawlerDemo() {
    const poi = document.getElementById('poiInput').value;
    if (poi) {
        // Simulate the crawling process
        setTimeout(() => {
            document.getElementById('poiResults').innerText = `
            Data gathered for ${poi}:
            - Social Media: 5 mentions
            - Forums: 2 discussions
            - News Articles: 3 articles
            ...`;
        }, 2000);
    }
}

// Report Writing AI Assistant Demo
function reportWritingDemo() {
    const eventDetails = document.getElementById('eventDetailsInput').value;
    const reportStyle = document.getElementById('reportStyleDropdown').value;
    const reportTone = document.getElementById('reportToneDropdown').value;
    // Simulate AI-driven report generation
    setTimeout(() => {
        document.getElementById('reportResults').innerText = `
        Generated Report:
        Event Details: ${eventDetails}
        Style: ${reportStyle}
        Tone: ${reportTone}
        ...
        Note: This is a simulated report based on input.`;
    }, 2000);
}

// Threat Hunting Simulation Demo
function threatHuntingDemo() {
    const threatIndicator = document.getElementById('threatIndicatorInput').value;
    if (threatIndicator) {
        // Simulate the threat hunting process
        setTimeout(() => {
            document.getElementById('threatResults').innerText = `
            Potential threats detected related to ${threatIndicator}:
            - Suspicious IP: 192.168.1.1
            - Malicious Domain: example-malware.com
            ...`;
        }, 2000);
    }
}
