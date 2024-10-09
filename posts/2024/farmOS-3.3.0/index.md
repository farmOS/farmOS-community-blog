---
title: farmOS 3.3.0
date: 2024-09-24
author: Michael Stenta
slug: 2024/farmOS-3.3.0
categories:
  - newsletter
---

# farmOS 3.3.0

We are excited to announce the release of
[farmOS 3.3.0](https://github.com/farmOS/farmOS/releases/tag/3.3.0)!
This release includes a number of new features and improvements. Here are some
of the highlights.

**Note: farmOS 3.3.1 was released shortly after 3.3.0 with a fix for an upgrade
bug. If you are upgrading from an earlier version of farmOS, please use
[3.3.1](https://github.com/farmOS/farmOS/releases/tag/3.3.1) instead.**

## Geometry/location CSV importer columns

Some new columns are available in the standard asset and log CSV importer
templates for importing geometry and location information. Log importers now
include `geometry` and `is movement` columns. This allows Well-Known Text (WKT)
geometries to be imported with logs, and imported logs can be designated as
"movements", to change the location/geometry of other assets. Asset importers
now include `intrinsic geometry`, `is location`, and `is fixed` columns. This
allows CSV imports to be used for initial farm mapping, which wasn't possible
before.

## Quantity CSV export improvements

[farmOS 3.1.0](https://github.com/farmOS/farmOS/releases/tag/3.1.0) made some
improvements to asset and log CSV exporters, and this release extends those
same changes to quantity exports. The quantity CSVs contain more data than they
did before, and it is possible to choose which columns to include in the
export.

It is also now possible to export quantities from lists of logs. Logs are
displayed in more places than quantities and provide different filtering
options, and now a new "Export Quantity CSV" option is available on all log
lists. This will export a CSV of all quantities that are associated with the
selected logs.

## Timeline library

This release of farmOS includes a new experimental timeline rendering library
that we have begun leveraging in the
[Crop Planning](https://drupal.org/project/farm_crop_plan) and
[Grazing Planning](https://drupal.org/project/farm_grazing_plan) modules. These
modules (and others) can now use the new shared library for
rendering timeline gantt visualizations. In the future, we hope to use the
library in additional farmOS core UIs as well.

This library is being developed and maintained as a standalone project called
[farmOS-timeline](https://github.com/farmOS/farmOS-timeline), similar to the
existing [farmOS-map](https://github.com/farmOS/farmOS-map) library. Special
thanks to the maintainers of
[svelte-gantt](https://github.com/ANovokmet/svelte-gantt), which we used as
the basis for farmOS-timeline.

## Official ARM Docker Images

We are now building official ARM32v7 and ARM64v8 Docker images and pushing them
to the [farmOS Docker Hub repository](https://hub.docker.com/r/farmos/farmos).
This means that it's easier to run farmOS in Docker on newer Raspberry Pi and
Apple M-series processors. Previously, you would need to clone the farmOS Git
repository and run `docker build` locally, but now you can just run
`docker pull farmos/farmos:3.3.0` to download the official image.

---

Those are only the highlights of the 3.3.0 release. To see the full list of
new features, bug fixes, and other changes, refer to the
[3.3.0 release notes](https://github.com/farmOS/farmOS/blob/3.3.0/CHANGELOG.md).
