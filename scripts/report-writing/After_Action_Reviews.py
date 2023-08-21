# After_Action_Reviews.py

"""
After Action Reviews Script

Purpose:
This script aids in the creation of After Action Reviews (AARs) for security operations. AARs are essential tools for 
evaluating the effectiveness of security operations, identifying areas for improvement, and ensuring continuous learning 
and improvement within the security team. This script streamlines the process of creating AARs by guiding the user 
through a series of prompts to capture key details about the operation, its outcomes, and lessons learned.

Usage:
Run the script and follow the on-screen prompts to input details about the security operation, its objectives, outcomes, 
challenges faced, and recommendations for future operations. Upon completion, a comprehensive AAR report will be generated 
and displayed.

Note:
This script is intended to assist in drafting AARs. Users should review and finalize the generated report before sharing 
or archiving.
"""

# Import necessary libraries
import datetime

def gather_aar_details():
    """
    This function prompts the user for details about the security operation, its objectives, outcomes, challenges, and recommendations.
    """
    operation_name = input("Enter the name of the security operation: ")
    operation_date = input("Enter the date of the operation (YYYY-MM-DD): ")
    objectives = input("List the objectives of the operation: ")
    outcomes = input("Describe the outcomes of the operation: ")
    challenges = input("List any challenges faced during the operation: ")
    recommendations = input("Provide recommendations for future operations based on lessons learned: ")

    return operation_name, operation_date, objectives, outcomes, challenges, recommendations

def generate_aar_report(operation_name, operation_date, objectives, outcomes, challenges, recommendations):
    """
    This function generates the After Action Review report based on the provided details.
    """
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    aar_report = f"""
    After Action Review (AAR) Report
    Date of Report: {current_date}
    Operation: {operation_name}
    Date of Operation: {operation_date}

    Objectives:
    {objectives}

    Outcomes:
    {outcomes}

    Challenges Faced:
    {challenges}

    Recommendations:
    {recommendations}

    Prepared by: [Your Name]
    FortiPath Security Team

    # TODO: Consider adding a section for signatures or approvals if required.
    """
    
    return aar_report

def main():
    """
    Main function to gather AAR details and generate the AAR report.
    """
    operation_name, operation_date, objectives, outcomes, challenges, recommendations = gather_aar_details()
    aar_report = generate_aar_report(operation_name, operation_date, objectives, outcomes, challenges, recommendations)
    
    # Print the AAR report
    print(aar_report)

    # TODO: Consider adding functionality to save the AAR report to a file or integrate with a document management system.

if __name__ == '__main__':
    main()
