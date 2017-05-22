## Set up

_Note - currently working out the docker set up, watch this space!_

 - install - `npm i`
 - develop - `npm start`
 - build - `npm run build`

---

With docker installed just run `docker-compose up` (currently it's just the production server set up, no dev overrides yet)

Stop it: `Ctrl + c`

`npm run watch` will build files as you save, the dist folder is mapped to the docker container, so you can refresh there & see the update!

A note if you're developing on windows home edition (which means you'll need docker toolbox which runs it through Oracle's Virtualbox). The port forwarding from the docker container comes out to the virtualbox VM, not your local. So you'll have to set up port forwarding from the VM too. Open the virtualbox control panel, go to settings (top left) -> network (in the sidebar) -> advanced (drop down) -> port forwarding. This should open a table with one row showing ssh. Click the plus, I called mine web, Host port to 80, guest port to 80. Save out and go to your http://localhost/.

---

Deploying

1. Create a server (virtual server) that has docker installed. This is similar to your local computer once you have installed docker. We will still need to set up the project, but lets get the server environment up:
`docker-machine create --driver digitalocean --digitalocean-access-token BIG-API-KEY nginxtest`

Now double check what machines you have: `docker-machine ls`

If the one you want to interact with is not marked as active, use this to select one:
`docker-machine env nginxtest`
`eval $(docker-machine env nginxtest)`

Now we need to copy the app's working files into that machine. (this will let the volumes setting on the docker-compose.yml work)
`docker-machine scp -r ./dist nginxtest:/dist`
`docker-machine scp -r ./nginx nginxtest:/nginx`

Ok - now the remote server is set up like your local (but without the source code).

run `docker-compose up` Tada! The IP you can see in the table that was printed by `docker-machine ls`. The app is live!

Some more handy commands:

`docker-machine start machine-name`
`docker-machine ls`
`docker-machine stop machine-name`
`docker-machine rm machine-name`

SSH into the dockerised host
`docker-machine ssh machine-name`

Quit the SSH session
`exit`