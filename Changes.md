# Kleep

### Added
  - Perfect scrollbar (https://github.com/mdbootstrap/perfect-scrollbar)
  - Switch reverse (`_switch-reverse.scss`) for the switch in the main page

### Changes
  ##### HTML: main.html
  - Added perfect scrollbar css
  - Added perfect scrollbarr script
  - Re-aligned the header 
  - Moved the search field together with the header column
  - Split the the header into two columns — instead of three columns
  - Full difference: https://github.com/andrewoplas/Kleep/commit/65c1a992d2b82c6be68756854ad0ee93795cb6c3?diff=split#diff-5048c630badf8f1394963075ef920fe0
  
  ##### SCSS
  - `_mixins.scss` : Changed horizontal padding of button from 2px to 4px
  - `_variables.scss` : Changed $colorBlue variable's value, #1673ff into #4784fa
  - `_switch-reverse.scss` : Added new switch element
  - `dashboard.scss` : Replaced `switch` with `switch-reversed`
  - Changed main content's display from flex to grid. https://github.com/andrewoplas/Kleep/commit/65c1a992d2b82c6be68756854ad0ee93795cb6c3?diff=split#diff-f8758ba95b8f83a5d2e0caaf5bf9a3bb
   
  ##### JS
  - Added data in `data` variable
  - Added script for initialization of Perfect Scrollbar
  - Updated target element for datepicker's `on pick`
  - https://github.com/andrewoplas/Kleep/commit/65c1a992d2b82c6be68756854ad0ee93795cb6c3?diff=split#diff-8fcfb759e910ed88ab29bf59a90b765f
