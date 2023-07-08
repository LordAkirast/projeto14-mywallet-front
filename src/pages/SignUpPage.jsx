import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from 'react';
import TokenContext from "../components/context/Token";

export default function SignUpPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome,
      email,
      senha,
      confirmarSenha,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, data);
      console.log(response.data); // Trate a resposta da API conforme necessário
      setNome("")
      setEmail("")
      setSenha("")
      setConfirmarSenha("")
    
  
    
    } catch (error) {
      if (!nome) {
        alert("Nome precisa ser preenchido!")
      }

      if (!email) {
        alert("Email precisa ser preenchido!")
      }

      if (!senha) {
        alert("Senha precisa ser preenchido!")
      }

      if (!confirmarSenha) {
        alert("Senha precisa ser preenchido!")
      }

      if (senha.length < 3) {
        alert("Senha precisa ter mais de 3 caracteres!")
      }

      if (senha !== confirmarSenha) {
        alert("A senha e a confirmação de senha precisam ser iguais!")
        console.error(422);
      }


      console.error(error);
    }
  };

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autoComplete="new-password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
