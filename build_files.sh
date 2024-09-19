#!/bin/bash

# Install dependencies
pip install --no-cache-dir -r requirements.txt

# Run your Django build commands
python manage.py collectstatic --noinput
python manage.py migrate --noinput
