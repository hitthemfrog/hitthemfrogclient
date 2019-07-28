import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
import axios from 'axios'

import 'react-image-crop/dist/ReactCrop.css';
import './UploadImage.css';

export class uploadImage extends Component {
    state= {
        file: '',
        imagePreviewUrl: '',
        src: null,
        crop: {
          unit: "%",
          width: 30,
          aspect: 1 / 1
        }
    }

    //buat upload gambar
    fileUploadHandler = (e) => {
        // e.preventDefault();
        console.log('coba upload')
        console.log(this.state.file, " INI")
        let formData = new FormData();
        formData.append('socketId', 'socketa')
        formData.append('roomName', 'roomA')
        formData.append('image', this.state.file);
        console.log(formData , " ini form data")
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3000/uploadimage", formData, config)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        // console.log(file)
        reader.onloadend = () => {
        this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            src: reader.result
        });
        }

        reader.readAsDataURL(file)
    }

    // If you setState the crop in here you should return false.
    // fungsi crop start

    onSelectFile = e => {
        let file = e.target.files[0];
        this.setState({
            file: file,
        });
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
        // console.log(crop, " ini crop")
    };
    
    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "newFile.jpeg"
          );
          this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
            // console.log(blob.name)
          }, "image/jpeg");
        });
      }

    //fungsi crop end

    cobaganti() {
        console.log('keganti mas')
    }

    handleFileUpload() {
        console.log("handle file trigger");
        // console.log(this.refs);
        // this.file = this.$refs.file.files[0];
        // const file = this.$refs.file.files[0];
        // this.urlTemp = URL.createObjectURL(file);
        // console.log(this.urlTemp);
      }
    render() {
        // let {imagePreviewUrl} = this.state;
        // let $imagePreview = null;
        // if (imagePreviewUrl) {
        //   $imagePreview = (<img src={imagePreviewUrl} />);
        // } else {
        //   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="formImageBox">
                <div className="row">
                    <div>
                        <input type="file" onChange={this.onSelectFile} />
                        <button onClick={(e) => this.fileUploadHandler(e)}>coba upload</button>
                    </div>
                    <div className="col s12">
                        <form >
                            <div >
                            {src && (
                                <ReactCrop
                                src={src}
                                crop={crop}
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                                />
                                )}
                                {/* <img className="imgPreview" src={this.state.imagePreviewUrl}></img> */}
                                {/* {JSON.stringify(this.state.imagePreviewUrl)} */}
                                {/* {$imagePreview} */}
                            </div>
                            {/* <input type="file" ref="file" onChange={ (e)=>this._handleImageChange(e) }/> */}
                                {/* <p>Drag your files here or click in this area.</p> */}
                            {/* <button type="submit">Upload</button> */}
                        </form>
                        {croppedImageUrl && (
                            <>
                            {JSON.stringify(croppedImageUrl)}
                            <img alt="Crop" style={{ width: 180, borderRadius: '50%'}} src={croppedImageUrl} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default uploadImage
