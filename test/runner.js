/* global Command, Runner, command, commandCore, commandOptions, group */
describe('Runner', () => {
  describe('constructor', () => {
    context('given a command', () => {
      it('uses the given command', () => {
        var runner = new Runner(command)
        runner.command.should.equal(command)
      })
    })

    context('given a core', () => {
      it('uses a command with the given core', () => {
        var runner = new Runner(commandCore)
        runner.command.should.deep.equal(new Command(commandCore))
      })
    })

    context('given a core and options', () => {
      it('uses a command with the given core and options', () => {
        var runner = new Runner(commandCore, commandOptions)
        runner.command.should.deep.equal(command)
      })
    })

    context('given a group', () => {
      it('uses the given group', () => {
        new Runner(group).command.should.equal(group)
      })
    })
  })

  describe('#run()', () => {
    context('using a Command', () => {
      it('calls #runCommand()')
    })

    context('using a CommandGroup', () => {
      it('calls #runGroup()')
    })
  })
})
