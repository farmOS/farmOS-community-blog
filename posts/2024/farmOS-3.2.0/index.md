---
title: farmOS 3.2.0
date: 2024-04-10
author: Michael Stenta
slug: 2024/farmOS-3.2.0
categories:
  - newsletter
---

# farmOS 3.2.0

We are excited to announce the release of
[farmOS 3.2.0](https://github.com/farmOS/farmOS/releases/tag/3.2.0)!
This release includes a number of new features and improvements. Here are some
of the highlights.

## Comments on farmOS records

If you've ever wanted the ability to have discussions on individual records, now
you can. Three new modules are available, which add the ability to comment on
logs, assets, and plans, respectively. Previously, the only way to record these
kinds of thoughts or conversations in farmOS was via the notes field of the
record, which isn't ideal for obvious reasons - i.e. lack of enforced structure,
attribution, etc.

Comments appear at the bottom of each record. Each comment has its own author
and timestamp which helps to keep track of who chimed in on the conversation
and when. It's also possible to reply to comments, so a conversation can branch
out into multiple areas of focus.

## Filter by log notes

On the
[April 10th, 2024 farmOS monthly call](https://farmos.discourse.group/t/farmos-monthly-call-10-april-2024/1972),
Nick from [BOTL Farm](https://botlfarm.com/) asked about searching logs based on
their notes. The set of log filters only had the option to search by name. So we
took the opportunity to show how the lists of logs are built (with the
[Views](https://www.drupal.org/docs/8/core/modules/views/overview) module), how
to add a filter, how to export that to a configuration YAML file, and how to
open a pull request to contribute that change back to farmOS. Here is the pull
request we created together: https://github.com/farmOS/farmOS/pull/825

Later that day, it was merged into farmOS and included in the 3.2.0 release.
This may have been the fastest feature-request turnaround ever! And a good
learning opportunity! Thanks Nick!

## Logs are done by default

A very simple, but helpful, change is that logs are now marked as "done" by
default. So if you are out in the field and you just need to quickly record
something you did, you don't need to change them from "pending" to "done". We
discussed this as a community and decided that this is a more sensible default
for the majority of users. A potential next step will be to automatically
toggle the status based on whether or not the date is in the past or future,
which will make things even easier!

## Files and images on taxonomy terms

It is now possible to upload files and images to all types of taxonomy terms.
Previously, only the "Plant type" terms had a field for images, but many people
requested the ability to add files and images to other types as well. For
example, attaching PDFs to material type terms, or photos to animal type terms.

## Linking taxonomy terms to ontologies

farmOS's taxonomies are very flexible, and leave it up to the user to populate
the list of terms that are most useful for them. This means you can create a
more tailored list of plant or animal types, for example. Or even create new
types that don't exist anywhere else (if you are breeding new varieties).
However, the cost of this flexibility is that it's hard to nail down exactly
what a term represents outside of your individual farmOS instance.

To solve this, we've added a new "External URI" field to all taxonomy terms.
This allows each term to be linked to one or more items in external lists or
ontologies. In doing so, we get the best of both worlds: tailored lists of
terms within an individual farmOS instance, and a linkage to very specific
definitions of those terms in an external/global context.

## Days of harvest

Another field that was added to "Plant type" taxonomy terms specifically is
"Days of harvest". This compliments the existing "Days to maturity" and "Days to
transplant" fields, and allows you to specify how long the harvest window is for
a particular plant type. This is not used anywhere in farmOS currently, but it
will be used by the new
[Crop Planning module](https://github.com/mstenta/farm_crop_plan) to help
develop crop plan timelines.

---

Those are only the highlights of the 3.2.0 release. To see the full list of
new features, bug fixes, and other changes, refer to the
[3.2.0 release notes](https://github.com/farmOS/farmOS/blob/3.2.0/CHANGELOG.md).
