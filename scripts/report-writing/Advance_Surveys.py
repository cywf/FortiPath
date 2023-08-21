# Advance_Surveys.py

"""
Advance Surveys Script

Purpose:
This script is designed to assist in conducting pre-event or pre-visit security assessments. The primary goal of an 
advance survey is to identify potential security risks, vulnerabilities, and logistical challenges associated with 
a specific venue or location. By gathering detailed information about the site in advance, protection teams can 
better prepare and implement effective security measures.

Usage:
Run the script and follow the on-screen prompts to input details about the venue, its surroundings, access points, 
security features, and any identified vulnerabilities. Upon completion, an Advance Survey report will be generated 
and displayed.
"""

# Import necessary libraries
import datetime

def gather_survey_details():
    """
    This function prompts the user for details about the venue, its surroundings, and any identified security concerns.
    """
    venue_name = input("Enter the name of the venue/location: ")
    venue_address = input("Enter the address of the venue/location: ")
    venue_type = input("Describe the type of venue (e.g., hotel, conference center, private residence): ")
    access_points = input("List the main access points (e.g., main entrance, service entrance, VIP entrance): ")
    security_features = input("Describe the existing security features (e.g., CCTV, guards, access control): ")
    identified_vulnerabilities = input("List any identified vulnerabilities or security concerns: ")
    nearby_landmarks = input("List any nearby landmarks or points of interest: ")

    return venue_name, venue_address, venue_type, access_points, security_features, identified_vulnerabilities, nearby_landmarks

def generate_advance_survey(venue_name, venue_address, venue_type, access_points, security_features, identified_vulnerabilities, nearby_landmarks):
    """
    This function generates the Advance Survey report based on the provided details.
    """
    report_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    survey = f"""
    Advance Survey Report
    Report Date: {report_date}
    Venue Name: {venue_name}
    Address: {venue_address}
    Venue Type: {venue_type}

    1. Access Points:
    {access_points}

    2. Security Features:
    {security_features}

    3. Identified Vulnerabilities:
    {identified_vulnerabilities}

    4. Nearby Landmarks:
    {nearby_landmarks}

    # TODO: Consider adding sections for emergency evacuation routes, communication protocols, and liaison contacts.
    """
    
    return survey

def main():
    """
    Main function to gather venue details and generate the Advance Survey report.
    """
    venue_name, venue_address, venue_type, access_points, security_features, identified_vulnerabilities, nearby_landmarks = gather_survey_details()
    survey = generate_advance_survey(venue_name, venue_address, venue_type, access_points, security_features, identified_vulnerabilities, nearby_landmarks)
    
    # Print the survey
    print(survey)

    # TODO: Consider adding functionality to save the survey to a file or database.

if __name__ == '__main__':
    main()
