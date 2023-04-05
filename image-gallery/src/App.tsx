import React, { useCallback, useRef, useState } from "react";
import ImageBox from "./components/ImageBox";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [imageList, setImageList] = useState<string[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setImageList((prev) => [...prev, event.target?.result as string]);
        };
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="container">
      <div className={`gallery-box ${imageList.length > 0 ? "row" : ""}`}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다. <br />
            이미지를 추가해주세요.
          </div>
        )}

        {imageList.map((val, idx) => (
          <ImageBox key={val + idx} src={val} />
        ))}

        <div className="plus-box" {...getRootProps()}>
          <input {...getInputProps()} />+
        </div>
      </div>
    </div>
  );
}

export default App;
