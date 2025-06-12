import { Account, Endless, EndlessConfig, Network } from "@endlesslab/endless-ts-sdk";

const endless = new Endless(new EndlessConfig({ network: Network.LOCAL }));

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    if (message.type === "createAccount") {
      const account = Account.generate();
      sendResponse({ address: account.accountAddress.toString(), privateKey: account.privateKey.toString() });
      return;
    }

    if (message.type === "transfer") {
      const { privateKey, to, amount } = message;
      try {
        const account = await Account.fromPrivateKey({ privateKey });
        const transaction = await endless.transaction.build.simple({
          sender: account.accountAddress,
          data: {
            function: "0x1::coin::transfer",
            typeArguments: ["0x1::endless_coin::EndlessCoin"],
            functionArguments: [to, amount],
          },
        });
        const committed = await endless.signAndSubmitTransaction({ signer: account, transaction });
        sendResponse({ success: true, hash: committed.hash });
      } catch (e) {
        sendResponse({ success: false, error: (e as Error).message });
      }
      return;
    }
  })();
  return true;
});
