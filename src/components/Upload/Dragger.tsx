import React, {FC, useState} from 'react';
import classNames from 'classnames';

interface DraggerProps {
  onFile: (files: FileList) => void;
  children: React.ReactNode;
}

export const Dragger: FC<DraggerProps> = (props: DraggerProps) => {
  const {onFile, children} = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames('mirage-uploader-dragger', {
    'is-dragover': dragOver
  });

  const handleDragOver = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDragOver(e, true)}
      onDragLeave={(e) => handleDragLeave(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;
