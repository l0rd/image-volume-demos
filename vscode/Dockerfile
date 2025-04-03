FROM nginx:1.27.4-bookworm
COPY index.html /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
