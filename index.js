#!/usr/bin/env node
const fs = require('fs-extra'),
    program = require('commander'),
    chalk = require('chalk'),
    express = require("express"),
    app = express(),
    { spawnSync } = require('child_process');
    path = require("path");


    const _init = async () => {

      if (fs.existsSync( path.resolve("./webpack.config.js") ) && fs.existsSync( path.resolve("./tsconfig.json") )) {

       
        const packageJson = require( path.resolve('./package.json') )
        
        const _config = packageJson.tscWatcher;

        const changeHappend = () => {
          return new Promise(async (resolve, reject) => {

            console.info(`${chalk.magentaBright('[TSC Watch-typescript]:')} Typescript Run:`);
            await spawnSync('tsc', [], {
              stdio: 'inherit',
              shell: true
            });

            console.info(`${chalk.magentaBright('[TSC Watch-webpack]:')} Webpack Run:`);
            await spawnSync('npm', ["run webpack"], {
              stdio: 'inherit',
              shell: true
            });
            console.info(`\n${chalk.magentaBright('[TSC Watch]:')} Done.`);
            resolve("Done");
          }); //@Promis
        }

        if (_config) {

          if (packageJson.scripts.webpack != "webpack")
            throw new Error(`${chalk.magentaBright('[TSC Watch]:')}${chalk.bold.redBright("[Error]:")} we need this configuration in "script" prosperity in "package.json":  "webpack": "webpack"  `);

          await changeHappend();

          const PORT = process.env.PORT || parseInt(_config.port);

          console.info(`\n${chalk.magentaBright('[TSC Watch]:')} Watching for file changes on ${chalk.green( _config.watch_dir )}`);

          let fsWait = false;
          fs.watch(path.resolve(_config.watch_dir), async (event, filename) => {
            if (filename) {
              if (fsWait) return;
              fsWait = setTimeout(async () => {
                fsWait = false;
                await changeHappend();
              }, 100);
              console.info(`${chalk.magentaBright('[TSC Watch]:')} "${chalk.yellow(filename)}" File Changed.`);

            }
          });

      

          app.use('/', express.static(path.join(_config.publicPath)));

          app.get('/', (request, response) => {
            response.sendFile(path.resolve(`${_config.publicPath}/index.html`));
          });

          app.listen(PORT, () => {
            console.info(`${chalk.magentaBright('[TSC Watch]:')} Server ready to serve on port: ${PORT} || ${chalk.blueBright(`http://localhost:${PORT}`)}`);
          });
        } else {
          console.error(`${chalk.magentaBright('[TSC Watch]:')}${chalk.bold.redBright("[Error]:")} TSC Watch is not exist in "package.json". `);
        }

      } else {
        console.error(`${chalk.magentaBright('[TSC Watch]:')}${chalk.bold.redBright("[Error]:")} "tsconfig.json" and "webpack.config.js" must be config. `);
      }
    } //@Function: _init();



    program
      .version('0.6.0', '-v, --version')
      .description('Gives you Current version of TSCWatch')


    program
      .command('serve')
      .description('Start TSCWatch listner')
      .action(() => {
        _init();
      })

    program.parse(process.argv)