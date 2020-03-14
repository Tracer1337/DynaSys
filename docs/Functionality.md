# Workspace
* A canvas where the user can place elements freely

# Tools

###### Tools which can not be placed on the workspace

### Arrow
* Interact with elements on the workspace

###### Tools which can be placed on the workspace

### State
* Represented by a rectangle
* Properties
    * Name
    * Value
    * Input
    * Output

### Rate Of Change
* Represented by a double lined arrow
* Consists of a flow
* Can connect
    * Source and State
    * State and Sink
    * State and State
* Properties
    * Name
    * Value
    * Input
    * Output
    
### Parameter
* Represented by a circle
* Stays constant
* Properties
    * Name
    * Value
    * Output
* If it has an Input it becomes an Intermediate

### Intermediate
* Extends Parameter
* Properties
    * Input

### Effect
* Represented by an arrow
* Connects two objects
* An effect-arrow from A to B means "A effects B"
* Properties
    * Object A
    * Object B

# Object Dialog
* Appears when clicking on
    * State
    * Rate of Change
    * Parameter
    * Intermediate
* Used to configure the object
* Consists of
    * Name
    * Value
    * Inputs
    * Functions

# Output
* Open a Dialog
    * Available Variables on the left
    * Selected Variables on the right
    * Arrows between for switching variables
    * Select a variable => Click arrow => Move variable

### Timing Diagramm
* Coordinate System
    * X-Axis -> Time (t)
    * Y-Axis -> Graphs of selected objects

### Table
* Display the selected variables in a table: | Time | Variable 1 | Variable 2 | ...

### Summary
* Show all objects and their properties
* Show how the values of the objects are calculated