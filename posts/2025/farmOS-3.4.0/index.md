---
title: farmOS 3.4.0
date: 2025-02-24
author: Michael Stenta
slug: 2025/farmOS-3.4.0
categories:
  - newsletter
---

# farmOS 3.4.0

We are excited to announce the release of
[farmOS 3.4.0](https://github.com/farmOS/farmOS/releases/tag/3.4.0)!
This release includes a number of new features and improvements. Here are some
of the highlights.

**Note: farmOS 3.4.1 was released shortly after 3.4.0 with some Drupal core
security fixes. If you are upgrading from an earlier version of farmOS, please
use [3.4.1](https://github.com/farmOS/farmOS/releases/tag/3.4.1) instead.**

## Equipment types

Equipment assets can now be categorized by type. A new "Equipment type"
taxonomy has been added, which allows each farm to build their own vocabulary
of types (eg: "Tractor", "Combine", "Hand tool", etc.). Equipment assets can
be assigned to one or more types, which can be used to filter lists and
queries.

## CSV import/export improvements

A number of small improvements have been made to CSV import/export features,
including:

- Geometry is now included in asset and log CSV exports, formatted as KML.
- Group assignment fields (`group` and `is_group_assignment`) can now be
  populated by the default log CSV importers, allowing group assignment logs to
  be imported.
- Generic boolean field support was added to default CSV importers, allowing
  module-defined base and bundle field columns to be included automatically.
- For module developers, two new hooks were added that allow base fields to be
  automatically included in default CSV importers (as well as default Views).
  For more information, see:
  https://farmos.org/development/module/fields/#views-and-csv-importers

---

Those are only the highlights of the 3.4.0 release. To see the full list of
new features, bug fixes, and other changes, refer to the
[3.4.0 release notes](https://github.com/farmOS/farmOS/blob/3.4.0/CHANGELOG.md).
