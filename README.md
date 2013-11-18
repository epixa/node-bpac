node-bpac
============

Pack your bower_components as *.tgz files for version control and easy deploys

This module is based off of the **[`pac`][pac]** module from **[mikefrey][mikefrey]**.

[pac]: https://npmjs.org/package/pac
[mikefrey]: https://twitter.com/mikefrey

Why?
----

Relying on the availability of a third party service when deploying has a
tendency to cause headaches, but committing the raw source of third party
components makes for messy changesets that can kill the ability to do a proper
code review.

Installation
------------

`npm install -g bpac`

Usage
-----

From a command prompt, running `bpac` from your project's root directory will
package all of your `bower_components` into the `.components` directory.

Running `bpac install` from the same directory will unpack all archives in the
`.components` directory into your `bower_components` directory.

**Note:** The `directory` property of your `.bowerrc` will be used if its set.

If your build/deploy system does not have access to bpac, you can use a script
similar to the following:

```
mkdir -p bower_components
for f in .components/*.tgz; do tar -xzf $f -C bower_components/; done
```
