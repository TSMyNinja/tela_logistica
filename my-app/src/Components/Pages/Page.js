import React,{useState, useEffect} from  'react';
import 'reactjs-popup/dist/index.css';
import api from '../services/api';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Popup from '../Pages/teste';


function Page() {

  //array
  //array
  const [CDAS, setCDAS] = useState([]);
  const [Veiculo, setVeiculo] = useState([]);
  const [Filter, setFilter] = useState([]);

  //popups
  const [buttonPopup, setButtonPopup] = useState(false);
  const [ButtonPopupDeletar, setButtonPopupDeletar] = useState(false);

  //array mapeadas
  const [cda, setCDA] = useState([]);
  const [veiculo, setVEICULO] = useState([]);  
  const [ID_CDA, setID_CDA] = useState([]);
  const [ID_CDAPadrao, setID_CDAPadrao] = useState([]);
  const [id_modelo_veiculo, setid_modelo_veiculo] = useState([]);


  //formularios
  const [formlitros,  setFormLitros] = useState([]);
  const [formedia, setFormMedia] = useState([]);

  //Select
  const [indexCDAS, setindexCDAS] = React.useState("0");
  const [indexVEICULOS, setindexVEICULOS] = React.useState("0");


 //useEffect e api
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
    async function getfilter(){
      const dados = {indexcda:indexCDAS, indexveiculos:indexVEICULOS}
      const  res = await api.post('pesquisa',dados)
      setFilter(res.data)
    }
    getfilter()
  }, [indexCDAS,indexVEICULOS])

  
  async function handleChangeDeletar(){
    if (ID_CDAPadrao != null){
          const Apagarformulario = { id_CdaPadrao:ID_CDAPadrao}
          await api.post('deletar',Apagarformulario)
          window.location.reload();
    }

  }

  async function EnviaFormularioEditar(e){
    e.preventDefault()
    const editarformulario = { id_CdaPadrao:ID_CDAPadrao, id_cda:ID_CDA, id_modelo:id_modelo_veiculo, media:formedia , litros:formlitros}
    await api.post('editar',editarformulario)
    window.location.reload();
    
  }



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
  async function handleChangeCDA(e){
    setindexCDAS(e.target.value)
  }
  async function handleChangeVeiculo(e){
    setindexVEICULOS(e.target.value)
  }



  //const
  const popup = () => {
    setButtonPopupDeletar(false)
  }
  const handleChangeMedia = (e) => {
    setFormMedia(e.target.value);
  }
  const handleChangeLitros = (e) => {
    setFormLitros(e.target.value);
  }

  return(
    <div className="div1">
    <header><img src="https://media-exp1.licdn.com/dms/image/C510BAQHml9VWZyqWlw/company-logo_200_200/0/1519864734798?e=2159024400&v=beta&t=UVBa29_a_iO3R70BDj7pu07dBydfs8pPsEG5urcmjE4" width="50" height="50" className="logo" alt="website logo"/></header>
  <table className="tabela1">
    
    <thead>
      <tr>
        <th >    
          <FormControl >
            <NativeSelect id="demo-customized-select-native" value={indexCDAS} onChange={handleChangeCDA} input={<BootstrapInput />}>
              <option value="0">CDAS</option>
                {CDAS.map((posts, index) => (     
                    <option key={index} value={posts.id_cda}>{posts.descricao}</option>
              ))}

            </NativeSelect>
          </FormControl></th>
        <th>
          <FormControl >
            <NativeSelect id="demo-customized-select-native" value={indexVEICULOS} onChange={handleChangeVeiculo} input={<BootstrapInput />}>
              <option value="0">VEICULOS</option>
                {Veiculo.map((posts, index) => (     
                    <option key={index} value={posts.id_modelo}>{posts.descricao}</option>
              ))}

            </NativeSelect>
          </FormControl>
        </th>
        <th>Qtd. de Litros</th>
        <th>Média Padrão</th>
        <th>Editar</th>
        <th className="deletartab">Deletar</th>
      </tr>
    </thead>
      {
        (Filter) && 
          <tbody>
            {Filter.map((posts, index) => (     
                <tr key={index}>
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
                    setFormLitros(posts.qtd_litros_abastec_padrao)
                    setFormMedia(posts.media_padrao)
                  }
                  }>✎</button>
                  </td>
                  <td className="X">
                  <button className="x2" onClick={() =>{
                    setButtonPopupDeletar(true);
                    setID_CDAPadrao(posts.id_cda_padrao_abastec)
                    setCDA(posts.cda_descricao);
                    setVEICULO(posts.veiculo_descricao);
                  }
                  }>X</button>  </td>
                </tr>
          ))}
        </tbody>
      }
    </table>
    
      
      <Popup trigger={buttonPopup} setTriger={setButtonPopup} >
        <h1 className="text-center">{cda}</h1>
        <h1 className="text-center">{veiculo}</h1>
          <form className="form-center"  onSubmit={EnviaFormularioEditar}>
            <h3 className="text-center">Qtd. de Litros</h3>
            <input type="number" min="1" className="input just-name" value={formlitros} onChange={handleChangeLitros}></input >
            <h3 className="text-center">Média Padrão</h3>
            <input type="number" min="1" max="99.99" className="input just-name" value={formedia} onChange={handleChangeMedia}></input>
            <input type="submit" className="enviar"></input>
          </form>
      </Popup>


    <Popup trigger={ButtonPopupDeletar} setTriger={setButtonPopupDeletar} >
      <h2 className="text-center">deseja realmente deletar?</h2>
      <h1 className="text-center">{cda}</h1>
      <h1 className="text-center">{veiculo}</h1>
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