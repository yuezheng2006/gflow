#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const figures = require('figures');
const { config, commitConfig } = require('../src');
const { assert } = require('./utils/assert');

const options = {};

commander
  .alias('gflow config set-ref <branchName> <refBranch>')
  .action((branchName, refBranch) => {
    options.branchName = branchName;
    options.refBranch = refBranch;
  })
  .parse(process.argv);

assert(!options.branchName, 'The branchName is required');
assert(!options.refBranch, 'The refBranch is required');

if (config.refs.set(options.branchName, options.refBranch)) {
  commitConfig();

  console.log(
    chalk.green(figures.tick),
    `Branch ${chalk.green(options.branchName)} is configured on ${chalk.green(`${config.remote}/${options.refBranch}`)} reference`
  );
}
