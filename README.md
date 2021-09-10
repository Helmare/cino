# Clock In N' Out
Clock In N' Out (aka `cino`) is a cli timesheet application differentiated by workspaces. It's a straightforward tool that can do anything you would need to keep track of your time.

## Getting Started
Cino is built on the Node.js platform, so make sure Node.js and npm are installed in the environment. After that, just run the command:
```
npm i -g cino
```

## Workspaces
Workspace is the way cino separates time spent on different activities. For example, you might have a workspace for each project you're working on to distinguish where time was spent.

## Usage
Before you start tracking your time, you'll have to create a workspace.
```
cino create -yw <name>
```
Once your workspace is created, you can clock into it. You clock out of it the same way.
```
cino clock -yw <name>
```
View your timesheet afterward to verify everything is working properly
```
cino view -w <name>
```

If you require more help, use the `--help` option at the root or after a command.

### All Commands
`clock`, `create`, `dir`, `help`, `remove`, `unclock`, `view`

## Contribute
Want to help move this project forward? Consider contributing to the project. There are many different ways you can help out, even if you don't want to submit code changes.

### Use In Your Projects
The easiest way to contribute is to have this repo as a dependency in your projects. This contribution gives the project more recognition and likely to be seen by other developers, thereby growing the community.

### Submit Pull Requests
If you would like to make changes to the codebase or documentation, you can submit a pull request. Make sure to check out the [CONTRIBUTING.md](https://github.com/hazdryx/cino/blob/master/CONTRIBUTING.md) for pull request requirements.

### Donate
If you don't want to submit a pull request or just want to support my work further, consider sending me a donation. Donations help me spend more time on open-source projects so they can be of the highest quality possible.

<a href="https://www.buymeacoffee.com/hazdryx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>