# TODO (v0.2.0)
- [ ] Add unit test for the current code base
  - [ ] Install `jest` to the project.
  - [ ] Create tests for all `Workspace` methods.
- [ ] Implemented CI/CD in Github Actions
  - [ ] Create a testing action for every push to any branch.
  - [ ] Create a deploy action to publish when a tag is created.
- [ ] Improve `view` command
  - [ ] Add `-s, --start` option (default: start of week)
  - [ ] Add `-e, --end` option (default: now)
  - [ ] Show total time and time between `--start` and `--end`
- [ ] Add `status` command
  - [ ] Displays cycles and hours on a given day.
  - [ ] The day is set by `-d, --day` (default: today).
- [ ] Implement Triggers
  - [ ] Triggers are a list of shell commands to execute when something occurs on a workspace.
  - [ ] Add triggers for `clockin` and `clockout`
  - [ ] Change how json files are written to beautify so it's easy to add triggers via the file.
  - [ ] Add `--no-trigger` option to any command that can cause triggers.

## Workspace File Rework For Triggers
```json
{
  "name": "",
  "clocks": [],
  "triggers": {
    "clockin": [],
    "clockout": []
  }
}
```