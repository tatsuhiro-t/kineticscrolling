# Usage #

This page briefly explains how to use kineticscrolling.


# Details #

We assume you created Google Map instance and it is referred by variable _map_.
To adds kinetic scrolling feature to _map_, create KineticScrolling instance and call its setMap method with _map_.

```
var kineticScrolling = new KineticScrolling();
kineticScrolling.setMap(map);
```

That's all. Now your map has kinetic scrolling ability.

To disable kinetic scrolling, call setMap(null);
```
kineticScrolling.setMap(null);
```

See also working [DEMO](http://kineticscrolling.googlecode.com/svn/trunk/examples/sample.html).