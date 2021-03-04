FROM nginx:1.14.1-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY  ./dist/fab /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"] 