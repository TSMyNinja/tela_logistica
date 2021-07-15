import React,{useState, useEffect} from  'react';
import { getPosts, getPosts1, getPosts2 }  from '../services/Post.services';
import Popup from '../Pages/teste';
import 'reactjs-popup/dist/index.css';
import Select from "react-dropdown-select";
import api from '../services/api'


function Page() {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [sadas, setewjopfosdj] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  const [value, setValue]  = useState("0") ;

    function fetchPosts() {
      getPosts()
        .then(obj => setPosts(obj))
    }

    function fetchPosts1() {
      getPosts1()
      .then(obj => setPosts1(obj))
    }

    
    function fetchPosts1() {
      getPosts1()
      .then(obj => setPosts1(obj))
    }

    function asodasdaso(){
      setButtonPopup(true)
    }



    useEffect(() =>{
      fetchPosts()
      fetchPosts1()
    }, [])

    useEffect(() =>{
      console.log(posts,posts1,posts2)
    }, [posts])

    const handleChange = (e) => {
      setValue(e.target.value);

    }
    async function handleSubmit (e){
      e.preventDefault()
      const dados ={id: value}

      const  res = await api.post('filter',dados)
      console.log("apiRes",res)
      setPosts2(res.data)
      console.log(posts2) ;
    }

      return(
        <div className="div1">
        <header>
          <h2>
            Teste
          </h2>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            <select  onChange={handleChange}>
            <option value="0">Todos</option>
            {posts1.map((posts) => (     
              <option value={posts.id_cda}>{posts.descricao}</option>
            ))}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
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
          {
          (value === value) && 
            <tbody>
              {posts2.map((posts) => (     
                  <tr>
                    <td>{posts.id_cda}</td>
                    <td>{posts.cda_descricao}</td>
                    <td>{posts.veiculo_descricao}</td>
                    <td>{posts.qtd_litros_abastec_padrao}</td>
                    <td>{posts.media_padrao}</td>
                    <button  onClick={() =>{
                      setButtonPopup(true);
                      setewjopfosdj(posts.cda_descricao);
                    }

                    }></button>
                    
                    <td className="X"> X </td>

                  </tr>
                
                  
              ))}
            </tbody>
          }

        </table>
        
        <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
                    <h1 className="text-center">{sadas}</h1>
                    <form className="form-center">
                      <h4>Qtd. de Litros</h4>
                      <input className="input"></input>
                      <h4>Média Padrão</h4>
                      <input className="input"></input>
                    </form>
        </Popup>
      </div>
    );

}
export default Page;