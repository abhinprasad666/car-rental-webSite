import { toast } from "react-toastify";


export const showToast = (message, type = "success", toastId = null) => {
  if (toastId && toast.isActive(toastId)) return;

  const options = {
    position: "top-right",
    autoClose: 2000,
    toastId: toastId || undefined,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
  }
};