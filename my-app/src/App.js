import './App.css';

function App() {
  return (
    <div className="div1">
      <header>
        <h2>
          Teste
        </h2>
      </header>
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
            <tr>
                <td>140</td>
                <td>Rio de Janeiro</td>
                <td>VOLVO 140M</td>
                <td>110</td>
                <td>6.3</td>
                <td><a href="/"> ✎ </a></td> 
                <td><a href="/" className="X"> X </a></td>
            </tr>
            <tr>
                <td>140</td>
                <td>Rio de Janeiro</td>
                <td>VOLVO 140M</td>
                <td>110</td>
                <td>6.3</td>
                <td><a href="/"> ✎ </a></td> 
                <td><a href="/" className="X"> X </a></td>
            </tr>
            
        </tbody>

      </table>
    
    </div>
  );
}

export default App;
