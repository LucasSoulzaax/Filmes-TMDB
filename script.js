const resultado = document.querySelector("#resultado");
const pesquisarInput = document.querySelector("#pesquisar");
const botao = document.querySelector("#botao");

async function buscar_popular(query = '') {
    try {
        let url = "https://api.themoviedb.org/3/movie/popular?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR";
        
        if (query) {
            // Se houver uma consulta, atualize a URL para pesquisar
            url = `https://api.themoviedb.org/3/search/movie?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR&query=${encodeURIComponent(query)}`;
        }

        const resposta = await fetch(url);
        const dados = await resposta.json();
        const filmes = dados.results;

        // Limpa os resultados anteriores
        resultado.innerHTML = '';

        filmes.forEach((filme_da_vez) => {
            const card = document.createElement("div");
            card.className = "card";

            const titulo = document.createElement("p");
            titulo.textContent = filme_da_vez.title;
            titulo.className = "nome";

            const imagem = document.createElement("img");
            imagem.src = `https://image.tmdb.org/t/p/w500${filme_da_vez.poster_path}`;
            imagem.className = "imagem";

            // Criação do botão de descrição
            const btn = document.createElement('button');
            btn.className = "botaozin";
            btn.textContent = "Mostrar Descrição";

            // Criação do elemento de descrição (inicialmente oculto)
            const texto = document.createElement("p");
            texto.textContent = filme_da_vez.overview;
            texto.className = "texto";
            texto.style.display = "none"; // Descrição inicialmente escondida

            // Evento do botão para mostrar/ocultar a descrição
            btn.addEventListener('click', () => {
                texto.style.display = texto.style.display === "none" ? "block" : "none";
            });

            // Adiciona os elementos ao card
            card.appendChild(titulo);
            card.appendChild(imagem);
            card.appendChild(btn);
            card.appendChild(texto);

            // Adiciona o card ao resultado
            resultado.appendChild(card);
        });

    } catch (error) {
        console.log(error);
    }
}

// Carrega filmes populares ao iniciar
buscar_popular();

botao.addEventListener("click", () => {
    const query = pesquisarInput.value.trim();
    buscar_popular(query);
});

// Opcional: Adiciona um evento de pressionar Enter para buscar filmes
pesquisarInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = pesquisarInput.value.trim();
        buscar_popular(query);
    }
});
