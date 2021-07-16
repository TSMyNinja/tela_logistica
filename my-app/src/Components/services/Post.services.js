import Axios from 'axios';
export async function getPosts(){
    return Axios.get("http://127.0.0.1:5000/cda_padrao_abastecimentos").then(res => res.data)
}


export async function getPosts1(){
    return Axios.get("http://127.0.0.1:5000/cdas").then(res => res.data)
}

export async function getPosts2(){
    return Axios.get("http://127.0.0.1:5000/modelo_veiculos").then(res => res.data)
}

