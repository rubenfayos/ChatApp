import RegisterForm from "~/components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div>
      <h1 class="text-3xl font-bold mb-6">Registro</h1>
      <RegisterForm />
      <p class="mt-4">
        ¿Ya tienes cuenta?{" "}
        <a class="text-blue-500 hover:text-blue-700" href="/login">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
