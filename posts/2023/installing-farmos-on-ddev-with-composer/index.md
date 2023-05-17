---
title: Installing farmOS on DDEV with Composer
date: 2023-05-17
author: rgcarr
slug: 2023/installing-farmos-on-ddev-with-composer
---

# DDEV
DDEV is a great way to build Drupal projects in a local environment:
* Cross-platform, open source software.
* Can be used with development for many other CMSs.
* Automatic HTTPS.
* Supports many versions of Docker or can be used with Colima.
* When combined with Colima and Mutagen, performance is significantly improved.
* Support multiple databases (including MySQL, Postgre, SQLite).
* Lots of developer tools included, and is easy to extend and integrate.  

Instructions on setting up DDEV are at https://ddev.readthedocs.io/en/latest/users/install/

# Recommended Method to Install farmOS
The recommended (and supported) method to install a farmOS local development environment (https://farmos.org/development/environment) is via a Docker container, but this may not work well with Colima.

There is also advice on installing farmOS using Composer: https://farmos.org/hosting/composer/

# Installing farmOS with DDEV and Composer
For certain local environments, installing farmOS by Composer may be more straightforward. The following commands would allow farmOS to be installed in a DDEV container:

```
mkdir farmos-ddev
cd farmos-ddev
ddev config --project-type=drupal9 --docroot=web --create-docroot --database=postgres:15 --php-version=8.1
ddev get wotnak/ddev-php-geos
ddev start
ddev composer create "farmos/project:2.x-dev"
ddev composer require drush/drush
ddev drush site:install --account-name=admin --account-pass=admin -y
ddev drush uli
ddev launch
```

# Additional Reference
More information on using DDEV with farmOS is available at https://github.com/paul121/farmos-ddev-template.

CLI commands for DDEV are listed at https://ddev.readthedocs.io/en/latest/users/usage/cli/
