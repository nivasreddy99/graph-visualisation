import { useState, useEffect } from "react";
import styles from "./PaperModal.module.css";
import ReactMarkdown from "react-markdown";
import papermd from "../../../assets/docs/paper.md?raw";

const PaperModal = ({ onClose }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => setMarkdown(papermd), []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.PaperModal}>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        <div>
          <ReactMarkdown
            components={{
              img: ({ alt, src, title }) => (
                <img
                  alt={alt}
                  src={src}
                  title={title}
                  style={{ width: "100%" }}
                />
              ),
              // add p with font-size 1rem
              p: ({ node, ...props }) => (
                <p {...props} style={{ fontSize: "1.2rem" }} />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PaperModal;
