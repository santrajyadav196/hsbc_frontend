import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // make sure this is imported somewhere globally

const defaultOptions = {
  transition: Slide,
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeButton: false,
  className: "text-center shadow-sm px-3 rounded", // general bootstrap-like styles
  bodyClassName: "m-0", // tighter spacing
  toastClassName: "toast", // you can override further if needed
};

const showToast = (message, type = "default", options = {}) => {
  const mergedOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, {
        ...mergedOptions,
        className: `${mergedOptions.className}`,
      });
      break;
    case "error":
      toast.error(message, {
        ...mergedOptions,
        className: `${mergedOptions.className}`,
      });
      break;
    case "info":
      toast.info(message, {
        ...mergedOptions,
        className: `${mergedOptions.className}`,
      });
      break;
    case "warning":
      toast.warn(message, {
        ...mergedOptions,
        className: `${mergedOptions.className}`,
      });
      break;
    default:
      toast(message, {
        ...mergedOptions,
        className: `${mergedOptions.className}`,
      });
  }
};

export default showToast;
