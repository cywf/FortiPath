# In this updated script, the add_event method now checks that the input is an instance of Event and raises a ValueError if it is not. The remove_event method checks that there is an event with the given name in the schedule and raises a ValueError if there is not.

# The save_schedule method saves the current schedule to a file using the pickle module, and the load_schedule method loads a schedule from a file. Note that these methods do not include any error checking or exception handling for issues with the file I/O, such as the file not existing or not being readable or writable. This is something that could be added in a more advanced script.


import datetime
import pickle

class Event:
    def __init__(self, name, location, start_time, end_time, details):
        self.name = name
        self.location = location
        self.start_time = start_time
        self.end_time = end_time
        self.details = details

class Schedule:
    def __init__(self):
        self.events = []

    def add_event(self, event):
        if not isinstance(event, Event):
            raise ValueError("Can only add instances of Event to the schedule.")
        self.events.append(event)

    def remove_event(self, event_name):
        if not any(event.name == event_name for event in self.events):
            raise ValueError(f"No event named '{event_name}' found in the schedule.")
        self.events = [event for event in self.events if event.name != event_name]

    def get_schedule(self):
        return sorted(self.events, key=lambda event: event.start_time)

    def save_schedule(self, filename):
        with open(filename, 'wb') as f:
            pickle.dump(self.events, f)

    def load_schedule(self, filename):
        with open(filename, 'rb') as f:
            self.events = pickle.load(f)

def main():
    # Create a new schedule
    schedule = Schedule()

    # Add some events
    schedule.add_event(Event("Meeting with CEO", "Office", datetime.datetime(2023, 7, 20, 10, 0), datetime.datetime(2023, 7, 20, 11, 0), "Discuss quarterly earnings"))
    schedule.add_event(Event("Lunch with partner", "Restaurant", datetime.datetime(2023, 7, 20, 12, 30), datetime.datetime(2023, 7, 20, 13, 30), "Discuss partnership agreement"))
    schedule.add_event(Event("Flight to New York", "Airport", datetime.datetime(2023, 7, 20, 15, 0), datetime.datetime(2023, 7, 20, 18, 0), "Business trip"))

    # Save the schedule
    schedule.save_schedule('schedule.pkl')

    # Load the schedule
    schedule.load_schedule('schedule.pkl')

    # Print the schedule
    for event in schedule.get_schedule():
        print(f"{event.start_time} - {event.end_time}: {event.name} at {event.location} ({event.details})")

if __name__ == "__main__":
    main()
