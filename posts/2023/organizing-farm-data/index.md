---
title: Organizing Farm Data with farmOS
date: 2023-09-15
author: Symbioquine
slug: 2023/organizing-farm-data
---

# Organizing Farm Data with farmOS

Growing things is busy work that requires tracking many small (but critical) details and being responsive to unpredictable factors such as weather, pests, and
market forces. A naive outsider may have strong notions about what data is required to keep things running smoothly and how it is recorded/stored. Similarly,
farmers will have a pretty wide spread of actual and aspirational record keeping practices.

Here are some common mindsets when it comes to farm record keeping;

1. "Obviously farmers should record everything. More data is better. Increasingly fine-grained data will lead to more optimal practices/production."
2. "Record keeping for my farm is easy. I just jot down free-form notes and organize/transcribe them as I go. The unimportant data gets lost naturally along the way."
3. "Record keeping for my farm is near impossible. I can't predict what data I will need and trying to record or organize it is a waste of already scarce time."

We can imagine all sorts of challenges and opportunities that might be implied by those mindsets but each of them holds an important lesson too.

## Costs and Benefits

It may be obvious, but the first thing to consider is what you are trying to achieve and how is that different from where you are now.

It can be tempting to blindly pursue a comprehensive record system, record ad-hoc data without a plan, or even skip record keeping altogether. Chances are that none of
those is a great fit for your farm. Instead, most farms probably need something in the middle of those extremes. You can't record every minutiae since it would
take too much time and have diminishing returns. Completely ad-hoc data entry probably will not serve any particular purpose well, but skipping record keeping
entirely would be giving up on a valuable mechanism to keep things running smoothly and improve operations over time.

What to do?

*Note: The thought process outlined here is almost certainly not original, but is hopefully presented it in a way that is tailored to be immediately useful to those entering data in farmOS.*

Any time spent entering data has a cost, both in dollars - if paying someone - and in opportunity cost since that time could be spent on the primary work of actually
taking care of your growing things. That means that we should have a clear understanding of the value proposition for each kind of data. Sometimes the work entering a
type of data will be an investment. Other times it will represent regulatory requirement or a hedge against some possible negative outcome. In both cases, try to imagine
the expected value for a given type of data as the probability of needing the data multiplied by the value of that data if it turns out to be useful. Those values might
be expressed in dollars or time and will necessarily be best guesses, but they can provide a bit of a framework for determining if the opportunity cost for entering the
data is worth it.

A simple example would be if having a peice of data up-to-date and in a convenient place will save you 10 minutes per day but takes an hour a week to enter/update, it
might only barely be worth it.

More complexly, if having historical seeding rates (perhaps in kg/acre) lets you avoid $100 in wasted seed 50% of years and takes an hour per year to enter and use the
data, then the expected value of entering that data is $50/year.

## Working Backwards

Now that we have a framework for evaluating the opportunity represented by a type of data, we need to find some to evaluate.

Start by considering your existing operation and where your opportunities are. In other words, what do you want to change that seems like it could be improved with
better data/analysis. Perhaps you already have good data for production and profits from a point-of-sale system, but have less visibility into the day-to-day operations
that affect those production numbers. Alternatively, you might have great pre-production metrics from another tool or even a spreadsheet, but lack a good way to track
day-to-day tasks assigned to workers or the movements/locations of animals/plants.

Whatever those opportunities are, write goals around them like this;

* "I want to improve grazing rotation efficiency by being able to compare historical movements and animal weight gain."
* "I want to produce more consistent plant starts for sale by having data that will let me optimize the timing and quantity started year over year."
* "I want to reduce employee time lost looking for tools and materials by keeping track of where they are located."

Next, take that statement and imagine what data it implies. For instance the grazing rotation example might require knowing the timing of which (and how many) animals
were in which pastures along with - at least - starting and ending weights for those animals. The plant starts example might require knowing the dates when new batches
of starts were planted along with the quantity and sales records for the resulting starts.

It might also be important to consider the ways in which the data will need to be accessed to achieve the goal. Maybe the data gets used once a month as some sort of
report or maybe it is accessed on a day-to-day basis. This can help inform the granularity of the data and the selection of data formats/tools.

## Data Structure and Re-usability

This next part is arguably the hardest because it requires researching (and possibly experimenting with) the available tools and data model choices. It also involves
weighing the trade-offs between coarser or finer grained data. Here we are discussing use-cases where farmOS is a good fit, but it is important to keep in mind that
for other use-cases accounting, GIS, or even spreadsheet/paper tools might be a better fit.

The [farmOS data model](https://farmos.org/model/) provides for representing your growing things and related stuff using assets. It also provides logs for recording
events. The basic ideas of how to use those primitives (and a few others) are described in the [farmOS user guide](https://farmos.org/guide/). Armed with that information,
we can start to decide what structure and granularity will help meet your goals.

In the grazing rotation example we need to decide whether to represent the herd/flock/etc as individual animal assets or as a single group asset. Correspondingly
the weights might be recorded as an animal count, total weight, and average weight for the whole group or as individual weight logs for each animal. One thing that
can help with that decision is determining whether there are other ways to re-use the data. e.g. Would having individual animal pasture locations and weight history
be helpful in finding animals or making care decisions day-to-day?

farmOS is very unopinionated about how its data model is used. This can be helpful but also means we need to exercise some creativity when choosing the best fit for
any given use-case. In the employee tool and material finding example above, it is tempting to track the locations of each tool or material when employees move them
around. However, it might not be realistic to expect employees to update those locations very well in real-time. Instead, you could choose to just model the normal storage
location for the tool or material assets. That way employees know where to look first - and where to put the materials back when they're done with them. By also referencing
the tools and materials on logs for tasks assigned to those employees, other employees could look up who to ask if the tool or material isn't where it was expected to
be.

## Developing Conventions

The thought exercise described so far can be a powerful tool for planning what data to enter, but it is worthless without the subsequent work of actually following through
on consistently entering the data.

For those just getting started, it will probably make sense to pick a small peice of the larger planned data and practice consistently entering that data. You may find
that certain parts of your plan need to change along the way to fit real-world constraints such as time or available-level-of-detail. Additionally, you will probably
learn things about how your data fits into farmOS.

The patterns that arise around what data gets entered and how it is recorded/used are called [conventions](https://farmos.org/model/convention/). If you use farmOS -
or really any flexible record keeping tool - you are implicitly creating conventions. Those conventions can be made explicit by writing down a description of the purpose
of the data being recorded and how to record it. The level of detail in the convention should be enough that someone who is generally familiar with farmOS (but not
with your use-case) can enter or validate new/existing records.

Writing conventions - especially more detailed/formal ones - is optional, but is a good way to capture the work you have done thinking through the what, how, and why
of the data you plan to record. It also could be a good way to share your plan with collaborators or employees.

It is expected that farmOS will eventually have tools that can work directly with conventions, but for now conventions are a way to capture those patterns and refine
them over time. The current audience for your convention(s) is yourself and others who will use farmOS with you. *Keep an eye on this blog for a future post about the
larger conventions vision!*

## Next Steps

Hopefully this has been a helpful overview of one strategy for choosing what data to record in farmOS. Ideally, it will inspire you to choose something strategic to
improve through better record keeping - and start soon.

Remember not to get too wrapped up in making it perfect initially. It can help to set up a rhythm for improvements to your record keeping - possibly yearly/seasonally -
so you can feel free to capture data a way that feels good now and improve on it in the next cycle once you know more or have seen a return on your investment in
the data already entered.

Also remember that you're not alone. It is natural to have questions and struggle to fit the messy real-world into the orderly software one. Feel free ask for help and
share your victories on the farmOS [forum](https://farmos.discourse.group/) or [chat](https://app.element.io/#/room/#farmOS:matrix.org). Chances are, you will inspire
others to think differently about their own data or even lead to improvements in farmOS itself.
