import {Workbox} from "workbox-window";

let wb = null;


if ("serviceWorker" in navigator) {
    wb = new Workbox(`service-worker.js`);

    wb.addEventListener("controlling", () => {
        window.location.reload();
    });

    wb.register();
}

export default wb;