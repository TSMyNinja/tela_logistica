import React,{useState, useEffect} from  'react';
import 'reactjs-popup/dist/index.css';
import api from '../services/api';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Popup from '../Pages/teste';


function Page() {

  //array
  const [CDAS, setCDAS] = useState([]);
  const [Veiculo, setVeiculo] = useState([]);
  const [Filter, setFilter] = useState([]);
  const [PesquisaVeiculo, setPesquisaVeiculo] = useState([]);
  const [set_formnewlitros,  set_FormNewLitros] = useState([]);
  const [set_fornewmedia, set_FormNewMedia] = useState([]);

  //popups
  const [ButtonPopupNOVO, setButtonPopupNOVO] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [ButtonPopupDeletar, setButtonPopupDeletar] = useState(false);

  //array mapeadas
  const [st_cda, setCDA] = useState([]);
  const [st_veiculo, setVEICULO] = useState([]);  
  const [ID_CDA, setID_CDA] = useState([]);
  const [ID_CDAPadrao, setID_CDAPadrao] = useState([]);
  const [id_modelo_veiculo, setid_modelo_veiculo] = useState([]);
  const [Litosabastec, setLitros] = useState([]);
  const [MediaPadrao, setMediaPadrao] = useState([]);


  //formularios
  const [set_formlitros,  set_FormLitros] = useState([]);
  const [set_formedia, set_FormMedia] = useState([]);

  //Select
  const [NewNewCda, SetNewCda] = React.useState("1");
  const [Formveiculo, SetFormveiculo] = React.useState("0");
  const [indexCDAS, setindexCDAS] = React.useState("0");
  const [indexVEICULOS, setindexVEICULOS] = React.useState("0");

 //useEffect
  useEffect( () =>{
    async function getcda(){
      const  res = await api.get('cdas');
      setCDAS(res.data)
    }

    async function Iveiculos(){
      const  res = await api.get('veiculo');
      setVeiculo(res.data)
    }



    Iveiculos()
    getcda()
  }, [])

  useEffect( () =>{
    async function getfilter(){
      const dados = {value:indexCDAS, veiculos:indexVEICULOS}
      const  res = await api.post('filter',dados)
      setFilter(res.data)
    }

    async function Newform(){
      const dados = {value:NewNewCda}
      const  res = await api.post('pesquisa',dados)
      setPesquisaVeiculo(res.data)
    }

    Newform()
    getfilter()
  }, [indexCDAS,indexVEICULOS])



  //css Select
  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
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
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  //async
  async function handleChangeCDA(event){
    setindexCDAS(event.target.value)
  }

  async function handleChangeVeiculo(event){
    setindexVEICULOS(event.target.value)
  }







  async function handleChangeCDANOVO(event){
    SetNewCda(event.target.value)
    const dados = {value:event.target.value}
    const  res = await api.post('pesquisa',dados)
    setPesquisaVeiculo(res.data)
  }
  async function handleChangeVEICULONOVO(event){
    SetFormveiculo(event.target.value)
  }

  async function handleChangeDeletar(event){
    if (ID_CDAPadrao != null){
          const Apagarformulario = { id_CdaPadrao:ID_CDAPadrao}
          const  res = await api.post('deletar',Apagarformulario)
          window.location.reload();
    }

  }

  async function EnviaFormularioEditar(event){
    event.preventDefault()
    const editarformulario = { id_CdaPadrao:ID_CDAPadrao, id_cda:ID_CDA, id_modelo:id_modelo_veiculo, media:set_formedia , litros:set_formlitros}
    const  res = await api.post('editar',editarformulario)
    window.location.reload();
    

  }
  async function handleSubmitFormularioNovo (e){

    const novoformulario = { id_cda:NewNewCda, id_modelo:Formveiculo, media:set_fornewmedia , litros:set_formnewlitros}
    const  res = await api.post('inserir',novoformulario)


  } 

  //const
  const popup = () => {
    setButtonPopupDeletar(false)
  }
  const handleChangeMedia = (e) => {
    set_FormMedia(e.target.value);
  }
  const handleChangeLitros = (e) => {
    set_FormLitros(e.target.value);
  }
  const handleChangeNewMedia = (e) => {
    set_FormNewMedia(e.target.value);

  }
  const handleChangeNewLitros = (e) => {
    set_FormNewLitros(e.target.value);

  }

  return(
    <div className="div1">
    <header><img src="https://media-exp1.licdn.com/dms/image/C510BAQHml9VWZyqWlw/company-logo_200_200/0/1519864734798?e=2159024400&v=beta&t=UVBa29_a_iO3R70BDj7pu07dBydfs8pPsEG5urcmjE4" width="50" height="50" className="logo" alt="website logo"/></header>
  <table className="tabela1">
    <thead>
      <th>    
        <FormControl >
    <NativeSelect id="demo-customized-select-native" value={indexCDAS} onChange={handleChangeCDA} input={<BootstrapInput />}>
      <option value="0">CDAS</option>
        {CDAS.map((posts) => (     
            <option value={posts.value}>{posts.label}</option>
      ))}

    </NativeSelect>
  </FormControl></th>
      <th>
    <FormControl >
      <NativeSelect id="demo-customized-select-native" value={indexVEICULOS} onChange={handleChangeVeiculo} input={<BootstrapInput />}>
        <option value="0">VEICULOS</option>
          {Veiculo.map((posts) => (     
              <option value={posts.id_modelo}>{posts.descricao}</option>
        ))}

      </NativeSelect>
    </FormControl>
      </th>
      <th>Qtd. de Litros</th>
      <th>Média Padrão</th>
      <th>Editar</th>
      <th className="deletartab">Deletar</th>
    </thead>
      {
      (Filter === Filter) && 
        <tbody>
          {Filter.map((posts) => (     
              <tr>
                <td>{posts.cda_descricao}</td>
                <td>{posts.veiculo_descricao}</td>
                <td>{posts.qtd_litros_abastec_padrao}</td>
                <td>{posts.media_padrao}</td>
                <td>  <button className="editar" onClick={() =>{
                  setButtonPopup(true);
                  setCDA(posts.cda_descricao);
                  setVEICULO(posts.veiculo_descricao);
                  setID_CDA(posts.id_cda);
                  setid_modelo_veiculo(posts.id_modelo_veiculo)
                  setID_CDAPadrao(posts.id_cda_padrao_abastec)
                }
                }>✎</button>
                </td>
                <td className="X">
                <button className="x2" onClick={() =>{
                  setButtonPopupDeletar(true);
                  setID_CDAPadrao(posts.id_cda_padrao_abastec)
                  setCDA(posts.cda_descricao);
                  setVEICULO(posts.veiculo_descricao);
                  setLitros(posts.qtd_litros_abastec_padrao)
                  setMediaPadrao(posts.media_padrao)
                }
                }>X</button>  </td>
              </tr>
          ))}
        </tbody>
      }
    </table>
    
    <Popup trigger={ButtonPopupNOVO} setTriger={setButtonPopupNOVO} >
        <FormControl >
          <h3 className="margin-fix text-center">CDM</h3>
          <NativeSelect id="demo-customized-select-native" className="margin-fix" value={NewNewCda} onChange={handleChangeCDANOVO} input={<BootstrapInput />}>
            {CDAS.map((posts) => (     
                <option value={posts.value}>{posts.label}</option>
            ))}
          </NativeSelect>
      </FormControl>
      <FormControl >
        
        <h3 className="margin-fix text-center">⠀⠀⠀⠀⠀Modelo⠀⠀⠀⠀⠀</h3>
        <NativeSelect id="demo-customized-select-native" className="margin-fix" value={Formveiculo} onChange={handleChangeVEICULONOVO} input={<BootstrapInput />}>
        <option value="0"></option>
          {PesquisaVeiculo.map((posts) => (     
                <option value={posts.value}>{posts.label}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <form className="form-center" onSubmit={handleSubmitFormularioNovo}>
              <h3 className="text-center margin-fix">Qtd. de Litros</h3>
              <input type="number" min="1" className="input2 margin-fix"  onChange={handleChangeNewLitros}></input>
              <h3 className="text-center margin-fix">Média Padrão</h3>
              <input type="number" min="1" max="99.99" className="input2 margin-fix" onChange={handleChangeNewMedia}></input>
              <input className="enviar enviar2 margin-fix" type="submit" value="Submit"/>
          </form>
    </Popup>

    <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
      <h1 className="text-center">{st_cda}</h1>
      <h1 className="text-center">{st_veiculo}</h1>
        <form className="form-center"  onSubmit={EnviaFormularioEditar}>
          <h3 className="text-center">Qtd. de Litros</h3>
          <input type="number" min="1" className="input" onChange={handleChangeLitros} ></input>
          <h3 className="text-center">Média Padrão</h3>
          <input type="number" min="1" max="99.99" className="input" onChange={handleChangeMedia}></input>
          <input type="submit" className="enviar"></input>
        </form>
    </Popup>

    <Popup trigger={ButtonPopupDeletar} setTriger={setButtonPopupDeletar} >
      <h2 className="text-center">deseja realmente deletar?</h2>
      <h1 className="text-center">{st_cda}</h1>
      <h1 className="text-center">{st_veiculo}</h1>
    <div className="simenao">        
      <button className="enviar4 " onClick={
        handleChangeDeletar
      }>sim</button>
      <button className="enviar" onClick={
        popup
      }>
        nao</button>
    </div>
    </Popup>
    
  </div>
  
);

}
export default Page;