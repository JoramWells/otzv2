/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ChangeEvent, type DragEvent, useEffect, useState } from 'react'

interface InputProps {
  onFileSelected: (file: File[]) => void
}

const DragNDrop = ({ onFileSelected }: InputProps) => {
  const [files, setFiles] = useState<File[]>([])

  //
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList | null = e.target.files
    if (selectedFiles !== null) {
      if (selectedFiles.length > 0) {
        const newFiles = Array.from(selectedFiles)
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
      }
    }
  }

  //
  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles: FileList | undefined = e.dataTransfer.files
    if (droppedFiles.length) {
      const newFiles = Array.from(droppedFiles)
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }

  useEffect(() => {
    onFileSelected(files)
  }, [files, onFileSelected])

  console.log(files, 'ghj')

  return (
    <div
    className='bg-blue-50  p-4'
    >
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => {
          e.preventDefault()
        }}

        className={`border border-slate-200 p-8 ${files.length > 0 && 'border-red-500'} `}
      >
        <p>Drag and drop file</p>
      </div>
      <input type="file" onChange={handleFileChange} />
      {files.length > 0 && (
        <div className="file-list">
          <div className="file-list__container">
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  <p>{file.name}</p>
                  {/* <p>{file.type}</p> */}
                </div>
                <div className="file-actions">
                  {/* <MdClear onClick={() => handleRemoveFile(index)} /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DragNDrop
