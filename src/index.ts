import "./index.scss";
import "./progress";

const killDelay = 2000;

const inlineLabel = document.getElementById("inline-label");
const promiseLabel = document.getElementById("promise-label");
const webWorkerLabel = document.getElementById("webworker-label");

document.getElementById("inline").onclick = () => {
  kill(killDelay,x => {
    console.log("from inline: ", x);
    inlineLabel.innerText = x.toString();
  });
};

document.getElementById("promise").onclick = () => {
  new Promise(function(resolve, reject) {
    kill(killDelay, x => {
      console.log("from promise: ", x);
      promiseLabel.innerText = x.toString();
    });
    resolve();
  });
};

document.getElementById("webworker").onclick = () => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([kill.toString(), `(${killWrapper})(${killDelay})`]))
  );
  worker.addEventListener("message", e => {
    console.log("from web worker: ", e.data);
    webWorkerLabel.innerText = e.data;
  });
};

function killWrapper(delay: number) {
  kill(delay, x => {
    (self as any).postMessage(x);
  });
  self.close();
}

function kill(delay: number, callback: (counter: number) => void) {
  const start = +new Date();
  let counter = 0;
  while (+new Date() - start < delay) {
    if (counter % 1000 === 0) {
      callback(counter / 1000);
    }
    counter++;
  }
}
