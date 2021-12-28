import type { Arguments, CommandBuilder } from 'yargs';

export const command: string = 'contractEvent <command>';
export const desc: string = 'contract use case';

type Options = {
    command: string;
};

export const builder: CommandBuilder<Options,Options> = (yargs) =>
    yargs
        // .positional("command", {
        // choices: ["deployMyCoin"],
        // demandOption:true,})
        .commandDir('./contractEventCmds')

export  function handler(argv: Arguments<Options>){
};
