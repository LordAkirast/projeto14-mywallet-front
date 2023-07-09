import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import TokenContext from "../components/context/Token"
import {v4 as uuid} from "uuid"
import UserContext from "../components/context/User";
import { useContext } from "react";

export default function HomePage({settoken, userName}) {

  const [transactions, setTransactions] = useState([]);
  let [total, settotal] = useState(0)

  
  useEffect(() => {
    const token = uuid()
    settoken(token)
    const data = {
      token
    }

    const getTransactions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/home`);
        console.log(response);
        console.log("fez o get de transações")
         // Ordenar os dados em ordem de data mais recente
      const sortedTransactions = response.data.sort((a, b) => {
        // Extrair os valores de diaMesFormatado como "DD/MM" para comparação
        const dateA = a.diaMesFormatado?.split("/")?.reverse()?.join("") || "";
        const dateB = b.diaMesFormatado?.split("/")?.reverse()?.join("") || "";

        // Comparar as datas
        return dateB.localeCompare(dateA);
      });

      setTransactions(sortedTransactions); // Armazena as transações ordenadas no estado

      // Calcula o saldo total
      const total = sortedTransactions.reduce((accumulator, transaction) => {
        if (transaction.metodo === "saida") {
          return accumulator - parseFloat(transaction.valor);
        } else {
          return accumulator + parseFloat(transaction.valor);
        }
      }, 0);

      settotal(total.toFixed(2));


      
      } catch (error) {
  
        alert(error)
  
        console.log(error);
      }
  
     
  
    };
    getTransactions();
    console.log("setTOKEN:" + settoken)
    console.log("TOKEN:" + token)
    console.log("userName:" + userName)
    console.log("data: " + data.token )

   


  },[])
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {userName}</h1>
        <BiExit data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>
        {transactions.map((transaction) => (
      <ListItemContainer key={transaction.id}>
        <div>
          <span>{transaction.diaMesFormatado}</span>
          <strong data-test="registry-name">{transaction.descricao}</strong>
        </div>
        <Value
            color={transaction.metodo === "saida" ? "negativo" : "positivo"}
            data-test="registry-amount"
          >
             {parseFloat(transaction.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').replace('.', '')}
      </Value>
      </ListItemContainer>
    ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          
          <Value color={total > 0 ? "positivo":"negativo"} data-test="total-amount">{parseFloat(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$','').replace('.', '')}</Value>
          
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
     
        <button>
        <Link to="nova-transacao/entrada">
        
          <AiOutlinePlusCircle />
          <p data-test="new-income">Nova <br /> entrada</p>
          </Link>
        </button>
        
       
        <button>
        <Link to="nova-transacao/saida">
        
        
          <AiOutlineMinusCircle />
          <p data-test="new-expense">Nova <br />saída</p>
        
          </Link>
        </button>
       
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto; 
  
  article {
    display: flex;
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    padding: 16px; 
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;


const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`