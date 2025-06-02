import { initVideo } from "./video.js";
import { initImage } from "./image.js";

electronBridge.getConfig().then(config => {
    if (config.type === "video") {
        initVideo(config)
    } else if (config.type === "image") {
        initImage(config)
    }
})

