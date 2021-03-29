# Airtable timeline assignment

## High level objective:

Design and implement a component for visualizing items on a timeline.

## Details:

Your timeline component should arrange items in horizontal lanes, similar to a Gantt chart. These items should be laid out in a compact, space-efficient way: if item A ends before item B starts, they can share a lane instead of being rendered on separate lanes. You may want to slightly relax this constraint to fit in the name of the event (for example, if an item is too short, or the item's name is too long).

The start and end dates will be formatted as YYYY-MM-DD date strings, for example: `2020-02-20`. You don't need to worry about hours, minutes, seconds, or time zones.

You can assume every item's end date is the same or later than its start date.

Avoid using libraries that solve too much of the problem. General purpose libraries like React or Moment are fine, but a library that renders a timeline or computes the layout for a timeline is not. This also applies to the CSS Grid `grid-auto-flow` property (but you may use CSS Grid for positioning).

After you have a basic read-only timeline, here are some potential improvements to attempt:

* Allow zooming in and out of the timeline
* Allow dragging and dropping to change the start and/or end date of an item
* Allow editing the name of items inline
* Any other polish or useful enhancements you can think of

Include a README that covers:

* How long you spent on the assignment.
* What you like about your implementation.
* What you would change if you were going to do it again.
* How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
* How you would test this if you had more time.

If you did not use the starter code, please also include instructions on how to build and run your project so we can see and interact with the timeline component you built. It should render the sample data included in `src/timelineItems.js`.

What we're looking for:

* Clean, readable, maintainable code.
* A sensible user experience and design for the final product.

## Starter code:

To use the starter code:

1. Navigate to this project directory
2. Run `npm install` to install dependencies (this takes a couple minutes)
3. Run `npm start` to initialize and connect to a node server with your default browser

Please feel free to use as much or as little of the starter code as you'd like.

## Sample data:

The `src/timelineItems.js` file has some sample data you can use to get started.
