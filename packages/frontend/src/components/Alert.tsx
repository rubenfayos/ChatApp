import { createSignal, createEffect, onCleanup } from "solid-js";

interface AlertProps {
  type: string;
  title: string;
  message: string;
  container: HTMLDivElement;
}

const getAlert = (props: AlertProps) => {
  const [isVisible] = createSignal(true);

  // const closeAlert = () => {
  //   console.log("close");
  //   setIsVisible(false);
  // };

  onCleanup(() => {});

  createEffect(() => {
    if (!isVisible()) {
      props.container.removeChild(alertDiv);
    }
  });

  const alertDiv = document.createElement("div");
  props.container.appendChild(alertDiv);

  const { type, message } = props;

  if (isVisible()) {
    alertDiv.innerHTML = `
    <div class="fixed left-0 bottom-0 p-4 z-50">
      <div class="min-w-60 left-0 bottom-0 bg-${type}-200 border-t-4 border-${type}-500 rounded-b px-4 py-3 shadow-md z-50" role="alert">
        <div class="flex gap-2">
          <div>
            <span role="button" onClick={closeAlert} class="material-icons">close</span>
          </div>
          <div>
            <p class="text-${type}-500">${message}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  console.log(alertDiv.innerHTML);

  return alertDiv;
};

type AlertType = "info" | "success" | "warning" | "error";

const showAlert = (message: string, type: AlertType) => {
  // Create a container for alerts if it doesn't exist
  const alertContainer =
    (document.getElementById("alert-container") as HTMLDivElement) ||
    document.createElement("div");
  alertContainer.id = "alert-container";

  // Attach the container to the body if it's a new one
  if (!document.getElementById("alert-container")) {
    document.body.appendChild(alertContainer);
  }

  // Mount the Alert component into the created div
  const alertDiv = getAlert({
    type: type || "info", // Default to 'info' if type is not provided
    title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the type for the title
    message,
    container: alertContainer,
  });

  // Automatically remove the div after a delay (e.g., 5000 milliseconds)
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
};

export { showAlert };
