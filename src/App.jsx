import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import TokenContext from "./components/context/Token"
import UserContext from "./components/context/User"
import { useState } from "react"

export default function App() {
  const [token, settoken] = useState('')
  const [userName, setuserName] = useState('')
  return (
    <UserContext.Provider value={{ userName: userName }}>
    <TokenContext.Provider value={{ token: token }}>
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage settoken={settoken} setuserName={setuserName}/>} />
          <Route path="/cadastro" element={<SignUpPage/>} />
          <Route path="/home" element={<HomePage settoken={settoken} userName={userName}/>} />
          <Route path="/home/nova-transacao/:tipo" element={<TransactionsPage settoken={settoken}/>} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
    </TokenContext.Provider>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
