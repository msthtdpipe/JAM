const songsContainer = document.getElementById("songsContainer");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerCover = document.getElementById("playerCover");

let canciones = [];
let cancionActual = null;

async function cargarCanciones() {
  try {
    const res = await fetch("/api/canciones");
    canciones = await res.json();

    cargarGeneros();
    mostrarCanciones(canciones);
  } catch (error) {
    songsContainer.innerHTML = "<p>Error al cargar canciones.</p>";
  }
}

async function cargarGeneros() {
  try {
    const res = await fetch("/api/generos");
    const generos = await res.json();

    genreFilter.innerHTML = `<option value="">Todos los géneros</option>`;

    generos.forEach(genero => {
      const option = document.createElement("option");
      option.value = genero.nombre;
      option.textContent = genero.nombre;
      genreFilter.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar géneros:", error);
  }
}

function mostrarCanciones(lista) {
  if (lista.length === 0) {
    songsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No hay canciones disponibles</h3>
        <p>Agrega canciones publicadas en la base de datos para mostrarlas aquí.</p>
      </div>
    `;
    return;
  }

  songsContainer.innerHTML = lista.map((c, index) => `
    <article class="song-card">
      <img src="${c.portada_url || 'https://via.placeholder.com/500x300?text=JAM'}" alt="Portada de ${c.titulo}">

      <div class="song-content">
        <h3>${c.titulo}</h3>

        <div class="song-meta">
          <p><strong>Artista:</strong> ${c.artista || "Desconocido"}</p>
          <p><strong>Álbum:</strong> ${c.album || "Sin álbum"}</p>
          <p><strong>Género:</strong> ${c.genero || "Sin género"}</p>
          <p><strong>Duración:</strong> ${formatearDuracion(c.duracion_seg)}</p>
        </div>

        <div class="song-actions">
          <button onclick="reproducirCancion(${index})">▶ Reproducir</button>
          <a class="download-btn" href="${c.archivo_url}" download>⬇ Descargar</a>
        </div>
      </div>
    </article>
  `).join("");
}

function filtrarCanciones() {
  const texto = searchInput.value.toLowerCase();
  const genero = genreFilter.value;

  const filtradas = canciones.filter(c => {
    const coincideTexto =
      c.titulo?.toLowerCase().includes(texto) ||
      c.artista?.toLowerCase().includes(texto) ||
      c.album?.toLowerCase().includes(texto);

    const coincideGenero = genero === "" || c.genero === genero;

    return coincideTexto && coincideGenero;
  });

  mostrarCanciones(filtradas);
}

function reproducirCancion(index) {
  cancionActual = index;
  const c = canciones[index];

  audio.src = c.archivo_url;
  audio.play();

  playerTitle.textContent = c.titulo;
  playerArtist.textContent = c.artista || "Artista desconocido";
  playerCover.src = c.portada_url || "https://via.placeholder.com/300";

  playPauseBtn.textContent = "⏸";
}

playPauseBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const progreso = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progreso;
});

progressBar.addEventListener("input", () => {
  if (!audio.duration) return;

  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;

  if (volumeBar.value == 0) {
    volumeIcon.textContent = "🔈";
  } else if (volumeBar.value < 0.4) {
    volumeIcon.textContent = "🔉";
  } else if (volumeBar.value < 0.75) {
    volumeIcon.textContent = "🔊";
  } 
});
const volumeIcon = document.getElementById("volumeIcon");

searchInput.addEventListener("input", filtrarCanciones);
genreFilter.addEventListener("change", filtrarCanciones);

function formatearDuracion(segundos) {
  if (!segundos) return "No indicada";

  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;

  return `${min}:${seg.toString().padStart(2, "0")}`;
}


const themeBtn = document.getElementById("themeBtn");
const logoImg = document.getElementById("logoImg");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "☀︎";
    logoImg.src = "foto2.png";

  } else {
    themeBtn.textContent = "☾";
    logoImg.src = "foto1.png";
  }
});

const supportForm = document.getElementById("supportForm");

supportForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const reporte = {
    cancion_id: null,
    tipo: document.getElementById("supportType").value,
    descripcion: document.getElementById("supportMessage").value
  };

  try {

    const res = await fetch("/api/reportes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reporte)
    });

    const data = await res.json();

    alert(data.mensaje);

    supportForm.reset();

  } catch (err) {
    alert("Error al enviar reporte");
  }
});

cargarCanciones();