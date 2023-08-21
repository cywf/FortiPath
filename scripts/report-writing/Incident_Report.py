# Incident_Report.py

"""
Incident Report Script

Purpose:
This script aids in the creation of detailed incident reports following a security event or breach. 
The user is prompted to provide specifics about the incident, including the nature of the event, 
affected assets, individuals involved, timeline, and immediate actions taken. The script then 
structures this information into a comprehensive report, ensuring that all pertinent details are 
documented for future reference, legal considerations, or further action.

Usage:
Run the script and follow the on-screen prompts to input the necessary details about the incident. 
Upon completion, an incident report will be generated and displayed.
"""

# Import necessary libraries
import datetime

def gather_incident_details():
    """
    This function prompts the user for information about the incident.
    """
    incident_type = input("Enter the type of incident (e.g., unauthorized access, data breach, physical intrusion): ")
    affected_assets = input("List the assets affected by the incident (e.g., servers, buildings, data): ")
    involved_individuals = input("List individuals involved or witnesses (if any): ")
    incident_date = input("Enter the date and time of the incident (YYYY-MM-DD HH:MM): ")
    incident_description = input("Provide a detailed description of the incident: ")
    immediate_actions_taken = input("Describe any immediate actions taken in response to the incident: ")

    return incident_type, affected_assets, involved_individuals, incident_date, incident_description, immediate_actions_taken

def generate_incident_report(incident_type, affected_assets, involved_individuals, incident_date, incident_description, immediate_actions_taken):
    """
    This function generates the Incident Report based on the provided details.
    """
    report_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    report = f"""
    Incident Report
    Report Date: {report_date}
    Incident Date: {incident_date}

    1. Incident Type:
    {incident_type}

    2. Affected Assets:
    {affected_assets}

    3. Involved Individuals/Witnesses:
    {involved_individuals}

    4. Incident Description:
    {incident_description}

    5. Immediate Actions Taken:
    {immediate_actions_taken}

    # TODO: Consider adding sections for post-incident analysis, lessons learned, and recommended future actions.
    """
    
    return report

def main():
    """
    Main function to gather incident details and generate the Incident Report.
    """
    incident_type, affected_assets, involved_individuals, incident_date, incident_description, immediate_actions_taken = gather_incident_details()
    report = generate_incident_report(incident_type, affected_assets, involved_individuals, incident_date, incident_description, immediate_actions_taken)
    
    # Print the report
    print(report)

    # TODO: Consider adding functionality to save the report to a file or database.

if __name__ == '__main__':
    main()
