import styled from "styled-components"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TokenContext from "../components/context/Token";
import axios from "axios";
import UserContext from "../components/context/User";
import { useContext } from "react";

export default function TransactionsPage() {
  const [tipo, settipo] = useState(0)
  const [valor, setvalor] = useState('');
  const [descricao, setdescricao] = useState('');
  const { token } = useContext(TokenContext)
  const navigate = useNavigate();

  const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;

const diaMesFormatado = `${dia}/${mes}`;

console.log(diaMesFormatado); // Exemplo de saída: "1/7" para 1 de julho


  const url = window.location.href;
  console.log(url);

  useEffect(() => {
    if (url.includes('entrada')) {
   
      settipo(1)
    } else {
      settipo(2)
      
    } 

  },[])
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      valor,
      descricao,
      token,
      diaMesFormatado
    };

   

    if (tipo === 1) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/entrada`, data);
        console.log("deu certo no front")
        console.log(response.data);
        navigate('/home')
    
      
      } catch (error) {
  
        alert(error.response.data)
  
        console.log(error);
      }

    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/saida`, data);
        console.log("deu certo no front saida")
        console.log(response.data);
        navigate('/home')
    
      
      } catch (error) {
  
        alert(error.response)
  
        console.log(error);
      }

    }



   

  };



  return (
    tipo === 1 ? 
    <TransactionsContainer>
      <h1>Nova Entrada</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Valor" type="text" data-test="registry-amount-input" value={valor} onChange={(e) => setvalor(e.target.value)}/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input" value={descricao} onChange={(e) => setdescricao(e.target.value)}/>
        <button data-test="registry-save">Salvar Entrada</button>
      </form>
    </TransactionsContainer> : <TransactionsContainer>
      <h1>Nova Saida</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Valor" type="text" data-test="registry-amount-input" value={valor} onChange={(e) => setvalor(e.target.value)}/>
        <input placeholder="Descrição" type="text" data-test="registry-name-input" value={descricao} onChange={(e) => setdescricao(e.target.value)}/>
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
