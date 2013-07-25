/*
Copyright (c) 2013 Daniël Heres

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/*
The Underscore.js list generator
It includes a few functions that might be handy
*/
_.id = function (a) {
    return a;
} 
_.even = function (a) {
    return a % 2 === 0;
}
_.odd = function (a) {
    return a % 2 === 1;
}
/* The combination of two arrays
_.comb([1,2] [1,2]) => [[1,1], [1,2], [2,1], [2,2]]
*/
_.comb = function (a, b, c) {
    if (a.length === 0) return b;
    if (b.length === 0) return a;
    if (c === undefined) c = _.partial(_.id, true);
    var res = [];
    _.each(a, function (_a) {
        _.each(b, function(_b) {
            if(c(_a,_b) === true)
                res.push([_a].concat(_b));
        });
    });
    return res;
}
/*
List generator
First argument is a function that converts the elements that are the result of the  
Other arguments are arrays, or an object with an array v and a guard g

Generate a simple list: 
_.generate(_.id, ['She'], ['Loves me', 'Hates me'])
  => [['She','loves me'], ['She','hates me']]

The simple guard can only access his own value
_.generate(_.id, _.range(2), {v:_.range(5), g:_.even}) => [[0,0], [0,2], [0,4], [1,0], [1,2], [1,4]]

You can also apply a special guard _g to access other variables as the list is being generated from right to left
_.generate(_.id, {v:_.range(5), g_:function(a,b) {return  a===b} }, {v:_.range(5), g:_.even}) 
  => [[0,0], [2,2], [4,4]]
  
Or with more than two arguments, where the index of the second parameter b is the amount of places to the right: 
_.generate(_.id, {v:_.range(5), g_:function(a,b) {return  a===b[0] && a===b[1]}},_.range(5), {v:_.range(5), g:_.even}) 
  => [[0,0,0], [2,2,2], [4,4,4]]
  

*/
_.generate = function (conv) {
    var res = [];
    var args = _.rest(arguments);
    args.reverse();
    var t = [];
    _.each(args, function(a) {
        var s;
        if (a.g) s = _.filter(a.v, a.g);
        else if (a.g_) s = a.v;
        else s = a;
        t = _.comb(s, t, a.g_);
    });
    return _.map(t, conv);
}
