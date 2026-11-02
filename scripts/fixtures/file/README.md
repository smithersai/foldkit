# File platform boundary regression

The test loads Effect before replacing the host constructor, then loads the actual
File module and replaces the constructor again. Validation, JSON codec behavior,
and file accessors must match the original `Schema.instanceOf` recipe. One hundred
generated values cover captured, earlier and later constructors, blobs and plain
objects. The host constructor lookup itself must stay in the TypeScript edge.
