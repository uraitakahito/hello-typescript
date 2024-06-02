# Debian 12
FROM node:22.2.0-bookworm

# Default UID and GID on MacOS
ARG user_id=501
ARG group_id=20

ARG user_name=developer
# The WORKDIR instruction can resolve environment variables previously set using ENV.
# You can only use environment variables explicitly set in the Dockerfile.
# https://docs.docker.com/engine/reference/builder/#/workdir
ARG home=/home/${user_name}

RUN apt-get update -qq && \
  apt-get upgrade -y -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
    ca-certificates \
    git

#
# Add user.
#
#   Someone uses devcontainer, but the others don't.
#   That is why dockerfile calls `features` MANUALLY here without devcontainer.json.
#
RUN cd /usr/src && \
  git clone --depth 1 https://github.com/devcontainers/features.git && \
  USERNAME=${user_name} \
  UID=${user_id} \
  GID=${group_id} \
  CONFIGUREZSHASDEFAULTSHELL=true \
    /usr/src/features/src/common-utils/install.sh

#
# Install packages
#
RUN apt-get update -qq && \
  apt-get upgrade -y -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
    # Basic
    iputils-ping \
    # Editor
    vim emacs \
    # Utility
    tmux \
    # fzf needs PAGER(less or something)
    fzf \
    exa \
    trash-cli && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY bin/docker-entrypoint.sh /usr/local/bin/
COPY zshrc-entrypoint-init.d /etc/zshrc-entrypoint-init.d

#
# TypeScript
#
ARG NODE_MODULES="eslint tslint-to-eslint-config typescript ts-node"
RUN npm install -g ${NODE_MODULES} && \
  npm cache clean --force > /dev/null 2>&1

#
# Develop Visual Studio Code extension
# https://code.visualstudio.com/api/get-started/your-first-extension
#
RUN npm install -g yo generator-code && \
  npm cache clean --force > /dev/null 2>&1

USER ${user_name}
WORKDIR /home/${user_name}

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["tail", "-F", "/dev/null"]
