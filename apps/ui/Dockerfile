FROM nginxinc/nginx-unprivileged:alpine
WORKDIR /app

# Copy the pre-built Angular artifacts from the GitHub Actions runner
COPY dist/ui/browser /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]