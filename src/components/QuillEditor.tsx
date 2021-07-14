import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "@services/image";
import { useDropzone } from "react-dropzone";
// @ts-ignore
import ImageResize from "quill-image-resize";

Quill.register("modules/ImageResize", ImageResize);

const QuilEditor = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) => {
  const editorRef = React.useRef<any>(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({});

  const onDrop = (acceptedFiles: File[]) => {
    try {
      acceptedFiles.forEach(async (file) => {
        if (!editorRef.current) return;
        const formData = new FormData();
        formData.append("file", file);
        const data = await uploadImage(formData);
        const quill = editorRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", data);
        quill.setSelection(range.index + 1);
        quill.focus();
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    onDrop(acceptedFiles);
  }, [acceptedFiles]);

  const modules = {
    ImageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: open,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "size",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "ordered",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  return (
    <>
      <ReactQuill
        placeholder="자세한 설명을 입력하세요."
        ref={editorRef}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={(value) => onChange(value)}
      />
      <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
        </div>
      </div>
    </>
  );
};

export default QuilEditor;
