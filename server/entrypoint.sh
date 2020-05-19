#!/usr/bin/env bash

echo Migrating DB
flask db upgrade

echo Starting server
flask run --host=0.0.0.0
