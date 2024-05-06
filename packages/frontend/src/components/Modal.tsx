import { JSX } from "solid-js";

type Props = {
  handleClose: () => void;
  children: JSX.Element;
  title?: string;
};

function Modal({ handleClose, children, title }: Props) {
  const onClose = () => {
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  return (
    <div
      class={`fixed inset-0 p-4 flex items-center justify-center z-30 transition-opacity`}
    >
      <div style={{ opacity: "0.25" }} class="fixed inset-0 bg-black"></div>
      <div
        class={`bg-white rounded-lg shadow-lg w-full mx-4 max-w-md p-6 z-10
          transition-opacity transform`}
      >
        <div class="flex justify-between items-center gap-x-2 mb-4 ">
          <h3 class="text-2xl font-bold">{title ?? ""}</h3>
          <button
            type="button"
            class="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none"
            onClick={onClose}
          >
            <span class="material-icons">{"close"}</span>
          </button>
        </div>
        <div
          class="flex flex-col justify-center gap-4"
          style={{ "min-height": "80px" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
