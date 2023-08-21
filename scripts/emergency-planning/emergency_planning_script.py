# Types of planning:
#
# - Primary
# - Alternate
# - Contingency 
# - Emergancy 

# This script will help the protection team practice their response to different emergencies and identify any areas where they need to improve. It will also provide valuable data that can be used to refine the emergency plans and training programs.

import random
import time
from datetime import datetime

# Define potential emergencies
emergencies = ['Medical emergency', 'Threat to principal', 'Natural disaster']

# Define team members
team_members = ['Team member 1', 'Team member 2', 'Team member 3']

# Define roles for each team member in each emergency
roles = {
    'Medical emergency': {
        'Team member 1': {
            'Primary': 'Provide first aid',
            'Alternate': 'Call for medical help',
            'Contingency': 'Evacuate the principal',
            'Emergency': 'Secure the area'
        },
        'Team member 2': {
            'Primary': 'Call for medical help',
            'Alternate': 'Provide first aid',
            'Contingency': 'Evacuate the principal',
            'Emergency': 'Secure the area'
        },
        'Team member 3': {
            'Primary': 'Evacuate the principal',
            'Alternate': 'Provide first aid',
            'Contingency': 'Call for medical help',
            'Emergency': 'Secure the area'
        }
    },
    'Threat to principal': {
        'Team member 1': {
            'Primary': 'Protect the principal',
            'Alternate': 'Neutralize the threat',
            'Contingency': 'Evacuate the principal',
            'Emergency': 'Call for help'
        },
        'Team member 2': {
            'Primary': 'Neutralize the threat',
            'Alternate': 'Protect the principal',
            'Contingency': 'Evacuate the principal',
            'Emergency': 'Call for help'
        },
        'Team member 3': {
            'Primary': 'Evacuate the principal',
            'Alternate': 'Protect the principal',
            'Contingency': 'Neutralize the threat',
            'Emergency': 'Call for help'
        }
    },
    'Natural disaster': {
        'Team member 1': {
            'Primary': 'Secure the area',
            'Alternate': 'Evacuate the principal',
            'Contingency': 'Call for help',
            'Emergency': 'Provide first aid'
        },
        'Team member 2': {
            'Primary': 'Evacuate the principal',
            'Alternate': 'Secure the area',
            'Contingency': 'Call for help',
            'Emergency': 'Provide first aid'
        },
        'Team member 3': {
            'Primary': 'Call for help',
            'Alternate': 'Secure the area',
            'Contingency': 'Evacuate the principal',
            'Emergency': 'Provide first aid'
        }
    }
}

# Function to simulate an emergency
def simulate_emergency():
    # Select a random emergency
    emergency = random.choice(emergencies)
    
    print(f'Emergency: {emergency}')
    print('Starting simulation...')
    
    # Start the timer
    start_time = time.time()
    
    # Assign roles to team members
    for member, role in roles[emergency].items():
        print(f'{member} roles:')
        for pace, action in role.items():
            print(f'  {pace}: {action}')
    
    # Simulate the time it takes for the team to respond
    response_time = random.randint(5, 15)
    time.sleep(response_time)
    
    # Stop the timer
    end_time = time.time()
    
    # Calculate the response time
    response_time = end_time - start_time
    
    print(f'Simulation ended. Response time: {response_time} seconds')
    
    # Generate a report
    report = {
        'emergency': emergency,
        'response_time': response_time,
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'team_performance': 'Good' if response_time <= 10 else 'Needs improvement'
    }
    
    return report

# Run the simulation
report = simulate_emergency()

# Print the report
print('Simulation Report:')
for key, value in report.items():
    print(f'{key}: {value}')
