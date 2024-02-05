---
title: Inventory Quick Form
date: 2024-02-07
author: Michael Stenta
slug: 2024/inventory-quick-form
---

# Inventory Quick Form

The farmOS [v3.1.0 release](https://github.com/farmOS/farmOS/releases/tag/3.1.0)
includes a new *Inventory Quick Form* for quickly and easily recording
adjustments to an asset's inventory.

See the video below for a quick demonstration, and read on for more details.

<video controls>
  <source src="./inventory.webm" type="video/webm">
</video>

Recording asset inventory adjustments in farmOS requires creating a log with the
following information:

- The date of the adjustment
- A quantity with:
    - Value
    - Units (optional)
    - Measure (optional)
    - Inventory asset (the asset being adjusted)
    - Inventory adjustment type (reset, increment, or decrement)

In order for this log to be counted towards the asset's current inventory, it
must have a status of "Done", with a date in the past.

For more information, see:
[farmOS Inventory Logic](https://farmOS.org/model/logic/inventory)

The Inventory Quick Form streamlines this process by asking for only the
essential information and filling in the rest automatically.

The form starts by asking for the date when the adjustment took place. This
defaults to the current date, so you can record adjustments on the fly when they
happen. You can also adjust this date to record an adjustment that happened in
the past, or an adjustment that you are planning in the future. If you plan a
future adjustment, be sure to uncheck the "Completed" box at the bottom of the
form to indicate that it hasn't happened yet.

Next, you must specify the asset that is being adjusted. Start typing an asset's
name into the "Asset" field and select the one you want from the dropdown that
appears. Only a single asset can be adjusted at a time.

Enter the inventory adjustment "Quantity", and optionally specify "Units" and
"Measure". Each asset can have multiple inventories with unique combinations of
units and measure (or neither). Then select the "Adjustment type", which can be
one of the following:

- **Increment** - The quantity entered will be *added* to the asset's
  inventory.
- **Decrement** - The quantity entered will be *subtracted* from the asset's
  inventory.
- **Reset** - The asset's inventory will be *reset* to the quantity entered.

Increment and decrement adjustments are useful when you are keeping a close eye
on increases and decreases to certain assets, like feed, seed, or materials.
Inventory resets are useful when you are performing a manual count of current
inventory levels and need to record the current count.

At the bottom of the form there is an area to enter notes about the inventory
adjustment, which will be saved to the "Notes" field of the log that is created.

There is also an "Advanced" section with options to specify the "Log type"
(which defaults to "Observation"), and a checkbox that allows you to customize
the name of the log that will be generated.

The "Completed" checkbox at the bottom defaults to "Completed", but can be
unchecked if you are planning a future adjustment.

Upon submitting the form, you will see a message with a link to the new log that
is created, and if you look at your asset record you will see that its current
inventory has been updated.
