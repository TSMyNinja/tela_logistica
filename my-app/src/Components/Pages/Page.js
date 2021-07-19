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
  const [posts3, setPosts3] = useState([]);
  const [st_cda, setCDA] = useState([]);
  const [st_veiculo, setVEICULO] = useState([]);  
  const [st_cdapadrao, setID_CDAPARAO] = useState([]);
  const [set_formlitros,  set_FormLitros] = useState([]);
  const [set_formedia, set_FormMedia] = useState([]);
  const [set_disVeiculos, set_VeiculosDisponivel] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [st_editar, setEDITAR] = useState(true);
  
  const [set_formnewlitros,  set_FormNewLitros] = useState([]);
  const [set_fornewmedia, set_FormNewMedia] = useState([]);


  const [set_newveiculo, set_NewVeiculo] = useState("1");
  const [set_newformedia, set_NewFormMedia] = useState("1");
  const [value, setValue]  = useState("0") ;

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
      .then(obj => setPosts3(obj))
    }




    useEffect(() =>{
      fetchPosts()
      fetchPosts1()
      fetchPosts2()
    }, [])

    useEffect(() =>{
      console.log(posts,posts1,posts2,posts3)
    }, [posts])



    const handleChange = (e) => {
      setValue(e.target.value);

    }

    const handleChangeMedia = (e) => {
      set_FormMedia(e.target.value);

    }
    const handleChangeLitros = (e) => {
      set_FormLitros(e.target.value);

    }


     async function  handleChangeNewCda (e) {
      set_NewFormMedia(e.target.value);
      console.log(set_newformedia)


      const dados1 = {idcda:set_newformedia}

      console.log(dados1)
    

    }
    const handleChangeNewViculos = (e) => {
      set_NewVeiculo(e.target.value);

    }


    const handleChangeNewMedia = (e) => {
      set_FormNewMedia(e.target.value);

    }
    const handleChangeNewLitros = (e) => {
      set_FormNewLitros(e.target.value);

    }







    const not = () => {
      setEDITAR(false);
      setButtonPopup1(false);
    }

    const popup = () => {
      setButtonPopup2(true)


    }


    
    const teste = () => {
      setEDITAR(true);

      if (st_editar === true){
        const dados1 ={ idcdapadrao:st_cdapadrao,litros: set_formlitros, media:set_formedia}
        console.log(dados1)

      }


    }

    async function handleSubmitNovo (e){
      e.preventDefault()
      const dados ={id: set_newformedia}
      const  res = await api.post('pesquisa',dados)
      console.log("apsadasdasdasdasiRes",res)
      set_VeiculosDisponivel(res.data)
      console.log(set_disVeiculos) ;
    }

    async function handleSubmit (e){
      e.preventDefault()
      const dados ={id: value}
      const  res = await api.post('filter',dados)
      console.log("apiRes",res)
      setPosts2(res.data)
      console.log(posts2) ;
    }

    async function handleSubmit1213 (e){

      const dados1 = {idcda:set_newformedia, idveiculo:set_newveiculo, media:set_fornewmedia , litros:set_formnewlitros}

      console.log(dados1)
    } 



    async function handleSubmit1 (e){
      e.preventDefault()
      setButtonPopup1(true)

    }

      return(
        <div className="div1">
        <header>
          <h2>
            Teste
          </h2>
        </header>
        <form className=""onSubmit={handleSubmit}>
        <button className="enviar" onClick={popup}>Novo</button>
          <label>
            <select className="option"  onChange={handleChange}>
            <option className="option" value="0">Todos</option>
              {posts1.map((posts) => (     
                <option value={posts.id_cda}>{posts.descricao}</option>
              ))}
            </select>
          </label>
          <input className="enviar2 margin-fix2" type="submit" value ="Submit"/>
          
        </form>

        <table className="tabela1">
          <thead>
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
                    <td>{posts.cda_descricao}</td>
                    <td>{posts.veiculo_descricao}</td>
                    <td>{posts.qtd_litros_abastec_padrao}</td>
                    <td>{posts.media_padrao}</td>
                    <button className="editar" onClick={() =>{
                      setButtonPopup(true);
                      setCDA(posts.cda_descricao);
                      setVEICULO(posts.veiculo_descricao);
                      setID_CDAPARAO(posts.id_cda_padrao_abastec);
                    }

                    }>✎</button>
                    
                    <td className="X"> X </td>

                  </tr>
                
                  
              ))}
            </tbody>
          }

        </table>
        
        <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
                    <h1 className="text-center">{st_cda}</h1>
                    <h1 className="text-center">{st_veiculo}</h1>
                    <form className="form-center" onSubmit={handleSubmit1}>
                      <h3 className="text-center">Qtd. de Litros</h3>
                      <input className="input" onChange={handleChangeLitros} ></input>
                      <h3 className="text-center">Média Padrão</h3>
                      <input className="input" onChange={handleChangeMedia}></input>
                      <input type="submit" className="enviar"></input>
                    </form>
        </Popup>


        <Popup trigger={buttonPopup1} setTriger={setButtonPopup1} >
          <h3 className="ajuste text-center">Deseja realmente editar este ...?</h3>
          <div className="simenao">  
            <button className="enviar2" onClick={teste}>Sim</button>
            <button className="enviar"onClick={not}>Nao</button>
          </div>
        </Popup>

        <Popup trigger={buttonPopup2} setTriger={setButtonPopup2} >
          
        <h1 className="text-center margin-fix fonte-grande">Novo</h1> 




        <form className="form-center" onSubmit={handleSubmitNovo}>
            <h3 className="text-center margin-fix">CDM</h3>
          <label>
            
            <select className="option margin-fix" onChange={handleChangeNewCda}>
              {posts1.map((posts) => (     
                <option value={posts.id_cda}>{posts.descricao}</option>
              ))}
            </select>
          </label>
          <input className="enviar3 margin-fix" type="submit" value ="Submit"/>
        </form>
          <form className="form-center" onSubmit={handleSubmit1213}>
            
            
            <label>
              <h3 className="text-center margin-fix">Modelo de Veículo</h3>

              <select className="option margin-fix" onChange={handleChangeNewViculos}>
              <option hidden value="0"></option>
              {set_disVeiculos.map((posts) => (     
                <option value={posts.id_modelo}>{posts.descricao}</option>
              ))}
              </select>
            </label>
              <h3 className="text-center margin-fix">Qtd. de Litros</h3>
              <input className="input2 margin-fix"  onChange={handleChangeNewLitros}></input>
              <h3 className="text-center margin-fix">Média Padrão</h3>
              <input className="input2 margin-fix" onChange={handleChangeNewMedia}></input>
            <input className="enviar enviar2 margin-fix" type="submit" value="Submit"/>
          </form>
        </Popup>
      </div>
    );

}
export default Page;