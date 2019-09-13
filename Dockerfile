# Uses one of the debian images for docker.
FROM alpine:latest

# Make sure you build the package using GOOS=linux GOARCH=amd64
RUN mkdir -p /go/src/frontendbin
# Bash for now so we can execute the run.sh
RUN apk add --no-cache bash
# Copy our built package from revel build package, and put it in our folder spot
COPY frontendbin /go/src/frontendbin

# We need to set all new files to the rW permissions
RUN chmod -vR 777 /go/src/frontendbin

CMD ["bash", "/go/src/frontendbin/run.sh"]
# Document that the service listens on port 8080.
EXPOSE 9000