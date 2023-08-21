# Threat_Assessment.py

"""
Threat Assessment Script

Purpose:
This script aids in the creation of Threat Assessments for security operations. Threat Assessments are crucial for 
identifying potential threats, their likelihood, and their potential impact. This script streamlines the process of 
creating Threat Assessments by guiding the user through a series of prompts to capture key details about the identified 
threats, their sources, and potential mitigation strategies.

Usage:
Run the script and follow the on-screen prompts to input details about the identified threats, their sources, likelihood, 
impact, and recommended mitigation strategies. Upon completion, a comprehensive Threat Assessment report will be generated 
and displayed.

Note:
This script is intended to assist in drafting Threat Assessments. Users should review and finalize the generated report 
before sharing or archiving.
"""

# Import necessary libraries
import datetime

def gather_threat_details():
    """
    This function prompts the user for details about the identified threats, their sources, likelihood, impact, and mitigation strategies.
    """
    threat_name = input("Enter the name/description of the identified threat: ")
    threat_source = input("Describe the source of the threat (e.g., cybercriminal group, insider threat, etc.): ")
    likelihood = input("Rate the likelihood of the threat occurring (Low, Medium, High): ")
    impact = input("Rate the potential impact of the threat (Low, Medium, High): ")
    mitigation_strategies = input("List the recommended mitigation strategies for the identified threat: ")

    return threat_name, threat_source, likelihood, impact, mitigation_strategies

def generate_threat_report(threat_name, threat_source, likelihood, impact, mitigation_strategies):
    """
    This function generates the Threat Assessment report based on the provided details.
    """
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    threat_report = f"""
    Threat Assessment Report
    Date of Report: {current_date}
    Identified Threat: {threat_name}
    Source of Threat: {threat_source}
    Likelihood: {likelihood}
    Potential Impact: {impact}

    Recommended Mitigation Strategies:
    {mitigation_strategies}

    Prepared by: [Your Name]
    FortiPath Security Team

    # TODO: Consider adding a section for signatures or approvals if required.
    """
    
    return threat_report

def main():
    """
    Main function to gather threat details and generate the Threat Assessment report.
    """
    threat_name, threat_source, likelihood, impact, mitigation_strategies = gather_threat_details()
    threat_report = generate_threat_report(threat_name, threat_source, likelihood, impact, mitigation_strategies)
    
    # Print the Threat Assessment report
    print(threat_report)

    # TODO: Consider adding functionality to save the Threat Assessment report to a file or integrate with a document management system.

if __name__ == '__main__':
    main()
