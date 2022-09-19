FROM node:12 as builder
ARG ENVIRONMENT
WORKDIR /app
RUN npm install -g @angular/cli
COPY package*.json ./
COPY .npmrc ./
RUN echo "//npm.pkg.github.com/:_authToken=2af1c0787ca115eac638a54dc2fb01826a64bb97" > ~/.npmrc
RUN npm i
COPY . ./
RUN node --max_old_space_size=4000 ./node_modules/@angular/cli/bin/ng build -c ${ENVIRONMENT}
# -------------------

FROM nginx:alpine
COPY --from=builder /app/nginx-custom.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/ui-kyrios/ .
