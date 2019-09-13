## Front-End for Dockerization
This is the front-end microservice that should be almost readily available to be dockerized by building the whole package into a single binary, and then deploying it and building the docker image from this binary.

To make this a bit more simple, since we use the Revel Framework, we can just use `GOOS=linux GOARCH=amd64 revel build appname`.

## The Dockerfile
We're running on alpine linux to keep the image as small as possible.
We could also not use `RUN apk add --no-cache bash` the bash install, and can try just `ENDPOINT ["/go/src/frontendbin/run.sh"]` but it might spit out an error, and we'd have to test that later on.

We basically copy our frontendbin, which is our built binary, to the folder that we've created. Then we basically set all the read and write permissions to 777 which allows our bash file `run.sh` to successfully run the whole revel application.

## Motivation
Most modern web development use containerization of their microservices so that they can push updates and work on one specific container without interrupting any flow to the other containers, being nearly independent of each other. We don't have to bring our whole server down just to update a single service, rather we can just bring down a specific page to start rolling updates.

## Tech/framework used
<b>Built with</b>
- [Golang](https://golang.org/)
A simplified programming language, that is great for web development,
and also has very clean syntax.
- [MongoDB](https://www.mongodb.com/)
A No-SQL Database, since there are certain items that do not follow
a strict Schema.
- [Revel](https://revel.github.io/)
A Full-Stack web framework to run the entire project.
- [UIKit](https://getuikit.com/)
A Front-End web framework that minimilistically styles the site.
- [Docker](https://www.docker.com/)
A containerization platform that allows you to build microservices and isolate different sections of the web application.

<b>Additional Dependencies</b>
- [MongoDB-Go-Driver](https://github.com/mongodb/mongo-go-driver)
A MongoDB Driver that allows an easier way to access the mongodb.
- [SaintCoinach](https://github.com/ufx/SaintCoinach)
Extracts game assets from Final Fantasy XIV, i.e. Item Icons.

## Structure
This frontend application should be the second thing that users will hit when accessing a website. This is because we should have a front server that redirects a user to this container. This allows us to store a user's session, and share those sessions across containers. If we happen to hit this application first, we wouldn't be able to consistently store a session across different microservices.

## Testing

Tests can be accessed by going into /@tests in the browser.

Tests can be built by the `marketboard/tests` folder.

## API Reference
- [XIVAPI] (https://xivapi.com/)

## How to use?
For this section, we would have to build the revel application

`GOOS=linux GOARCH=amd64 revel build marketboard-frontend outputname`

Then we would have to build the docker image, assuming you've built the dockerfile inside the application (which is included).

`docker build -t containername .`

## License
MIT © [2019] (Jacob Nguyen)
