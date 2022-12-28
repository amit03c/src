import Image from "../Elements/Image";

const ImageUploadPreview = ({
  onChange=()=>{},
  onRemove=()=>{},
  setImage,
  image,
  label,
  labelClasses,
  inputRequired,
  data,
}) => {
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async function handleFileSelect(event) {
    const file = event.target.files[0];
    
    const base64 = await getBase64(file);
    
    onChange({image: base64});
    

    // Do something with the base64 string
  }

  
  return (
    <>
      <div className="image-upload-preview">
        {label && (
          <div
            className={
              "input-label" +
              (" " + labelClasses) +
              (inputRequired ? " required" : "")
            }
          >
            {label}
          </div>
        )}
        <div className="image-preview">
          {data &&
            data.map((item,i) => (
              <div className="item" key={i}>
                <button
                  type="button"
                  className="item-remove"
                  onClick={()=>{
                    onRemove(i)
                  }}
                >
                  <i className="fa-regular fa-fw fa-xmark"></i>
                </button>
                <div className="item-inner">
                  <Image
                    src={item.image}
                    alt={""}
                    width={"100%"}
                    height={"100%"}
                    effect={"blur"}
                  />
                </div>
              </div>
            ))}
          <div className="item add-item">
            <div className="item-inner">
              <input
                type="file"
                className="item-input"
                onChange={handleFileSelect}
              />
              <i className="fa-light fa-fw fa-arrow-up-from-bracket"></i>
              <span>Upload</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadPreview;
