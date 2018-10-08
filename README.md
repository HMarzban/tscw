## TSCWatcher

Simple command line interface (CLI) to compile TypeScript/JS in your ES target then Bundle all your Module compiled files with WebPack then watches your changes in real-time.


This package is part of <a  href="https://github.com/HosseinMarzban/ned">**Ned Library**</a> Project.

**install**: `npm i -g tscw-cli`
**Production use**: `tscw serve -p`
**Development use** `tscw serve -d`

### How to use `tscw`:
Install pakage: `npm i webpack webpack-cli typscript`
After that create your `tsconfig.json` and `webpack.config.js`files and config like below:

`webpack.config.js`

``` javascript
const  path = require('path');
const  environment_mode = process.env.WebPack_ENV;
module.exports = {
	mode:  environment_mode,
	entry:  "./dist/main.js",
	output: {
	path:  path.resolve(__dirname, './src'),
		filename:  'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};
```

`tsconfig.json`

  

``` json
{
	"compilerOptions":{
	"target":"es5",
	"module":"es6",
	"allowJs": true,
	"sourceMap":true,
	"emitDecoratorMetadata":true,
	"experimentalDecorators":true,
	"removeComments":false,
	"noImplicitAny":true,
	"outDir":"./dist"
	},
	"include": [
	"./typescript/main.ts"
	]
}
```
After all `tscw` need basic config to watch and serve your file, fot this one add this property in your `package.json` file:
``` javascript
"tscWatcher": {
	"port":  600, //port you wana serve your server
	"watch_dir":  "./typescript", //watch files for reload compiler
	"publicPath":  "./src"  //public path to set in static express
}
```
All don. you can now bring out your command line and type **`tscw serve`**, that's it( by default WebPack mode is in `development`, you can change it into `production` mode by `tscw serve -p` ).
if you would like you can config `webpack` for another plugin, module or resolver like for `sass`, `html` and so on, to compile and bundle beside your typescript files.

  

### Develop and Contribute
1.  `git clone` repo
2.  `npm i`
3.  `npm link`