@app
remix-architect-app

@aws
runtime nodejs18.x
# concurrency 1
# memory 1152
# profile default
region us-west-2
# timeout 30

@http
/*
  method any
  src server

@plugins
plugin-remix
  src plugin-remix.js

@static
