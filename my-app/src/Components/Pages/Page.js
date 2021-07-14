  
import React,{useState, useEffect} from  'react';
import { getPosts, getPosts1, getPosts2 }  from '../services/Post.services';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Page() {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);

    function fetchPosts() {
      getPosts()
        .then(obj => setPosts(obj))
    }

    function fetchPosts1() {
      getPosts1()
      .then(obj => setPosts1(obj))
    }
    function fetchPosts2() {
      getPosts2()
      .then(obj => setPosts2(obj))
    }


    useEffect(() =>{
      fetchPosts()
      fetchPosts1()
      fetchPosts2()
    }, [])

    useEffect(() =>{
      console.log(posts,posts1,posts2)
    }, [posts])

    function sayHello() {
      console.log(posts);
    }


    return(
      <div className="div1">
      <header>
        <h2>
          Teste
        </h2>
      </header>
      <select>Filtro</select>
      <table className="tabela1">
        <thead>
            <th>Serial</th>
            <th>CDM</th>
            <th>Modelo</th>
            <th>Qtd. de Litros</th>
            <th>Média Padrão</th>
            <th>Editar</th>
            <th>Deletar</th>
            
            
        </thead>

        <tbody>
              {posts.map((posts) => (     
                  <tr>
                    <td>{posts.id_cda}</td>
                    <td>{posts.cda_descricao}</td>
                    <td>{posts.veiculo_descricao}</td>
                    <td>{posts.qtd_litros_abastec_padrao}</td>
                    <td>{posts.media_padrao}</td>
                    <td><a href="/"> ✎ </a></td>
                    <td>
                      <Popup trigger={<button className="button5 X"> X </button>} position="center">
                        <div> Tem certeza que deseja excluir? <button>Sim</button><button>Não</button></div>
                      </Popup></td>
                  </tr>
              ))}
            
        </tbody>

      </table>
      
    </div>
  );
}
export default Page;