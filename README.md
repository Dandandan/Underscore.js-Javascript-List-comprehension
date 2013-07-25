generator.js
===========================================

A list comprehension function for Underscore.js

List comprehension
First argument is a function that converts the elements that are the result of the  
Other arguments are arrays, or an object with an array v and a guard g

Generate a simple list:
```
_.generate(_.id, ['She'], ['Loves me', 'Hates me'])
  => [['She','loves me'], ['She','hates me']]
```

The simple guard can only access his own value
```
_.generate(_.id, _.range(2), {v:_.range(5), g:_.even}) => [[0,0], [0,2], [0,4], [1,0], [1,2], [1,4]]
```

You can also apply a special guard _g to access other variables as the list is being generated from right to left
```
_.generate(_.id, {v:_.range(5), g_:function(a,b) {return  a===b} }, {v:_.range(5), g:_.even}) 
  => [[0,0], [2,2], [4,4]]
```

Or with more than two arguments, where the index of the second parameter b is the amount of places to the right: 
```
_.generate(_.id, {v:_.range(5), g_:function(a,b) {return  a===b[0] && a===b[1]}},_.range(5), {v:_.range(5), g:_.even}) 
  => [[0,0,0], [2,2,2], [4,4,4]]
```
