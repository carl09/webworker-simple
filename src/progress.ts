import { interval, Subscription } from "rxjs";

const progress = document.getElementById("display") as HTMLProgressElement;

let i = 1;

const source = interval(50);

let subscribe: Subscription;

document.getElementById("start").onclick = () => {
  (document.getElementById("start") as HTMLButtonElement).textContent = subscribe
    ? "Start Animation"
    : "Stop Animation";

  if (subscribe) {
    subscribe.unsubscribe();
    subscribe = undefined;
    return;
  }
  subscribe = source.subscribe(() => {
    if (i > 100) {
      i = 0;
    }
    i++;

    progress.value = i;
  });
};

window.onunload = () => {
  if (subscribe) {
    subscribe.unsubscribe();
  }
};
