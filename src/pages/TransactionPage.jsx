import styled from "styled-components"
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionsPage() {
  const [tipo, settipo] = useState(0)

  const url = window.location.href;
  console.log(url);

  useEffect(() => {
    if (url.includes('entrada')) {
   
      settipo(1)
    } else {
      settipo(2)
      
    } 

  },[])
  
  
  



  return (
    tipo === 1 ? 
    <TransactionsContainer>
      <h1>Nova Entrada</h1>
      <form>
        <input placeholder="Valor" type="text" data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input"/>
        <button data-test="registry-save">Salvar Entrada</button>
      </form>
    </TransactionsContainer> : <TransactionsContainer>
      <h1>Nova Saida</h1>
      <form>
        <input placeholder="Valor" type="text" data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input"/>
        <button data-test="registry-save">Salvar Saida</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
