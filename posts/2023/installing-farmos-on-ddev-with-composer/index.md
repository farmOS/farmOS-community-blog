
# DDEV
DDEV is a great way to build Drupal (and other PHP-based) projects in a local environment; when combined with Colima and Mutagen, not only is the requirement for Docker desktop removed, but performance can be impressively fast. Instructions on setting up DDEV are at https://ddev.readthedocs.io/en/latest/users/install/

# Recommended Method to Install farmOS
The recommended (and supported) method to install a farmOS local development environment (https://farmos.org/development/environment) is via a Docker container, but this may not work well with Colima.

# Installing farmOS with DDEV and Composer
For certain local environments, installing farmOS by Composer may be more straightforward. The following commands would allow farmOS to be installed in a DDEV container:

```
mkdir farmos-ddev
cd farmos-ddev
ddev config --project-type=drupal9 --docroot=web --create-docroot
ddev start
ddev composer create "farmos/project:2.x-dev"
ddev composer require drush/drush
ddev drush site:install --account-name=admin --account-pass=admin -y
ddev drush uli
ddev launch
```
