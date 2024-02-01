function startRecordingAndSend(durationInSeconds) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        const audioContext = new AudioContext();
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];
  
        mediaRecorder.ondataavailable = function(event) {
          chunks.push(event.data);
        };
  
        mediaRecorder.onstop = function() {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          sendAudioToServer(audioBlob);
        };
  
        mediaRecorder.start();
  
        setTimeout(() => {
          mediaRecorder.stop();
        }, durationInSeconds * 1000);
      })
      .catch(function(err) {
        console.error('Error accessing the microphone:', err);
      });
  }
  
function sendAudioToServer(audioBlob) {
    const formData = new FormData();
    formData.append('audio_data', audioBlob, 'recorded_audio.wav');
  
    fetch('/micfile', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Audio sent successfully.');
      } else {
        throw new Error('Failed to send audio.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  

startRecordingAndSend(10); 
  