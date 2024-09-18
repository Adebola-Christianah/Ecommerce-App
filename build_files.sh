#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Run Django build commands
python manage.py collectstatic --noinput
python manage.py migrate
