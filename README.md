# Servidor 



# Prerequisites
* Node 7.6 or better.

> Note: Node with support for async/await.

# Recomended
* Visual Studio Code

## Plugins
* [TS Lint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [Auto import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
* [API Elements](https://marketplace.visualstudio.com/items?itemName=vncz.vscode-apielements)

# Install dependencies
```bash
$npm install
```

# Configure
## Easy way
Install pm2 and configure [ecosystem.json](https://github.com/AgoraBinaria/app-base/blob/master/server/ecosystem.json) with your configuration
```
$npm install -g pm2
pm2 start ecosystem.json

pm2 logs --lines 100
```

## Hard Way
Edit [enviroment.ts](https://github.com/AgoraBinaria/app-base/blob/master/server/src/environments/environment.ts) with your configuration, or set all enviroments variables before execute.
```
$npm run start
```



# Start server
```bash
$npm run start
```

# Enviroments
To configure the enviroment just define __env__ as enviroment variable of node and set the value of [STAGES](https://github.com/AgoraBinaria/app-base/blob/master/server/src/app/core/shared/enums.ts) emun.

# Test
```bash
$npm run test
```

# Generate bundle and transpile
```bash
$npm run build
$pm2 start ecosystem.json
```

# Why exceptions file
To provide a common errors for HTTP request.

# [Ecosystem](http://pm2.keymetrics.io/docs/usage/deployment/)
Use ecosystem json provide a better manage of app configuration
```json
{
  "apps" : [
        {
            "name"        : "app-base",
            "script"      : "backend.js",
            "merge_logs"  : true,
            "cwd"         : "absolute path to dist/server",
            "env" : {
               "NODE_ENV": "prod"
            }
        }
  ]
}
```


