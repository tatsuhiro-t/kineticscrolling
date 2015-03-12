kineticscrolling
================

You know Google's official Google Maps https://maps.google.com has
so-called kinetic scrolling (aka inertia scrolling) feature. Some say
it is annoying and it should not be default, but I really like this
feature.  Unfortunately, this feature is not available if you create a
map using Google Maps JavaScript API V3.  That's where this little
project comes in. It adds kinetic scrolling feature to your custom
Google Maps.  It is just a pure JavaScript code and does not depend
any external libraries other than Google Maps JavaScript API V3.

See `DEMO <http://tatsuhiro-t.github.io/kineticscrolling>`_.

Usage
-----

This page briefly explains how to use kineticscrolling.


We assume you created Google Map instance and it is referred by
variable ``map``.  To adds kinetic scrolling feature to ``map``,
create ``KineticScrolling`` instance and call its ``setMap`` method
with ``map``.

.. code-block:: js

    var kineticScrolling = new KineticScrolling();
    kineticScrolling.setMap(map);

That's all. Now your map has kinetic scrolling ability.

To disable kinetic scrolling, call ``setMap(null)``:

.. code-block:: js

    kineticScrolling.setMap(null);

License
-------

The MIT License

Copyright (c) 2010, 2015 Tatsuhiro Tsujikawa

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
