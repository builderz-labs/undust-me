import { Connection } from '@solana/web3.js';

export const printExplorerLink = (
  customString: string,
  sig: string | void,
  connection: Connection
) => {
  if (!sig) {
    return;
  }

  console.log(
    `${
      customString ? customString + '\n' : ''
    }https://explorer.solana.com/tx/${sig}?cluster=custom&customUrl=${
      connection.rpcEndpoint === 'http://0.0.0.0:8899'
        ? 'http://localhost:8899'
        : connection.rpcEndpoint
    }`
  );
};
