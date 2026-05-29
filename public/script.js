const songsContainer = document.getElementById("songsContainer");

async function cargarCanciones() {

    const res = await fetch("/api/canciones");
    const canciones = await res.json();

    if(canciones.length === 0){
        songsContainer.innerHTML = `
            <p>No hay canciones disponibles.</p>
        `;
        return;
    }

    songsContainer.innerHTML = canciones.map(c => `
        <div class="song-card">
            <img src="${c.portada_url || 'https://via.placeholder.com/300'}">

            <h3>${c.titulo}</h3>

            <p>${c.artista || 'Desconocido'}</p>

            <p>${c.album || 'Sin álbum'}</p>

            <button onclick="reproducir('${c.archivo_url}','${c.titulo}','${c.artista}')">
                ▶ Reproducir
            </button>

            <a href="${c.archivo_url}" download>
                <button>⬇ Descargar</button>
            </a>
        </div>
    `).join("");
}

const audio = document.getElementById("audioPlayer");

function reproducir(url,titulo,artista){

    audio.src = url;
    audio.play();

    document.getElementById("playerTitle").textContent = titulo;
    document.getElementById("playerArtist").textContent = artista;
}

document.getElementById("volumeBar").addEventListener("input",(e)=>{
    audio.volume = e.target.value;
});

cargarCanciones();