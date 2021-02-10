# Smartkube Console

Este repositorio es una copia del repo console de kubesphere (https://github.com/kubesphere/console/). El objetivo de esta copia es realizar el cambio de look & feel de la consola.

## Setup para levantar el entorno de dev

### Requisitos

Debes tener instalados los siguientes paquetes:

- docker
- docker-compose

### Conectando con un backend remoto

Para poder configurar la consola local para atacar contra un clúster backend necesitamos parchear en el clúster el ks-apiserver:

> En Smartkube el puerto a usar es el 30882. Para una instalación estándar de Smartkube usaremos el 30881

```
kubectl -n kubesphere-system patch svc ks-apiserver -p '{"spec":{"type":"NodePort","ports":[{"name":"ks-apiserver","port":80,"protocal":"TCP","targetPort":9090,"nodePort":30882}]}}'
```

A continuación tenemos que poner la IP y puerto del ks-apiserver donde atacaremos en el fichero server/local_config.yaml:

```
server:
  apiServer:
    url: http://<IP_WORKER>:30882
    wsUrl: ws://<IP_WORKER>:30882
```

### Levantar entorno de desarrollo:

Hemos creado un script para levantarlo cómodamente:

```yaml
./start-dev.sh
```

Podremos acceder al entorno de dev en http://localhost:8000. Una vez levantada la consola podremos hacer cambios "en vivo", es decir, que simplemente guardando los ficheros que modifiquemos hará un reload automático (compilando lo necesario) y veremos los cambios realizados.

### Build del container para producción

Podemos hacer el build y el tag automático con este script:

> NOTA: Ten en cuenta que cuando hagas push machacarás la imagen actual

```yaml
./build-prod.sh
```

## Manual para sustituir estética Smartkube a Smartkube

### Cambiar texto "Smartkube" por "Smartkube"

```yaml
for i in $(grep -ri "kubesphere" . | cut -d ":" -f1 | sort -n | uniq | grep -v Dockerfile); do sed -i 's%Smartkube%Smartkube%g' $i; done
for i in $(grep -ri "kubesphere" . | cut -d ":" -f1 | sort -n | uniq | grep -v Dockerfile); do sed -i 's%Smartkube%Smartkube%g' $i; done
```

### Cambiar colores - Usamos el flag I al final del sed para que sea case-insensitive

```yaml
for i in $(grep -ri "#3563ad" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563ad%#3563ad%gI' $i; done
```

Aquí tenemos un listado completo con los comandos para reemplazar los colores de forma masiva:

> WARN: Puede ser que alguno de los siguientes comandos no estén bien

```yaml
for i in $(grep -ri "#3563ad" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563AD%#3563AD%gI' $i; done
for i in $(grep -ri "#3563AD" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563AD%#3563AD%gI' $i; done
for i in $(grep -ri "#3563ad" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563ad%#3563ad%gI' $i; done
for i in $(grep -ri "#F18918" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F18918%#F18918%gI' $i; done
for i in $(grep -ri "#3563ad" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563ad%#3563AD%gI' $i; done
for i in $(grep -ri "#3563AD" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#3563AD%#3563AD%gI' $i; done
for i in $(grep -ri "#F18918" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F18918%#F18918%gI' $i; don
for i in $(grep -ri "#C0690C" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#C0690C%#C0690C%gI' $i; done
for i in $(grep -ri "#F9CE9F" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F9CE9F%#F9CE9F%gI' $i; done
for i in $(grep -ri "#F9CE9F" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F9CE9F%#F9CE9F%gI' $i; done
# for i in $(grep -ri "#F9CE9F" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F9CE9F%#FDF3E7%gI' $i; done
for i in $(grep -ri "#F18918" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F18918%#F18918%gI' $i; done
for i in $(grep -ri "#C0690C" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#C0690C%#C0690C%gI' $i; done
for i in $(grep -ri "#F9CE9F" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%#F9CE9F%#F9CE9F%gI' $i; done
```

### Cambiar ruta al logo

```yaml
for i in $(grep -ri "/assets/smartkube_logo.png" . | cut -d ":" -f1 | uniq | sort -n); do sed -i 's%/assets/smartkube_logo.png%/assets/smartkube_logo.png%g' $i; done
sed -i 's%assets/login-logo.svg%assets/smartkube_logo.png%g' ./src/components/Layout/Header/index.jsx
sed -i 's%/assets/kubesphere.svg%/assets/smartkube_logo_horizontal.png%g' ./src/pages/clusters/containers/ServiceComponents/index.jsx
```

### Modificar color subtítulos (texto debajo de titles)

```yaml
sed -i 's%#79879c%#4f7ec9%gI' ./src/scss/variables.scss
```

### Modificar icono "Healthy" (con los cambios previos saldría naranja)

Añadir nueva línea en ./src/scss/variables.scss:

```yaml
$green-color06: #07d600;
```

### Modificar colores mayoría iconos

Los iconos heredan de la dependencia "lego", por lo que no hay ningún lugar en el código donde esté especificado.

Añadir nuevo bloque en: ./src/scss/lego.custom.scss

```yaml
.qicon-dark {
  color: #3563ad;
  fill: #8aa9db;
}
```

### Modificar texto "About"

```yaml
sed -i 's%Smartkube 是一款开源项目%Smartkube平台基于一个开源项目 Smartkube%g' ./src/locales/zh/base.js
sed -i 's%Smartkube 是一款开源项目%Smartkube平台基于一个开源项目 Smartkube%g' ./src/locales/tc/base.js
sed -i 's%Smartkube is an open source project aiming to provide %Smartkube Platform is based on an open source project called Smartkube that provide %g' ./src/locales/en/base.js
sed -i 's%Smartkube es un proyecto de código abierto que tiene como objetivo %Smartkube está basado en un proyecto de código abierto llamado Smartkube que tiene como objetivo %g' ./src/locales/es/base.js
```

### Modificar enlaces sección "About"

Aunque quitaremos los bloques, también dejaremos los enlaces en blanco por si acaso:

```yaml
sed -i 's%issueUrl: https://github.com/kubesphere/kubesphere/issues/new/choose%issueUrl: https://geko.cloud/contact%g' ./server/config.yaml
sed -i 's%reposUrl: https://github.com/kubesphere/kubesphere%reposUrl: ""%g' ./server/config.yaml
sed -i 's%reposUrl: https://github.com/kubesphere/kubesphere%reposUrl: ""%g' ./server/config.yaml
sed -i 's%slackUrl: https://kubesphere.slack.com%slackUrl: ""%g' ./server/config.yaml
sed -i 's%    url: https://v3-0.docs.kubesphere.io/docs%    url: ""%g' ./server/config.yaml
sed -i 's%    api: https://v3-0.docs.kubesphere.io/docs/api-reference/api-docs/%    api: ""%g' ./server/config.yaml
```

Para quitar los bloques tendremos que editar a mano este fichero: ./src/components/Modals/About/index.jsx. Busca y comenta estos bloques:

```yaml
    <div className={styles.describtion}>
        <div>
        <img src="/assets/smartkube_logo.png" alt="" />
        </div>
        <p>{t("KS_DESCRIPTION")}</p>
        <strong>
        Smartkube {t("Version")} : {version.kubesphere}
        </strong>
    </div>

    <div className={styles.links}>
        <div className={styles.left}>
        {/* <span>
            <a href={reposUrl} target="_blank">
            <img src="/assets/github.svg" alt="github" />
            <strong>{t('REPS_ADDRESS')}</strong>
            </a>
        </span> */}
        <span>
            <a href={issueUrl} target="_blank">
            <img src="/assets/bug.svg" alt="bug" />
            <strong>{t("ISSUE_FEEDBACK")}</strong>
            </a>
        </span>
        </div>
        <div className={styles.right}>
        {/* <span>
            <a href={slackUrl} target="_blank">
            <img src="/assets/slack.svg" alt="slack" />
            <strong>{t("PART_IN_DISCUSSION")}</strong>
            </a>
        </span>
        <span>
            <a href={reposUrl} target="_blank">
            <img src="/assets/blue-theme-git.svg" alt="git" />
            <strong>{t("CODE_CONTRIBUTE")}</strong>
            </a>
        </span>
        <span>
            <a href={reposUrl} target="_blank">
            <img src="/assets/star.svg" alt="star" />
            <strong>{t("GITHUB_STAR")}</strong>
            </a>
        </span> */}
        </div>
    </div>
```

### Modificar tamaño logo en:

- Pantalla login: ./server/public/login.css -> Cambiar a 150px x 85px (clase .logo img) + cambiar top: 80px a top: 50px (clase .logo)
- Header: ./src/components/Layout/Header/index.scss -> Cambiar a 115px x 70px (clase .logo)
- Platform info: ./src/pages/settings/containers/BaseInfo/index.scss -> Cambiar a 150px x 85px
- About screen: ./src/components/Modals/About/index.scss -> Cambiar a 150px x 85px

## Referencia de colores

### Smartkube colors

#### Iconos Dashboard principal

```yaml
color: #3563ad;
```

#### Iconos settings (clusters management, access control, etc)

```yaml
color: #3563AD;
```

#### Workspace texto menú izquierda

```yaml
color: #F18918;
```

#### Workspace iconos menú izquierda

```yaml
color: #C0690C; (verde oscuro)
fill: #F9CE9F; (verde claro)
```

#### Pantalla overview (fondo icono derecha verde claro)

```yaml
color: #F9CE9F;
```

#### Iconos pequeños svg

```yaml
color: #C0690C; (dark gray)
fill: #F9CE9F; (soft gray)
```

#### Menú flotante (click en platform)

NO SÉ EXACTAMENTE QUÉ ES ESTE VERDE: #369a6a

#### Menú flotante background selected (click en platform)

```yaml
color: #F18918;
```

### Smartkube colors

```yaml
color: #3563AD;  # Blau
fill: #F18918:  # Taronja
```

Colors secundaris:

```yaml
color: #1e3862;  # Blau fosc
color: #4f7ec9;  # Blau clar
color: #8aa9db;  # Blau més clar
```

#### Iconos settings (clusters management, access control, etc)

```yaml
color: #3563AD;
```

#### Workspace texto menú izquierda

```yaml
color: #F18918;
```

#### Workspace iconos menú izquierda

```yaml
color: #C0690C; (naranja oscuro)
fill: #F9CE9F; (naranja claro)
```

#### Pantalla overview (fondo icono derecha)

```yaml
color: #F9CE9F;
```

#### Menú flotante background selected (click en platform)

```yaml
color: #3563AD;
```

#### Iconos pequeños svg

```yaml
color: #C0690C; (dark gray)
fill: #F9CE9F; (soft gray)
```

### Geko Cloud colors (release 2.1)

#### Iconos dashboard principal

```yaml
color: #3563ad;
fill: #F18918;
```

## Build project

Para hacer el build es recomendable usar el [entorno de desarrollo con docker](/docs/development-with-docker.md).

---

# ORIGINAL README

## Smartkube Console

![](https://github.com/kubesphere/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Smartkube Console is the web-based UI for [Smartkube](https://github.com/kubesphere/kubesphere) clusters.

![Smartkube Console](docs/images/dashboard-ui.png)

## Getting Started

A Smartkube cluster is required before getting started.

Read [Installation](https://github.com/kubesphere/kubesphere#installation) guide to install a cluster.

Read [the guide](https://github.com/kubesphere/kubesphere#to-start-using-kubesphere) to start using Smartkube.

Features Map:

![Features Map](docs/images/module-map.jpg)

## Developer Guide

### Preparation

Make sure the following software is installed and added to the \$PATH variable:

- A Smartkube cluster ([Installation](https://github.com/kubesphere/kubesphere#installation))
- Node.js 8+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.19.1+

Install yarn with npm:

```sh
npm install -g yarn
```

Fork the repository, then clone your repository and install the dependencies:

```sh
yarn
```

Note: If you are in China Mainland, execute the following command before running the command above for faster installation.

```sh
yarn config set registry https://registry.npm.taobao.org
```

Alternatively you can start development using docker. See [Development with Docker](/docs/development-with-docker.md).

### Access the backend services of Smartkube

Follow [the guide](/docs/access-backend.md) to configure the backend services.

### Start Smartkube Console for development

```sh
yarn lego
yarn start
```

Now, you can access http://localhost:8000 to view the console using the default account admin / P@88w0rd.

### Run tests

```sh
yarn test
```

### Build Smartkube Console for production

The project can be built for production by using the following task:

```sh
yarn build
```

To build and serve from dist, using the following task:

```sh
yarn serve
```

To build Smartkube console to an image, run the following task after `yarn build`:

```sh
docker build -t ks-console .
```

Test Smartkube console image by run:

```sh
./docker-run
```

## Development Workflow

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Support, Discussion, and Community

If you need any help with Smartkube, please join us at [Slack Channel](https://join.slack.com/t/kubesphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE).

Please submit any Smartkube Console bugs, issues, and feature requests to [Smartkube Console GitHub Issue](https://github.com/kubesphere/console/issues).

## Contributing to the project

Welcome to contribute to Smartkube Console, see [Contributing Guide](docs/contributing-guide.md).
