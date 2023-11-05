---
title: Installing farmOS on DDEV with Composer
date: 2023-11-05
author: rgcarr, Paul Weidner
slug: 2023/installing-farmos-on-ddev-with-composer
---

# DDEV

For the recommended farmOS local development environment using Docker and Docker Compose, see the 
[farmOS development environment docs](https://farmos.org/development/environment). That method works great in
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
* Support multiple databases (including MySQL, PostgreSQL, SQLite).
* Lots of developer tools included, and is easy to extend and integrate.  

# Installing farmOS with DDEV and Composer

- First, follow the instructions to install and setup DDEV: https://ddev.readthedocs.io/en/latest/users/install/
- Once installed you can create a DDEV project and install farmOS. Your DDEV project is configured to use a specific PHP and database version and can include additional DDEV addons and services. Here are two examples of how to create and configure your DDEV project:

1. Use the `wotnak/ddev-farmos` addon to configure a DDEV project with the latest recommended versions of PHP, PostgreSQL and PHP GEOS for farmOS. This addon will also configure the private filesystem and a Cron job for Drupal.
```
# Create a directory for the farmOS DDEV project
mkdir farmos-project && cd farmos-project
ddev config --project-type=php
ddev get wotnak/ddev-farmos
ddev composer create farmos/project:3.x-dev
ddev drush site:install farm --account-name=admin --account-pass=admin -y
ddev drush uli
```

2. If you prefer, you can also configure each aspect of the DDEV project yourself:
```
# Create a directory for the farmOS DDEV project
mkdir farmos-project && cd farmos-project
ddev config --project-type=drupal10 --docroot=web --create-docroot --database=postgres:15 --php-version=8.2
ddev get wotnak/ddev-php-geos
ddev start
ddev composer create "farmos/project:3.x-dev"
ddev drush site:install farm --account-name=admin --account-pass=admin -y
ddev drush uli
```

## Usage

### Useful DDEV commands:
- Start/stop a project: `ddev start`/ `ddev stop`
- Open project: `ddev launch`
- Stop DDEV: `ddev poweroff`
- PHP CLI: `ddev php`
- Additional DDEV commands: https://ddev.readthedocs.io/en/latest/users/usage/cli/

### Drush
- Drush commands: `ddev drush {drush command}`
- Login link: `ddev drush uli`
- CRON: `ddev drush cron`
- Additional Drush commands: https://www.drush.org/latest/commands/all/

### Composer:
- Add dependency (exmple `farm_organic`): `ddev composer require drupal/farm_organic`
- Updating dependencies: `ddev composer update`
- See farmOS documentation on using Composer: https://farmos.org/hosting/composer/

# Going to production

It should be noted that DDEV _is not_ designed to be used as a production
hosting environment. DDEV is designed to make managing a local development
environment easier. Taking a local environment to production depends entirely
on how that production environment is built. Most composer-based workflows
will expect the project's `composer.json`, `composer.lock` and any application
code be checked in to source control, from which the production environment
can be built. For more information on hosting farmOS see:
- [Installing farmOS](https://farmos.org/hosting/install/)
- [Building farmOS with Composer](https://farmos.org/hosting/composer/)

Another strategy that might be worth experimenting with is DDEV's hosting
provider integrations. These can be customized for different workflows to sync
data between a production and the local environment. For more information see
[Hosting Provider Integration](https://ddev.readthedocs.io/en/stable/users/providers/).

# Docker image limitations

farmOS uses Docker and Docker Compose to create and distribute reproducible
development environments. Each commit to
farmOS builds a new Docker image that includes the environment and development
dependencies required to install, test, and lint the core codebase. While this
process works well to onboard many new contributors and developers of
farmOS, it also produces some headaches.

Docker can be unintuitive to install and configure on non-linux systems. Long-existing platform issues
such as slow file systems in macOS and WSL2 complexities in Windows frequently present challenges for
new farmOS admins and developers.

Another issue with development and production environments based on the official
farmOS Docker images is that many use-cases quickly outgrow the default set of modules
and site configuration. In some cases, one can work around that with a deep understanding
of Docker and/or Docker Compose, but such environments can be fragile to updates and
more challenging to document, share, and recreate in a team context.

DDEV offers a refreshing experience for local development of farmOS in Docker - consider trying it out!