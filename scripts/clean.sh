#!/bin/sh
forever stop /home/ubuntu/codechamps/app.js
cp -r /home/ubuntu/codechamps /home
rm -r /home/ubuntu/codechamps
