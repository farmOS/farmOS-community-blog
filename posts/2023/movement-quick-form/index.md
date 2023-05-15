---
title: Movement Quick Form
date: 2023-05-22
author: Michael Stenta
slug: 2023/movement-quick-form
---

# Movement Quick Form

The farmOS [v2.1.0 release](https://github.com/farmOS/farmOS/releases/tag/2.1.0)
includes a new and *Movement Quick Form* for quickly and easily recording the
movement of assets to a new location. This feature existed as a more specific
*Animal movement* quick form in farmOS v1, and has now been ported to v2 and
generalized for use with any asset type (eg: Equipment, Plants, etc).

See the video below for a quick demonstration, and read on for more details.

<video controls>
  <source src="./movement.mp4" type="video/mp4">
</video>

Recording the movement of assets in farmOS requires creating a log with the
following information:

- The date of the movement
- The assets that are moving
- The locations that they are moving to
- The geometry of the new location

In order for this log to be counted towards the asset's current location, it
must have a status of "Done", with a date in the past, and the "Is movement" box
checked.

For more information, see:
[farmOS Location Logic](https://farmOS.org/model/logic/location)

The Movement Quick Form streamlines this process by asking for only the
essential information and filling in the rest automatically.

The form starts by asking for the date when the movement took place. This
defaults to the current date, so you can record movements on the fly when they
happen. You can also adjust this date to record movements that happened in the
past, or movements that you are planning in the future. If you plan future
movements, be sure to uncheck the "Completed" box at the bottom of the form to
indicate that it hasn't happened yet.

Next, you must specify the assets that are moving. Start typing an asset's name
into the Assets field and select the one you want from the dropdown that
appears. Separate multiple assets with a comma.

You can select the locations that the assets are moving to in the same way. If
no locations are specified, this will clear the current location of the assets.

If the assets and locations you selected have a geometry already, they will
automatically show up on the map within the form. Current asset location
geometry will be displayed in blue, and the new geometry will be displayed in
orange.

The geometry for the movement is editable within the map, which allows you to
customize the asset's new geometry. Use the map's edit controls to select the
geometry you want to edit, and use the modify, move, or delete buttons to change
them. You can also use the polygon, line, point, and circle buttons to draw new
geometries.

Customizing the geometry of the movement does *not* change the geometry of the
location assets you selected. The custom geometry is only saved to the movement
log and thus only affects the moved asset(s). For more information on location,
see [Movements and location](https://farmos.org/guide/location/) in the farmOS
user guide.

See the video below for a quick demonstration.

<video controls>
  <source src="./geometry.mp4" type="video/mp4">
</video>

One example where this is useful is moving animals with temporary fencing for
rotational grazing purposes. You may move a fence multiple times within the same
paddock, and you want to be able to record exactly where the animals were grazed
and for how long. The Movement Quick Form can accomplish this by referencing the
same location multiple times, but drawing the fence geometry differently each
time.

Another example could be moving a piece of equipment to a field, but specifying
the exact point where it was moved, so you (or someone else) can find it again
easily. Using the Movement Quick Form, you can specify a location like "North
Field" and also draw a point on the map exactly where the equipment is in "North
Field".

At the bottom of form there is an area to enter notes about the movement, which
will be saved to the "Notes" field of the log that is created.

The "Completed" checkbox at the bottom defaults to "Completed", but can be
unchecked if you are planning a future movement.

Upon submitting the form, you will see a message with a link to the new log that
is created, and if you look at your asset records you will see that their
current location and geometry have been updated.
