import React from 'react';
import Webcam from 'react-webcam';

const imageStyle = {
  marginTop: '20px',
  width: '300px',
  height: '100%',
  borderWidth: '4px',
  borderColor: 'white',
  borderStyle: 'dashed',
  borderRadius: '15px',
}

class WebCamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = (username) => {
    const imageSrc = this.webcam.getScreenshot();
    let byteString = atob(imageSrc.split(',')[1]);
    let mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let img = new Blob([ab], {type: mimeString});
    let formData = new FormData();
    formData.append('username', username)
    formData.append('image', img, `${username}.png`)
    return formData
  };



  render() {
    const videoConstraints = {
      width: 720,
      height: 720,
      facingMode: "user"
    };

    return (
      <div>
        <Webcam
          style={imageStyle}
          audio={false}
          height={'100%'}
          ref={this.setRef}
          screenshotFormat="image/png"
          width={350}
          videoConstraints={videoConstraints}
        />
      </div>
    )
  }
}

export default WebCamCapture;