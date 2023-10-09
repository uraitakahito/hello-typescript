# Debian 12.1
FROM node:20.8-bookworm

# Default UID and GID on MacOS
ARG user_id=501
ARG group_id=20

ARG user_name=developer
# The WORKDIR instruction can resolve environment variables previously set using ENV.
# You can only use environment variables explicitly set in the Dockerfile.
# https://docs.docker.com/engine/reference/builder/#/workdir
ARG home=/home/${user_name}
# ARG ruby_version=3.1.4

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y --no-install-recommends \
    # Basic
    less \
    sudo \
    procps \
    zsh \
    sed \
    curl \
    ca-certificates \
    iputils-ping \
    net-tools \
    git \
    gnupg2 \
    # Editor
    vim \
    emacs
RUN apt-get install -y --no-install-recommends \
  tmux \
  # fzf needs PAGER(less or something)
  fzf \
  exa \
  trash-cli

COPY bin/* /usr/local/bin/
RUN /usr/local/bin/set-superuser-and-group.sh ${group_id} ${user_id} ${user_name}

RUN chown -R ${user_id}:${group_id} ${home}

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
