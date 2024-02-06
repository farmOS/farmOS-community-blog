---
title: farmOS 3.0.0
date: 2024-01-15
author: Michael Stenta
slug: 2024/farmOS-3.0.0
---

# farmOS v3 and beyond

[farmOS 3.0.0 was released](https://github.com/farmOS/farmOS/releases/tag/3.0.0)
on January 6th, 2024 (almost exactly a year after
[2.0.0 was released](./2023/farmOS-2.0.0))!

This may seem like it happened quickly, considering that it took ~4 years to go
from farmOS v1 to v2. Now that we are using
[semantic versioning](https://semver.org/), however, these "major" increments
are much less dramatic and will become more routine over time. That doesn't
mean we expect farmOS v4 anytime soon, but when we do it will be another small
step like this one.

Incrementing the major version is an opportunity to make big improvements to
farmOS that could "break" existing integrations or community modules. As a rule,
we always try to maintain "backwards compatibility" so that developers who build
on farmOS can be confident that their code won't break as we make changes in
farmOS core. This is a good thing for stability, but the natural tradeoff is
that we are somewhat restricted in the kinds of changes or improvements we can
make to core APIs and data models. By incrementing the major version, and
documenting the "breaking" changes, we can signal to developers that they may
need to make changes to their code to make it compatible with the new major
version of farmOS.

## Semantic versioning

*Feel free to skip this section if you aren't interested in the technical
details of version numbers.*

In semantic versioning, the three numbers in each version have a specific
meaning. The first number is the "major" version, the second is the "minor"
version, and the third is the "patch" version. So, for example, the last release
of v2 was 2.2.1. This means: major version 2, minor version 2, patch version 1.

According to [semver.org](https://semver.org):

> Bug fixes not affecting the API increment the patch version, backward
> compatible API additions/changes increment the minor version, and backward
> incompatible API changes increment the major version.

So generally speaking, we use **patch** version changes for bug fixes and small
tweaks, **minor** version changes for adding new features, and **major**
version changes for bigger things that may require farmOS developers to update
their code.

## Changes in farmOS v3

Most of the changes in farmOS v3 are developer-facing. So if you are a farmer
you might not notice much of a difference. If you develop farmOS modules or
integrations there are a few notable changes to be aware of.

The biggest change (and the main reason we decided to bump the major version of
farmOS), is that farmOS v3 updated from Drupal 9 to
[Drupal 10](https://www.drupal.org/project/farm/issues/3330490). This also means
the underlying PHP [Symfony](https://symfony.com) framework was updated from v4
to v5. In the grand scheme of things, these are routine dependency updates, and
don't mean a lot to most farmOS users. But, if you are a farmOS module
developer, it may mean breaking changes to your code, so semantic versioning
rules dictate that we need to increment the farmOS major version to communicate
that.

The Simple OAuth module has been updated to version 6. This includes a few
breaking changes which may affect API integrations. farmOS includes code to
handle the transition of its own OAuth clients and scopes, but if you have made
any additional clients that used special roles they will also need to be
updated. The biggest changes are that the "Implicit" grant type has been
removed, and the "Password Credentials" grant type has been moved to an optional
"Simple OAuth Password Grant" module, which must be enabled in order to use that
grant type. The default farmOS client that is included with farmOS has also been
moved to a separate module that is not enabled by default. After the update to
farmOS 3.x, all access tokens will be invalidated, but refresh tokens will still
work to get a new access token.

Another notable change is that the farmOS v1->v2 migration code has been removed
in v3. This means that if you are still running farmOS v1 you will not be able
to update directly from v1 to v3. You will need to
["migrate" from v1 to v2](https://farmOS.org/hosting/migration/), and then
"update" from v2 to v3 following the normal
[farmOS update guide](https://farmos.org/hosting/update/).

The rest of the changes are relatively small, but if you are a developer of any
farmOS integrations or modules be sure to read the full release notes to see if
any changes might affect your code.

[3.0.0-beta1 release notes](https://github.com/farmOS/farmOS/blob/3.x/CHANGELOG.md#300-beta1-2023-11-01)

## A look back on v2

We made a lot of progress in the farmOS v2 release cycle (apart from the big
[changes between v1 and v2](../2023/farmOS-2.0.0)). It's important to look back
and acknowledge how far we've come! Here is a quick summary of the notable
farmer-facing features that were added in farmOS v2:

- Planting, Birth, Movement, and Group Membership quick forms.
- CSV importers for assets, logs, and taxonomy terms.
- Asset ownership assignment.
- Bulk actions for log categorization and assigning asset parents.
- Lab test quantity type with "Test method" field, and "Tissue" lab test type.
- Localization module for enabling translations.
- Lots of small user interface/experience (UI/UX) features and improvements.

And that doesn't include all the developer-facing features and improvements.
For the full list, refer to the
[farmOS Changelog](https://github.com/farmOS/farmOS/blob/3.x/CHANGELOG.md).

## Next steps

We have big ambitions for farmOS v3 in 2024! Version 3.1.0 will include a new
configurable Inventory quick form, big improvements to the log/asset/plan edit
form UI/UX, and more.

We are also excited to upgrade the farmOS Crop Planning module to v3. A
prototype module was built for farmOS v1, but we never had the time or resources
to update it to v2. This is an opportunity for all the of the ideas we've been
talking about over the years to come to fruition.

Work continues with [OpenTEAM](https://openteam.community/) and
[PASA](https://pasafarming.org/) on farmOS development to support their
[USDA Partnerships for Climate-Smart Commodities](https://www.usda.gov/climate-solutions/climate-smart-commodities)
projects. I will be attending the PASA Conference in February, and I'm looking
forward to connecting with folks to brainstorm ways that farmOS can help make
data collection and management easier.

If you have ideas that would make your life as a farmer or ag researcher easier,
join the [farmOS Community Forum](https://farmOS.discourse.group) and let us
know!

## Thanks

We couldn't have done all of this without the generous support and contributions
of our community!

![farmOS Contributors](https://opencollective.com/farmOS/contributors.svg?width=890&button=false)
![farmOS Backers](https://opencollective.com/farmOS/backers.svg?width=890&button=false)
![farmOS Sponsors](https://opencollective.com/farmOS/sponsors.svg?width=890&button=false)

If you would like to help support the continued development of farmOS and its
community, please consider sponsoring our work:
[farmOS.org/donate](https://farmos.org/donate/)

Thank you and Happy New Year! 🎉
