# text-sim
Given two text documents, computes the percentage similarity between them

![text-sim](http://i.imgur.com/j2nO8GT.png)

This web application is built as a demo project for the Introduction to Web Development workshop presented at Cal Hacks 3.0. By implementing parts of this application, students will learn about how HTML, CSS, and Javasript work together. I strongly believe in project based learning and having students walking away with something they can tweak to make an actual product out of.

The text comparison is doen using [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity). It converts each document into a word frequency vector and finds the cosine of the angle between them. This number will always be a positive number between 0 and 1.
