document.addEventListener("DOMContentLoaded", function () {
    async function capturePhotoAndSave() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        const video = document.createElement('video');
        video.srcObject = stream;

        const videoTrack = stream.getVideoTracks()[0];

        try {
            await video.play();
        } catch (error) {
            console.error('Error playing video:', error);
        }

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        videoTrack.stop();
        stream.getTracks().forEach(track => track.stop());

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('photo', blob, 'captured_image.jpg');

            try {
                const response = await fetch('/save/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Image saved on the server');
                } else {
                    console.error('Failed to save image on the server');
                }
            } catch (error) {
                console.error('Fetch request error:', error);
            }
        }, 'image/jpeg');
    }

    capturePhotoAndSave();
});
