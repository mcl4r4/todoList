const BASE_URL = 'http://localhost:3333/api'

const editarItem = async (id) => {

    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        });

        if(res.ok){
            showMessage("Item dditado", "green");
        }else{
            showMessage("Item não editado", "red");
        }


        
    } catch (error) {
        console.log(error)
    }

}