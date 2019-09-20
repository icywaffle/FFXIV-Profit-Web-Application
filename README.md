## Front-End of Marketboard Project

[ffxivprofit](http://ffxivprofit.com/)

THis is the front-end of the new containized application of the Marketboard Project.
This is built using Node.JS, and Create-React-App, and it's a single paged application that deals with searching for an item, and looking for the provided information about that item such as item recipes, materials, and profits.

This section is meant to be just one of the microservices that we can have, and to have the other microservices, we would just need to have the endpoint of our server of ffxivprofit.com to be the "load-balancer", and route people to the different pages as requested.
This would be a more primitive loadbalancer since it doesn't actually direct based off of traffic, and there's only one web server. But the load balancer could be built when scaling upwards.

## Motivation
Dockerizing an application makes it more modular, and we can update and change our different docker containers and add more microservices, without actually significantly impacting user experience.

## Tech Stack
<b>Built with</b>
- [NGINX](https://www.nginx.com/)
A web server that can be used to hold front-end applications easier, using a Docker Image.
- [Create-React-App](https://github.com/facebook/create-react-app)
A simple toolchain that allows you to easily build a single page front-end web application that allows you to jump right into React.
- [React.js](https://reactjs.org/)
A front-end web framework that utilizes JSX and Javascript that allows and easier way to create dynamic and responsive web pages.
- [Docker](https://www.docker.com/)
A containerization application that allows you to create simple microservices, so that you can easily scale your web applications.
- [UIKit](https://getuikit.com/)
A Front-End web framework that minimilistically styles the site.
- [XIVAPI](https://xivapi.com/)
A RESTful API endpoint that allows you to find information of items in an MMORPG, Final Fantasy XIV Online.

## Current Features
A search to be able to look for what items you want to craft.
A list of materials of that item you would like to craft, and a list of materials for those materials.

## Future Features
Total List of prices and materials that you need for crafting.
Save your searched items into the database so that you can compare which items may net you more profit
A cost of time in how much materials to actually gather.

## Structure
Since this is built using Create-React-App, it's basically a single paged application that calls for the backend server when you've chosen a specific item that you would want.

The file architecture starts with
`index.js`
`Search.js`
`searchcomponents`
where the index calls for the search function, or search component, and that component is made up of multiple smaller components, the search bar, the item information display etc.

## Testing
Testing is not yet implemented.

## How to use?
[ffxivprofit!](http://ffxivprofit.com/)

## Development
The whole front-end application requires Node.js to be installed. This is so that you can run the application by
`npm run`
However, there's no need to build first, this application.
The docker file will be in two stages, one to build the package for production in an alpine image containing Node.js, then the second part will be ran in nginx, which optimizes image size, and exposes the default http and https ports.

Now that we have multiple dockerfiles, in order to run them together and allow the containers to access themselves, in our docker-compose.yaml,

`

version: "3"

services: 

  Backend: 
  
    image: imagerepo:backendtag
    
    ports: 
    
      - "9000:9000"
      
  Frontend:
  
    image: imagerepo:frontendtag
    
    ports: 
    
      - "80:80"
      
      - "443:443"
      
`

The names of the containers should be as such, since it's dedicated inside the nginx.conf file.

`

upstream docker-backend {

		server Backend:9000;
		
	}
	
  ...
  
  location /recipe/ {
  
			proxy_pass http://docker-backend/recipe/;
			
   ...
   
`

This clever upstream allows us to redirect to an HTTP backend RESTful server, behind the HTTPS NGINX web server.

## License
MIT © [2019] (Jacob Nguyen)

