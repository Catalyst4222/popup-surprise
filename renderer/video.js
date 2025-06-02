

export function initVideo(config) {
    console.log("C")

    const body = document.body;
    const video = document.createElement('video');
    const source = document.createElement("source");

    console.log(body, video, source)

    video.autoplay = true;
    video.playsInline = true;

    source.setAttribute('src', config.video.path)       // Name of file
    source.setAttribute('type', config.video.mimeType)  // MIME type of file

    video.volume = 0.2
    video.appendChild(source)
    body.appendChild(video)




    // Resizing the screen and video to play nice
    video.addEventListener("loadedmetadata", (event) => {
        console.log(event)
        let { videoWidth, videoHeight } = event.target;
        const ratio = videoWidth / videoHeight;

        electronBridge.getScreenSize().then((result) => {
            const {width: screenWidth, height: screenHeight} = result;

            videoHeight = screenHeight;
            videoWidth = videoHeight * ratio;

            if (videoWidth > screenWidth) {
                videoWidth = screenWidth;
                videoHeight = screenWidth / ratio
            }

            console.log(screenWidth, screenHeight);
            console.log(videoWidth, videoHeight, ratio)

            electronBridge.resize(videoWidth, videoHeight)
            video.width = videoWidth
            video.height = videoHeight

        });



    })


    // Close the window right after the video ends
    video.addEventListener('ended', function() {
        if (config.video.closeOnEnd) {
            window.electronBridge.quit()
        }
    });
};