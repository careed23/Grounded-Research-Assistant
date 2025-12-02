# Dockerfile
# This file is used to containerize the static front-end application
# using a lightweight Nginx image, which is a standard practice for
# serving modern web applications in production.

# Stage 1: Use a minimal Nginx image to serve the static content
FROM nginx:alpine

# Copy the static application files from the current directory into the Nginx server's
# default HTML directory. The files include index.html and the js/ directory.
COPY . /usr/share/nginx/html

# Expose port 80, the default HTTP port for Nginx
EXPOSE 80

# The default Nginx CMD will start the server when the container runs
# CMD ["nginx", "-g", "daemon off;"]
