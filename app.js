const BASE_URL = 'http://localhost:3333/api'

const formCard = document.getElementById('item-form')
const message = document.getElementById('message')

//Funções utilitárias
const showMessage = (text, cor) => {
    message.textContent = text
    message.style.color = cor
}

//Iniciar o cadastro do itens

const handleFormSumit = async (event) => {
    event.preventDefault()

    const campoName = document.getElementById('name').value
    const campoDescription = document.getElementById('description').value


    const item = {
        name: campoName,
        description: campoDescription,
    }

    await sendtem(item)
    //console.log(JSON.stringify(item))

}
const sendtem = async (objItem) => {
    //console.log(objItem)

    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Connection: "close", //obrigatorio no post
            },
            body: JSON.stringify(objItem)
        })

        if (!res.ok) {
            console.log('Erro: ', res)
            return
        }

        console.log('Item cadastrado')
    } catch (error) {
        console.log(error)
    }

    showMessage('Atividade cadastrada', 'green')
};


const listItems = async () => {
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: 'GET',
            header: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.log('Erro ao listar itens')
            return
        }
        const items = await res.json();
        console.log(items);
        await showItems(items);
    } catch (error) {
        console.log(error);
    }

};

const showItems = async (items) => {

    const itemList = document.getElementById("item-list")
    itemList.innerHTML = "";

    const cards = items.map((item) => `
    <article class="item-card">
    
    <header class="item-card__header">
    <h2 class="item-card__title">${item.name}</h2>
    </header>
    
    <section class="item-card__body">
    <p class="item-card__description">${item.description}</p>
    </section>
    
    <footer class="item-card__footer">
    <button onclik="editarItem(${item.id})" class="item-card__button item-card__button--edit">Editar</button>
    <button onclick="deleteItem(${item.id})" class="item-card__button item-card__button--delete">Excluir</button>
    </footer>
    
    </article>
    `).join("");
    itemList.innerHTML = cards;
};
//Fim do cadastro de itens



//Inicio excluir item
const deleteItem = async (id) => {
    //console.log(id)

    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            showMessage("Item excluído com sucesso", "green");
            return;
        } else {
            showMessage("Item não excluído", "red");
        }

    } catch (error) {
        console.log(error);
    }
};
//Fim excluir item


//Inicio editar item
const editItem = async (id) => {
    const url = `pages/item.html?id=${id}`;
    window.location = url
}
//Fim editar item

//Eventos

formCard.addEventListener('submit', handleFormSumit);
document.addEventListener("DOMContentLoaded", listItems);