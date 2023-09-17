#!/usr/bin/env python3

def main():
    # Gather user input
    venue_type = input("Enter the type of venue: ")
    venue_region = input("Enter the region of the venue: ")
    disaster_type = input("Would you like a disaster plan for man-made, natural disasters, or both? (Enter 'man-made', 'natural', or 'both'): ")

    # TODO: add inputs for the following:
    # - number of people in the venue

    # TODO: add ChatGPT API call to generate a disaster plan

    # Create the disaster plan
    disaster_plan = generate_disaster_plan(venue_type, venue_region, disaster_type)

    # Output the plan to a text file
    with open("disaster_plan.txt", "w") as file:
        file.write(disaster_plan)

    print("Disaster plan has been saved to 'disaster_plan.txt'.")

# TODO: this function needs to be updated to utilize the user input to generate a disaster plan using the outline below, currently it just returns a static outline of the plan

def generate_disaster_plan(venue_type, venue_region, disaster_type):
    plan = f"Venue Type: {venue_type}\nVenue Region: {venue_region}\nDisaster Type: {disaster_type}\n\n"
    plan += "# Disaster Planning Phases\n\n"
    plan += "* Risk Analysis\n"
    plan += "* Prevention & Mitigation\n"
    plan += "* Preparedness\n"
    plan += "* Prediction & Warning\n"
    plan += "* Response\n"
    plan += "* Recovery\n\n"
    plan += "## Risk Analysis Equation\n\n"
    plan += "Phenomenon + Vulnerability = Impact\n"
    return plan

if __name__ == "__main__":
    main()
