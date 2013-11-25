proxyserver
===========

replace online files with local ones

## Intent

As a web developer , sometimes we want to debug online bugs .

We have a local server environment , not the whole of online environment .

We just want to point a few path to our local server , and the others just left thoses online .

Proxyserver did this thing . It supports combo path like "http://foo.com/a/??b.js,mod/c.js" .

## Usage

* Start the proxyserver , hostname or port must be different with your local server .

sudo node index.js

* Change the hosts file , pointing the online hostname to the ip address of proxyserver .

192.168.1.100  foo.com

* Visit foo.com and submit your local server location .

http://192.168.1.101:8080

* Refresh your page and you can see the online files were replaced by the local ones .

* And now fix your bug !
