import LoginForm from "~/components/auth/LoginForm";

function LoginPage() {
  return (
    <div>
      <h1 class="text-3xl font-bold mb-6">Iniciar sesión</h1>
      <LoginForm />
      <p class="mt-4">
        ¿No tienes cuenta?{" "}
        <a class="text-blue-500 hover:text-blue-700" href="/register">
          Registrate
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
