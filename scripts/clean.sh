#!/bin/sh
rm /home/codechamps/app.js
cp /home/ubuntu/codechamps/app.js /home/codechamps/app.js
rm /home/ubuntu/codechamps/app.js
rm -r /home/codechamps/webapp
cp -r /home/ubuntu/codechamps/webapp /home/codechamps/webapp
rm -r /home/ubuntu/codechamps/webapp
rm -r /home/codechamps/routes
cp -r /home/ubuntu/codechamps/routes /home/codechamps/routes
rm -r /home/ubuntu/codechamps/routes
rm -r /home/codechamps/Problems
cp -r /home/ubuntu/codechamps/Problems /home/codechamps/Problems
rm -r /home/ubuntu/codechamps/Problems
rm -r /home/scripts
cp -r /home/ubuntu/scripts /home/scripts
rm -r /home/ubuntu/scripts
