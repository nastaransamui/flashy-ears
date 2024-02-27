
server {
 listen 8000 default_server;
  server_name   www.my_admin.com my_admin.com;
	root /rootto/admin;
	client_max_body_size 64M;
  location / {
    proxy_pass             http://127.0.0.1:3800;
    proxy_read_timeout     60;
    proxy_connect_timeout  60;
    proxy_redirect         off;
    try_files $uri $uri/ =404;
    # Allow the use of websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
  
  location /_next/static {
   	alias /rootto/.next/static/;
        add_header Cache-Control "public, max-age=3600, immutable";
        proxy_pass http://127.0.0.1:8000/_next/static;
  }
  	location /admin/ {
		alias /home/majid/host/flashy-ears/admin/public/;
	}
}
    pm2 start yarn --name "my_admin.com" --interpreter bash -- start
    pm2 show my_admin.com
sudo ln -s /etc/nginx/sites-available/my_admin.com /etc/nginx/sites-enabled