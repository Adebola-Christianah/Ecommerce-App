#!/bin/bash

# Exit on any error
set -e

# Ensure pip is installed
apt-get update && apt-get install -y python3-pip

# Install dependencies
pip install -r requirements.txt

# Run your Django build commands
python manage.py collectstatic --noinput
python manage.py migrate
