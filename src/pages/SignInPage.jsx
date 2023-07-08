import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useState } from 'react';

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      senha,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
      console.log(response.data);
  
    
    } catch (error) {

      if (!email) {
        alert("Email precisa ser preenchido!")
      }

      if (!senha) {
        alert("Senha precisa ser preenchido!")
      }

      alert(error)

      console.error(error);
    }
  };



  return (
    <SingInContainer>
       <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input data-test="password" placeholder="Senha" type="password" autocomplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <button data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
