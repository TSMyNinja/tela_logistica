import React from 'react'
import Select from 'react-select'


function CustomSelect({style,cda_descricao,options,onChange,defaultValue,isMulti}){
    return <div style={style}>
        <h1>{cda_descricao}</h1>
        <Select isMulti={isMulti} options={options} onChange={onChange} defaultValue={defaultValue}/>
    </div>
}

export default CustomSelect;