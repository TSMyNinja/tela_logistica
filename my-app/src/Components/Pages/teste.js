import React from 'react'


function Popup(props){
    return (props.trigger) ? (
        <div className="teste popup">
            <div className="popu-iner">
            <div className="popup-header">
                <button className="botao" onClick={() => props.setTriger(false)}>X</button>
                </div>
                {props.children}
            </div>
            
        </div>
    ) : "";
}

export default Popup