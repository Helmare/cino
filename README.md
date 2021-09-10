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