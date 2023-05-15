---
title: Birth Quick Form
date: 2023-05-22
author: Michael Stenta
slug: 2023/birth-quick-form
---

# Birth Quick Form

The farmOS [v2.1.0 release](https://github.com/farmOS/farmOS/releases/tag/2.1.0)
includes a new and improved *Birth Quick Form* for quickly and easily recording
animal births. This feature existed in farmOS v1, and has now been ported to v2.

See the video below for a quick demonstration, and read on for more details.

<video controls>
  <source src="./birth.mp4" type="video/mp4">
</video>

Recording the birth of animals in farmOS involves creating a few different
records:

1. A mother Animal asset to represent the animal that is pregnant.
2. A Birth log that represents when/where/how the mother gave birth.
3. One or more Animal assets that represent the newly born children.
4. One or more Observation logs to record the child birth weights (if desired).

Creating all of these records can be tedious, especially during a busy birthing
season!

The Birth Quick Form tries to make this process easier with a single form for
creating the Birth log and all the children Animal assets in one step. The only
requirement is that you have a mother Animal asset record to start.

## Birthdate

The form starts by asking for the date of birth. This defaults to the current
date, so you can record births on the fly when they happen. You can also adjust
this date to record births that happened in the past. This date will be used
for the Birth log's timestamp, as well as in the "Birthdate" field of all the
children assets.

## Child information

Next, the form asks how many children were born. Below this dropdown there will
be sets of questions for each child. Changing the number of children in the
dropdown will add/remove additional sets of child questions automatically.

Within each set of child questions, you can fill in the following information:

- Child name
- Child ID tag information (tag type, tag ID, tag location)
- Sex (male or female)
- Birth weight
- Notes about this child
- Survived birth (yes or no)

You must enter *either* a child name *or* child ID tag information. If a name is
not provided, the tag ID will be used as the child asset's name.

Birth weight can be specified in *lbs* (for US/imperial measurements) or *kg*
(for metric measurements), depending on how your farmOS is configured. If a
birth weight is entered, then an Observation log will be created that references
the child asset with the recorded weight as a quantity on the log.

Notes about the child will be saved to the Notes field of the child Animal
asset itself. There is a separate Notes field for the overall birth of all
children at the bottom of the quick form.

The "Survived birth" checkbox will determine whether or not the child Animal
asset status is set to "Active" or "Archived" when it is created. Assets will
still be created for animals that did not survive birth, but will be immediately
archived so their data is still saved.

## Birth information

Below the child-specific questions are three sections in vertical tabs:

- Lineage
- Group (if the Group module is enabled)
- Notes

Within the Lineage tab there are three fields:

- Birth mother
- Genetic mother
- Genetic father

A new feature of the farmOS v2 Bith Quick Form is the ability to differentiate
the birth mother and genetic mother. The birth mother will be referenced in the
Birth log that is created. The genetic mother will be referenced as a parent of
the children assets that are created.

You must specify *either* the birth mother *or* the genetic mother by
referencing an existing Animal asset. If you haven't created this asset yet, you
can open a new browser tab, create the mother asset, and then go back to the
Birth Quick Form tab to reference it. Start typing the mother asset's name into
the field and select the mother asset you want from the dropdown that appears.

If only one mother is referenced in either field, it is assumed that they are
both the birth mother and genetic mother. So at the very least you only need to
specify one.

If the Group module is enabled, a "Group" tab will be visible under "Lineage".
This allows you to specify which Group asset the children will be made members
of. If this is left blank, the children will become members of the birth
mother's group, if available. Otherwise, no group membership will be assigned.

Finally, a Notes field is provided for the overall birth. This can be used to
record any notes, observations, complications, etc about the birthing process.
These will be saved to the Notes field of the Birth log, as opposed to the Notes
field of individual children assets described above.

## Submit

If everything you entered is valid, when you submit the form you will see a
number of status messages with links to the records that were created, including
the Birth log, child Animal assets, and weight Observation logs.
