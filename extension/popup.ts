const createBtn = document.getElementById("create") as HTMLButtonElement;
const addressSpan = document.getElementById("address") as HTMLElement;
const recipientInput = document.getElementById("recipient") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const sendBtn = document.getElementById("send") as HTMLButtonElement;

let privateKey: string | undefined;

createBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "createAccount" }, (response) => {
    addressSpan.textContent = response.address;
    privateKey = response.privateKey;
  });
});

sendBtn.addEventListener("click", () => {
  if (!privateKey) {
    return;
  }
  chrome.runtime.sendMessage(
    { type: "transfer", privateKey, to: recipientInput.value, amount: Number(amountInput.value) },
    (res) => {
      if (res.success) {
        // eslint-disable-next-line no-alert
        alert(`Tx hash: ${res.hash}`);
      } else {
        // eslint-disable-next-line no-alert
        alert(res.error);
      }
    },
  );
});
