#!/bin/bash

### Change text "Kubesphere" by "Smartkube"

# Change from: KubeSphere, to: SmartKube (Case-Sensitive) in copyrights and server config file client title.
for i in $(grep -rI "KubeSphere" . --exclude={rebrand_mac.sh,README.md, README_3.0.md} --exclude-dir={node_modules} | cut -d ":" -f1 | sort -n | uniq); do sed -i.bu 's%KubeSphere%SmartKube%g' $i; done

# Change tfrom: smartkube, to: smartkube (Case-Sensitive) in the rest of the files
# for i in $(grep -rI "kubesphere" . --exclude={rebrand_mac.sh,README.md,CHANGELOG.md,CONTRIBUTING.md} --exclude-dir={docs,node_modules} | cut -d ":" -f1 | sort -n | uniq); do sed -i.bu 's%kubesphere%smartkube%g' $i; done

### Modify "About" KS_DESCRIPTION
sed -i.bu 's%SmartKube 是一款开源项目%SmartKube 平台基于一个开源项目 SmartKube%g' ./locales/zh/base.js
sed -i.bu 's%SmartKube 是一款開源項目%SmartKube 平台基于一个开源项目 SmartKube%g' ./locales/tc/base.js
sed -i.bu 's%SmartKube is an open source project aiming to provide%SmartKube Platform is based on an open source project called SmartKube that provides%g' ./locales/en/base.js
sed -i.bu 's%SmartKube es un proyecto de código abierto que tiene como objetivo%SmartKube está basado en un proyecto de código abierto llamado SmartKube que tiene como objetivo%g' ./locales/es/base.js

### Modify GitHub/Slack links with empty strings
sed -i.bu "s%issueUrl: https://github.com/kubesphere/kubesphere/issues/new/choose%issueUrl: https://geko.cloud/contact%g" ./server/config.yaml
sed -i.bu "s%reposUrl: https://github.com/kubesphere/kubesphere%reposUrl: ''%g" ./server/config.yaml
sed -i.bu "s%slackUrl: https://kubesphere.slack.com%slackUrl: ''%g" ./server/config.yaml
sed -i.bu "s%    url: https://v3-1.docs.kubesphere.io/docs%    url: ''%g" ./server/config.yaml
sed -i.bu "s%    api: https://v3-1.docs.kubesphere.io/docs/reference/api-docs/%    api: ''%g" ./server/config.yaml


# replace @kube-design/components for @juanchi_xd/components
for i in $(grep -r "@kube-design" . --exclude={rebrand_mac.sh} | cut -d ":" -f1 | sort -n | uniq); do sed -i.bu 's%@kube-design%@juanchi_xd%g' $i; done

# Delete Backup files created
find . -type f -name '*.bu' -delete