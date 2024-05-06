function DefaultPage() {
  return (
    <div class="h-full flex flex-1">
      <div class="m-auto text-center max-w-96">
        <span
          class="material-icons text-gray-400"
          style={{ "font-size": "40px" }}
        >
          chat
        </span>
        <h1 class="display-2 font-bold my-2 text-3xl">Bienvenido</h1>
        <p class="text-gray-800 text-xl">
          Selecciona un chat en el menú de la izquierda o añade uno pulsando en
          +
        </p>
      </div>
    </div>
  );
}

export default DefaultPage;
