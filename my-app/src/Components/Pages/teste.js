import React from 'react'
import Draggable from 'react-draggable'; 

function Popup(props){
    return (props.trigger) ? (
        
        <div className="teste popup">
            <Draggable cancel=".just-name">
            <div className="popu-iner">
            <div className="popup-header">
                
                <button className="botao" onClick={() => props.setTriger(false)}>X</button>
                </div>
                {props.children}
            </div>
            </Draggable>
            
        </div>
       
    ) : "";
}

export default Popup

