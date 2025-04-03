# kind demo

## Build the kind node image

Outdated instructions [are here](https://github.com/cri-o/cri-o/blob/main/tutorials/crio-in-kind.md#cri-o-in-kind).
TODO: Write the up to date instructions (and submit a PR to fix the crio tutorial), in the meantime we will use
`quay.io/mloriedo/kindnodecrio:v1.32`

## Configure Podman

To run Kind, Podman should run in rootful mode:

```bash
podman machine stop
podman machine set --rootful
podman machine start
```

## Configure kind

We will use the file `kind-config.yaml` to patch kubeadmin config to use CRI-o and
to enable the Kubernetes v1.32 alpha feature `ImageVolume`.

## Start the Kind cluster

```bash
KIND_EXPERIMENTAL_PROVIDER=podman
IMG="quay.io/mloriedo/kindnodecrio:v1.32"
CFG="./kind-config.yaml"
kind create cluster --image "${IMG}" --config "${CFG}"
```

Using minikube instead:
```bash
minikube start --container-runtime=cri-o --feature-gates=ImageVolume=true --kubernetes-version=v1.32.2 --driver=podman
```

## Start the Pod

```bash
kubectl apply -f pod.yaml && \
kubectl wait --for=condition=ready --timeout=20s pod/smollm-service && \
kubectl exec imgvol -- ls /volume/
```

## Clean Up

```bash
kubectl delete pod imgvol
kind delete cluster
```
