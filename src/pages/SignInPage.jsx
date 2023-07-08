import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      senha,
    };



    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
      console.log("deu certo no front")
      navigate('/home')
      console.log(response.data);
     
  
    
    } catch (error) {

      alert(error.response.data)

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
