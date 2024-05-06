import { createSignal } from "solid-js";
import { RegisterInput } from "types";
import { registerSchema } from "./schemas";
import { api } from "~/utils/api";
import { useNavigate } from "@solidjs/router";
import { checkFormErrors } from "~/utils/checkFormErrors";

function RegisterForm() {
  const nav = useNavigate();

  const [formData, setFormData] = createSignal<RegisterInput>({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
  });

  const [formErrors, setFormErrors] = createSignal<RegisterInput>({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setFormData({ ...formData(), [target.id]: target.value });
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const formErrors = checkFormErrors(registerSchema, formData());

    if (formErrors) {
      setFormErrors(formErrors as RegisterInput);
      return;
    }

    const parsed = registerSchema.parse(formData());

    const res = await api.post("/auth/register", parsed);

    console.log(res);

    if (res.status === 201) {
      nav("/login");
    }
  };

  return (
    <form class="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div>
        <label for="email">Email</label>
        <br />
        <input
          required
          class="w-full border rounded p-1 text-sm"
          type="email"
          id="email"
          onChange={handleChange}
          value={formData().email}
        />
        <p class="text-red-500">{formErrors().email}</p>
      </div>
      <div>
        <label for="password">Nombre</label>
        <br />
        <input
          required
          class="w-full border rounded p-1 text-sm"
          type="text"
          id="name"
          onChange={handleChange}
          value={formData().name}
        />
        <p class="text-red-500">{formErrors().name}</p>
      </div>
      <div>
        <label for="password">Contraseña</label>
        <br />
        <input
          class="w-full border rounded p-1 text-sm"
          type="password"
          id="password"
          onChange={handleChange}
          value={formData().password}
        />
        <p class="text-red-500">{formErrors().password}</p>
      </div>
      <div>
        <label for="password">Confirmar contraseña</label>
        <br />
        <input
          class="w-full border rounded p-1 text-sm"
          type="password"
          id="confirm_password"
          onChange={handleChange}
          value={formData().confirm_password}
        />
        <p class="text-red-500">{formErrors().confirm_password}</p>
      </div>
      <div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
