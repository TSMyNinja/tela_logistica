import React,{useState, useEffect} from  'react';
import 'reactjs-popup/dist/index.css';
import api from '../services/api';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Popup from '../Pages/teste';


// 28-07-2021 | @PedroH @ArturG @RafaelD

function Page() {


  const [CDAS, setCDAS] = useState([]);
  const [Veiculo, setVeiculo] = useState([]);
  const [Filter, setFilter] = useState([]);
  useEffect( () =>{
    async function getcda(){
      const  res = await api.get('cdas');
      setCDAS(res.data)
    }

    async function getveiculos(){
      const  res = await api.get('modelos');
      setVeiculo(res.data)
    }

    getveiculos()
    getcda()
  }, [])

  useEffect( () =>{
    async function getCda0(){
    if(CDA0 != 0){
      const dados = {indexcda:indexCDAS, indexveiculos:indexVEICULOS}
      const res = await api.post('CDA0',dados)
      setFilter(res.data)
  
    }
    else{
      const dados = {indexcda:indexCDAS, indexveiculos:indexVEICULOS}
      const  res = await api.post('pesquisa',dados)
      setFilter(res.data)
    }

  }
  getCda0()
  }, [CDA0,indexCDAS,indexVEICULOS])

  async function EnviaFormularioEditar(e){
    e.preventDefault()
    const editarformulario = { id_CdaPadrao:Post.id_cda_padrao_abastec, id_cda:Post.id_cda, id_modelo:Post.id_modelo_veiculo, media:formedia , litros:formlitros}
    await api.post('editar',editarformulario)
    window.location.reload();
    
  }



  //front
  const [Post, setPost] = useState([]);
  const [formlitros,  setFormLitros] = useState([]);
  const [formedia, setFormMedia] = useState([]);
  const [indexCDAS, setindexCDAS] = React.useState("0");
  const [indexVEICULOS, setindexVEICULOS] = React.useState("0");
  const [CDA0, setindexCDA0] = React.useState("0");
  const [buttonPopup, setButtonPopup] = useState(false);
  const handleChangeMedia = (e) => {
    setFormMedia(e.target.value);
  }
  const handleChangeLitros = (e) => {
    setFormLitros(e.target.value);
  }
  async function handleChangeCDA(e){
    setindexCDAS(e.target.value)
  }
  async function handleChangeVeiculo(e){
    setindexVEICULOS(e.target.value)
  }
  async function handleChangeCDA0(e){
    setindexCDA0(e.target.value)
  }






  //css Select
  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderBottom: '1px solid',
      position: 'relative',
      border: 'none',
      fontSize: 16,
      color: 'white',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderColor: '#80bdff',
        color: 'black'
      },
    },
  }))(InputBase);




  return(
    <div className="div1">
    <header><img src="https://media-exp1.licdn.com/dms/image/C510BAQHml9VWZyqWlw/company-logo_200_200/0/1519864734798?e=2159024400&v=beta&t=UVBa29_a_iO3R70BDj7pu07dBydfs8pPsEG5urcmjE4" width="50" height="50" className="logo" alt="website logo"/></header>
  <table className="tabela1">
    
    <thead>
      <tr>
        <th><FormControl>

            <NativeSelect id="demo-customized-select-native" value={indexCDAS} onChange={handleChangeCDA} input={<BootstrapInput />}>
              <option value="0">CDAS</option>
                {CDAS.map((posts, index) => ( <option key={index} value={posts.id_cda}>{posts.descricao}</option> ))}
            </NativeSelect>
          </FormControl></th>
        <th><FormControl>

            <NativeSelect id="demo-customized-select-native" value={indexVEICULOS} onChange={handleChangeVeiculo} input={<BootstrapInput />}>
              <option value="0">VEICULOS</option>
                {Veiculo.map((posts, index) => ( <option key={index} value={posts.id_modelo}>{posts.descricao}</option>))}
            </NativeSelect>
          </FormControl>
        </th>
        <th><FormControl>

            <NativeSelect id="demo-customized-select-native" value={CDA0} onChange={handleChangeCDA0} input={<BootstrapInput />}>
              <option value="0">Qtd. Litros</option>
              <option value="1">0</option>
            </NativeSelect>
          </FormControl></th>
        <th>Média Padrão</th>
        <th>Editar</th>
      </tr>
    </thead>
      {(Filter) && 
          <tbody>
            {Filter.map((posts, index) => (     
              <tr key={index}>
                <td>{posts.cda_descricao}</td>
                <td>{posts.veiculo_descricao}</td>
                <td>{posts.qtd_litros_abastec_padrao}</td>
                <td>{posts.media_padrao}</td>
                <td>  <button className="editar" onClick={() =>{setButtonPopup(true); setPost(posts); setFormMedia(posts.media_padrao); setFormLitros(posts.qtd_litros_abastec_padrao);}}>✎</button></td>
              </tr>
        ))}
        </tbody>
      }
    </table>
    
      
      <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
        <h1 className="text-center">{Post.cda_descricao}</h1>
        <h1 className="text-center">{Post.veiculo_descricao}</h1>
          <form className="form-center"  onSubmit={EnviaFormularioEditar}>
            <h3 className="text-center">Qtd. de Litros</h3>
            <input type="number" min="1" className="input just-name" value={formlitros} onChange={handleChangeLitros}></input >
            <h3 className="text-center">Média Padrão</h3>
            <input type="number" step="0.01" min="1" max="99.99" className="input just-name" value={formedia} onChange={handleChangeMedia}></input>
            <input type="submit" className="enviar"></input>
          </form>
      </Popup>
    
  </div>
);

}
export default Page;