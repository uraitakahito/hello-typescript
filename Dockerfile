# Debian 12
FROM node:22.9.0-bookworm

ARG user_name=developer
ARG user_id
ARG group_id
ARG dotfiles_repository="https://github.com/uraitakahito/dotfiles.git"
ARG features_repository="https://github.com/uraitakahito/features.git"
ARG extra_utils_repository="https://github.com/uraitakahito/extra-utils.git"

COPY docker-entrypoint.sh /usr/local/bin/

#
# Add user and install common utils.
#
RUN cd /usr/src && \
  git clone --depth 1 ${features_repository} && \
  USERNAME=${user_name} \
  USERUID=${user_id} \
  USERGID=${group_id} \
  CONFIGUREZSHASDEFAULTSHELL=true \
  UPGRADEPACKAGES=false \
    /usr/src/features/src/common-utils/install.sh

#
# Install extra utils.
#
RUN cd /usr/src && \
  git clone --depth 1 ${extra_utils_repository} && \
  ADDEZA=true \
  UPGRADEPACKAGES=false \
    /usr/src/extra-utils/install.sh

USER ${user_name}

#
# dotfiles
#
RUN cd /home/${user_name} && \
  git clone --depth 1 ${dotfiles_repository} && \
  dotfiles/install.sh

WORKDIR /app
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["tail", "-F", "/dev/null"]
