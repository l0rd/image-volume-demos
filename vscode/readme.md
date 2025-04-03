# podman demo

## Build the game image

```bash
podman build -t pong-js .
```

## Pull the VS Code image

```
IMG="gitpod/openvscode-server:1.98.2"
podman pull "${IMG}"
```

## Run the game

```bash
podman run -d -p 8080:80 --name pong pong-js 
```

## Run the game with vscode

```bash
IMG="gitpod/openvscode-server:1.98.2"
MOUNT_DST="/vscode"
podman run -d -p 8080:80 -p 3000:3000 \
    --name pong \
    --mount=type=image,src="${IMG}",dst="${MOUNT_DST}" \
     pong-js 
```

## Run vscode

```bash
OPENVSCODE_SERVER_ROOT="/vscode/home/.openvscode-server"
${OPENVSCODE_SERVER_ROOT}/bin/openvscode-server \
    --host 0.0.0.0 \
    --without-connection-token \
    --accept-server-license-terms \
    --default-folder /usr/share/nginx/html/ \
    --disable-workspace-trust \
    --
```

And open http://localhost:3000/

## Cleanup

```bash
podman stop pong && podman rm pong
```