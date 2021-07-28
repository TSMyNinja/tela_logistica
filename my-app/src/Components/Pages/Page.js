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
    <header><svg width="120" height="73" viewBox="0 0 446 273" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M90.9884 93.6825H130.8C131.266 93.7742 131.708 93.8202 132.127 93.8202C132.546 93.8202 132.989 93.8202 133.454 93.8202C142.022 94.1863 149.868 96.4764 156.992 100.69C164.116 104.903 167.631 111.956 167.538 121.847C167.444 128.534 165.396 133.664 161.392 137.235C157.388 140.807 152.359 143.373 146.305 144.929L168.376 183.399H139.739L117.53 137.786C117.995 137.876 118.461 137.923 118.926 137.923C119.393 137.923 119.858 137.923 120.323 137.923C121.069 137.923 121.791 137.945 122.489 137.992C123.187 138.038 123.909 138.014 124.654 137.923C126.703 137.923 128.705 137.739 130.66 137.374C132.616 137.007 134.385 136.228 135.968 135.038C138.017 133.572 139.507 131.694 140.438 129.404C141.37 127.114 141.835 124.733 141.835 122.26C141.835 121.71 141.835 121.138 141.835 120.542C141.835 119.947 141.789 119.375 141.695 118.825C140.95 112.505 138.483 108.635 134.292 107.216C130.102 105.796 125.538 105.04 120.603 104.949C120.044 104.949 119.486 104.949 118.926 104.949C118.368 104.949 117.809 104.949 117.251 104.949C117.064 104.949 116.855 104.949 116.622 104.949C116.389 104.949 116.133 104.949 115.854 104.949V183.399H90.9884V93.6825Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M257.839 161.926C253.555 170.077 247.922 176.1 240.936 179.993C233.952 183.885 225.758 185.831 216.352 185.831C204.152 185.831 193.373 182.191 184.014 174.91C174.655 167.627 169.323 157.803 168.02 145.438C166.529 131.699 169.998 119.723 178.426 109.51C186.854 99.2976 198.099 93.6414 212.161 92.543C221.846 91.7183 230.11 92.9091 236.955 96.1146C243.8 99.3205 249.971 104.771 255.464 112.465L243.731 120.708C240.658 115.121 236.839 110.541 232.277 106.968C227.713 103.397 221.846 102.389 214.675 103.946C208.715 105.137 204.315 108.159 201.475 113.014C198.635 117.868 196.749 123.043 195.818 128.539C195.538 130.371 195.351 132.202 195.259 134.036C195.165 135.867 195.119 137.607 195.119 139.256C195.119 140.539 195.189 141.843 195.329 143.172C195.468 144.5 195.631 145.806 195.818 147.087C196.935 153.956 199.612 160.254 203.85 165.978C208.087 171.703 214.163 174.474 222.079 174.291C228.225 174.107 233.254 172.093 237.165 168.244C241.077 164.398 244.336 160.001 246.944 155.055L257.839 161.926Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M292.394 170.031C294.35 171.772 296.54 173.077 298.959 173.948C301.381 174.817 303.804 175.069 306.223 174.704C306.876 174.704 307.504 174.611 308.11 174.428C308.714 174.244 309.343 174.016 309.994 173.742C314.185 172.093 317.329 169.414 319.423 165.703C321.52 161.993 322.986 158.078 323.824 153.956C323.918 153.591 323.988 153.201 324.034 152.789C324.081 152.377 324.15 151.987 324.244 151.621C324.617 149.24 324.895 146.767 325.082 144.201C325.268 141.637 325.314 139.073 325.221 136.508C325.129 132.569 324.685 128.676 323.895 124.83C323.103 120.982 321.868 117.365 320.193 113.975C318.33 110.312 316.001 107.633 313.207 105.938C310.414 104.244 307.527 103.442 304.548 103.534C300.636 103.625 296.959 104.999 293.513 107.655C290.066 110.312 287.598 113.975 286.108 118.647C285.084 121.578 284.292 125.196 283.733 129.501C283.175 133.806 282.988 138.202 283.175 142.69C283.362 148.185 284.177 153.453 285.62 158.49C287.063 163.529 289.321 167.421 292.394 170.169L292.394 170.031ZM304.129 92.2674C320.239 92.3598 332.346 97.2822 340.449 107.038C348.549 116.792 352.601 127.485 352.601 139.118C352.601 150.842 348.549 161.559 340.449 171.268C332.346 180.977 320.239 185.831 304.129 185.831C288.017 185.831 275.935 180.977 267.879 171.268C259.824 161.559 255.797 150.842 255.797 139.118C255.797 127.485 259.824 116.793 267.879 107.038C275.935 97.2822 288.017 92.4054 304.129 92.4054L304.129 92.2674Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M356.18 94.0537H380.068L400.601 142.415L420.996 94.0537H446V183.771H420.577V124.83L395.993 183.771H393.477L369.451 127.44V183.771H356.18V94.0537Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 259.477H446V273H162.772V259.477Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 229.051H446V249.335H162.772V229.051Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 191.863H446V218.908H162.772V191.863Z" fill="#33A457"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 13.5228H446V0H162.772V13.5228Z" fill="#CC2229"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 43.9493H446V23.665H162.772V43.9493Z" fill="#CC2229"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M162.772 81.1373H446V54.0917H162.772V81.1373Z" fill="#CC2229"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 183.412L33.3319 93.8532H63.1906L93.6237 183.412H59.9752L37.2657 115.577L12.46 183.412H0Z" fill="#33A457"/>
    </svg></header>
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