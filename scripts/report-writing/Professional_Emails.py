# Professional_Emails.py

"""
Professional Emails Script

Purpose:
This script aids in drafting professional emails regarding security matters. Whether it's communicating with stakeholders,
informing team members about a security update, or sending out alerts, this tool ensures that the message is clear, 
concise, and professional.

Usage:
Run the script and follow the on-screen prompts to input details about the email's subject, recipient, and main content.
Upon completion, a professionally formatted email draft will be generated and displayed.

Note:
This script is intended to assist in drafting emails and does not send emails directly. Users should copy the generated
draft into their preferred email client for sending.
"""

# Import necessary libraries
import datetime

def gather_email_details():
    """
    This function prompts the user for details about the email's subject, recipient, and main content.
    """
    recipient_name = input("Enter the recipient's name: ")
    recipient_email = input("Enter the recipient's email address: ")
    subject = input("Enter the email subject: ")
    main_content = input("Enter the main content of the email: ")

    return recipient_name, recipient_email, subject, main_content

def generate_email_draft(recipient_name, recipient_email, subject, main_content):
    """
    This function generates the professional email draft based on the provided details.
    """
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    
    email_draft = f"""
    Date: {current_date}
    To: {recipient_name} <{recipient_email}>
    Subject: {subject}

    Dear {recipient_name},

    {main_content}

    Kind regards,

    [Your Name]
    [Your Position]
    FortiPath Security Team

    # TODO: Consider adding a signature or contact details at the end of the email.
    """
    
    return email_draft

def main():
    """
    Main function to gather email details and generate the professional email draft.
    """
    recipient_name, recipient_email, subject, main_content = gather_email_details()
    email_draft = generate_email_draft(recipient_name, recipient_email, subject, main_content)
    
    # Print the email draft
    print(email_draft)

    # TODO: Consider adding functionality to save the email draft to a file or integrate with an email client for direct sending.

if __name__ == '__main__':
    main()
