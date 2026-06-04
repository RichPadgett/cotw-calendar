cd /var/www/cotw-calendar
git pull
npm install
npm run prod:web

cd server
npm install
npm run build
pm2 restart cotw-calendar

sudo nginx -t
sudo systemctl reload nginx



--- other stuff
tunnel
pm2 restart cotw-calendar-tunnel
