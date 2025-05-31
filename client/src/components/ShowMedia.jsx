import { File } from "lucide-react";
import { useState } from "react"

const ShowMedia = ({mediaType,mediaUrl,mediaName}) => {
  const previewMediaTypes = [
    'image',
    'video',
    'audio',
  ];

  return (
            <div className=''>
             
              { mediaType?.includes('image') && 
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono font-bold  text-xs sm:text-sm px-1">{mediaName}</h3>
                  <a href={mediaUrl} download={true} target="_blank">
                    <img 
                    id='image' 
                    title={mediaName}
                    src={mediaUrl} 
                    // onDoubleClick={() => document.getElementById('image').requestFullscreen()}
                    />
                  </a>
                </div>
              }

              { 
                mediaType?.includes('video') && 
                <div  className="flex flex-col gap-1"> 
                  <h3 className="font-mono font-bold  text-xs sm:text-sm px-1">{mediaName}</h3>
                  <video controls className="max-w-full max-h-60">
                    <source src={mediaUrl} type={mediaType} title={mediaName}/>
                  </video>
                </div>
              }

              {
                mediaType?.includes("audio") && 
                <audio controls >
                  <source src={mediaUrl} type={mediaType} />
                </audio>
              }

              
              {!previewMediaTypes.some((type) => mediaType?.includes(type)) && (
                <a
                  target="_blank"
                  id="iframe"
                  src={mediaUrl}
                  title="PDF preview"
                  className="flex gap-2 text-xs sm:text-sm items-center p-5  h-[50px] text-blue-500 font-bold font-mono text-black"
                  href={mediaUrl}
                > 
                  <File className="text-gray-400 "/>
                  {mediaName?.slice(0,30) + `${mediaName?.length > 30 ? "..." : ""}`}
                </a>
              )}
            </div>
  )}
export default ShowMedia