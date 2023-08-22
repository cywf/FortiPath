TAK Server Deployment 

```bash
#!/bin/bash

# Check if the operating system is Ubuntu
if [[ "$(lsb_release -is)" != "Ubuntu" ]]; then
  echo "This script is intended for Ubuntu only. Please run it on an Ubuntu machine."
  exit 1
fi

# Uninstall previous deployments
echo "Uninstalling previous deployments..."
sudo pip3 uninstall -y FreeTAKServer
sudo pip3 uninstall -y pytest pytest-pep8 pytest-cov pytak

# Remove any previous cloned repos
echo "Removing previous cloned repos..."
sudo rm -rf FreeTakServer

# Update system
echo "Updating system..."
sudo apt-get update

# Install necessary packages
echo "Installing necessary packages..."
sudo apt-get install -y python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools python3-venv git

# Install additional dependencies for pycairo
echo "Installing additional dependencies for pycairo..."
sudo apt-get install -y libcairo2-dev

# Clone the FreeTAKServer repo
echo "Cloning the FreeTAKServer repo..."
git clone https://github.com/FreeTAKTeam/FreeTakServer.git

# Navigate to the FreeTAKServer directory
cd FreeTakServer || exit

# Install the requirements
echo "Installing requirements..."
pip3 install -r requirements.txt

# Install FreeTAKServer
echo "Installing FreeTAKServer..."
python3 setup.py install

# Print success message
echo "FreeTAKServer has been successfully installed!"

# Start the FreeTAKServer
echo "Starting FreeTAKServer..."
python3 -m FreeTAKServer.controllers.services.FTS -DataPackageIP 0.0.0.0 -AutoStart True

# Exit the script
exit 0
```