import React from 'react'


function Popup(props){
    return (props.trigger) ? (
        <div className="teste popup">
            <div className="popu-iner">
            <button className="botao" onClick={() => props.setTriger(false)}>X</button>
                {props.children}
            </div>
            
        </div>
    ) : "";
}

export default Popup