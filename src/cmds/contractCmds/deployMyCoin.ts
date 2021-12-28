import {ethers} from "ethers";

import type { Arguments, CommandBuilder } from 'yargs';
import {ContractService} from "../../services/contract";

type Options = {
    providerUrl: string;
    privateKey: string;
};

export const command: string = 'deployMyCoin <providerUrl> <privateKey>';
export const desc: string = 'deploy MyCoin';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs.positional('providerUrl', { type: 'string', demandOption: true })
        .positional('privateKey', { type: 'string', demandOption: true });

export async function handler(argv: Arguments<Options>): Promise<void> {
    const { providerUrl, privateKey } = argv;
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider)
    const service = new ContractService(provider, wallet)
    await service.deployMyCoin()
    // process.stdout.write(upper ? greeting.toUpperCase() : greeting);
    process.exit(0);
};
