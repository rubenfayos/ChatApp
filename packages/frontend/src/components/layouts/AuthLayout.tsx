import { JSX } from "solid-js";

type Props = {
  children?: JSX.Element;
};

function AuthLayout(props: Props) {
  return (
    <div class="flex h-screen">
      <div class="w-full">
        <div class="bg-blue-500 h-full"></div>
      </div>
      <div class="w-full flex">
        <div class="m-auto">
          <div class="border rounded p-6" style={{ width: "400px" }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
