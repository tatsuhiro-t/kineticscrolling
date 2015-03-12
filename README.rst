kineticscrolling
================

You know Google's official Google Maps http://maps.google.com has so-called kinetic scrolling (aka inertia scrolling) feature. Some say it is annoying and it should not be default, but I really like this feature.
Unfortunately, this feature is not available if you create a map using Google Maps JavaScript API V3.
That's where this little project comes in. It adds kinetic scrolling feature to your custom Google Maps.
It is just a pure JavaScript code and does not depend any external libraries other than Google Maps JavaScript API V3.

See `DEMO <https://tatsuhiro-t.github.io/kineticscrolling>`_.

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

MIT License
