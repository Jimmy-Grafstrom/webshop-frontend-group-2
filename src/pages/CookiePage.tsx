const Cookies = () => {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 self-start">
      <h1 className="text-2xl font-bold mb-4">Om cookies</h1>
      <p className="mb-4">
        Vi använder en enda cookie, och den är nödvändig för att tjänsten ska
        fungera. Den kräver därför inget samtycke.
      </p>

      <h2 className="text-xl font-semibold mb-2">Cookien vi använder</h2>
      <ul className="mb-4 list-disc pl-5">
        <li><strong>Namn:</strong> token</li>
        <li><strong>Syfte:</strong> håller dig inloggad och ger säker åtkomst</li>
        <li><strong>Egenskaper:</strong> HttpOnly, går inte att läsa med JavaScript</li>
        <li><strong>Livslängd:</strong> tills du loggar ut eller sessionen går ut</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Vad vi inte använder</h2>
      <p className="mb-4">
        Inga cookies för statistik, reklam eller spårning.
      </p>

      <h2 className="text-xl font-semibold mb-2">Ta bort cookien</h2>
      <p>
        Du kan logga ut eller rensa cookies i webbläsaren. Då blir du utloggad.
      </p>
    </main>
  );
};

export default Cookies;