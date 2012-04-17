# User Experience Framework 5.0

## Based on
- HTML 5 Boiler Plate
- 960gs fixed and fluid grid systems

### How the template works

With the upgraded template comes a few more specifications on how files are organized.

#### CSS

From now on all UX specific classes are prefixed with "ux-". Also all CSS file names are prefixed the same way to signified that the contents of the file
have been written specifically to be used with the ux template. CSS files containing "jquery" indicate they are styling specific to a jquery plugin. These
styles are the default implementations of the plugin. If UX overrides the default styling of a plugin it will have another fill with the same name prefixed
as "ux-jquery-".