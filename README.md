## Set up

 - install - `npm i`
 - develop - `npm start`
 - build - `npm run build`


---

Docker set up (by a Docker newbie, we could use some suggestions for refinement if you're a docker pro).

1. Build the container: `docker build -t react-app .` 
2. Start the container: `docker run -p 80:80 --name nginx_server react-app`
3. Check it's running: `docker ps -a`
4. Have a peek inside: `docker exec -it nginx_server pwd`

Docker tear down
1. Stop the container: `docker stop nginx_server`
2. Remove everything (containers and images): `docker system prune -a`

A note if you're developing on windows home edition (which means you'll need docker toolbox which runs it through Oracle's Virtualbox). The port forwarding from the docker container comes out to the virtualbox VM, not your local. So you'll have to set up port forwarding from the VM too. Open the virtualbox control panel, go to settings (top left) -> network (in the sidebar) -> advanced (drop down) -> port forwarding. This should open a table with one row showing ssh. Click the plus, I called mine web, Host port to 80, guest port to 80. Save out and go to your http://localhost/.