---
title: Installing farmOS on DDEV with Composer
date: 2023-05-17
author: rgcarr
slug: 2023/installing-farmos-on-ddev-with-composer
---

# DDEV

The recommended method to install farmOS in a local development environment
using Docker and Docker Compose is documented
[here](https://farmos.org/development/environment). This method works great in
supported environments for developing farmOS core and small projects but can
require additional configuration when working on larger projects in different
environments like Colima. For these use-cases installing farmOS in a
[DDEV](https://ddev.com/) environment may be more straightforward.

> DDEV is an open source tool for running local web development environments for PHP, Python and Node.js, ready in minutes. Its powerful, flexible per-project environment configurations can be extended, version controlled, and shared. DDEV allows development teams to adopt a consistent Docker workflow without the complexities of bespoke configuration.

DDEV's many features are what make it a great way to build Drupal and farmOS
projects in a local environment:

* Cross-platform, open source software.
* Supports many versions of Docker or can be used with Colima.
* When combined with Colima and Mutagen, performance is significantly improved.
* Automatic HTTPS.
* Run multiple projects concurrently.
* Can be used to develop many other CMSs.
* Support multiple databases (including MySQL, Postgre, SQLite).
* Lots of developer tools included, and is easy to extend and integrate.  

# Installing farmOS with DDEV and Composer

- First, follow the instructions to install and setup DDEV: https://ddev.readthedocs.io/en/latest/users/install/
- Once installed, the following commands will create a DDEV project and install farmOS:

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
