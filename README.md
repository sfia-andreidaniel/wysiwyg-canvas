# Canvas based HTML Editor

The purpose of this project is to implement a HTML Editor who is using
a canvas to render it's contents, without using the standard contenteditable
feature of the web browsers that is used at this moment in the other WYSIWYG editors.

![Editor Preview](/_assets/preview.png?raw=true)

# Usage

See index.html file in the root of the repo for embedding example.

## Goals

1. The INPUT should act as a standard HTML input, supporting the following
   properties:

  * value
  * readOnly
  * disabled
  * width
  * height

2. The INPUT should not rely on any other library, in order to be able to
   be used in all kind of projects.

3. The INPUT should provide a very user-friendly look and feel for the user,
   and should respect all the keyboard shortcuts used in the text-editing
   industry (ctrl+B for bold for example).

4. The INPUT is focused on editing rich text, leaving the layouting for the external
   css files, and should embed inline styling as less as possible in it's generated
   HTML content.

5. The INPUT should contain a very good plugin architecture, allowing other
   developers to create their own plugins easily.

## Technical details

All the code is writen in TypeScript, and respects a good OOP pattern. The code is compiled
into a javascript file, which can be embedded into web pages.

Supported web browsers are: Internet Explorer 10 +, Google Chrome (latest), Firefox (latest).
Tested on Opera Browser too, it's working, but for Opera the code might break from time to
time, as it's not a targeted platform.

# Alpha release

This project is in an alpha development stage, and should not be used by any means
in production environments. Use it at your own risk.
