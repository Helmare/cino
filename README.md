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
### Create Workspace
```
Usage: cino create|cr [options]

creates new workspace

Options:
  -w, --ws <name>  the workspace to be used
  -y, --yes        skips the confirmation prompt
  -h, --help       display help for command

```

### Clock In\Out
```
Usage: cino clock|clk [options]

clocks in/out of a workspace

Options:
  -w, --ws <name>    the workspace to be used
  -y, --yes          skips the confirmation prompt
  -t, --time <time>  time of the clock
  -h, --help         display help for command

```

### View Timesheet
```
Usage: cino view|v [options]

displays a workspace

Options:
  -w, --ws <name>  the workspace to be used
  -h, --help       display help for command

```

### Remove Clock Instance
```
Usage: cino unclock|unclk [options]

removes clock from a workspace

Options:
  -w, --ws <name>  the workspace to be used
  -y, --yes        skips the confirmation prompt
  -i, --index      index of the clock (default: "0")
  -h, --help       display help for command

```

### Remove Workspace
```
Usage: cino remove|rm [options]

removes workspace

Options:
  -w, --ws <name>  the workspace to be used
  -y, --yes        skips the confirmation prompt
  -h, --help       display help for command

```