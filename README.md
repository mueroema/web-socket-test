# web-socket-test
Docker-image for WebSocket connectivity test.

## How to
### Build container
```bash
$ buildah bud -t muellma-openshift-image-registry.apps.ocp4.muellma.de/websocket-server:latest .
```


### Start container
```bash
$ podman run -p 8080:8080 --name web-socket-test muellma-openshift-image-registry.apps.ocp4.muellma.de/websocket-server
```

### Connect to container with WebSocket
```bash
$ npm install wscat
$ wscat --connect ws://$(CONTAINER_HOST_IP_ADDRESS):8080

connected (press CTRL+C to quit)
> Hello world

< Server received from client: Hello world
>
```

### 
