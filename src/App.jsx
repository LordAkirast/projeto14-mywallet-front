import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import TokenContext from "./components/context/Token"
import { useState } from "react"

export default function App() {
  const [token, settoken] = useState('')
  return (
    <TokenContext.Provider value={{ token: token }}>
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage settoken={settoken}/>} />
          <Route path="/cadastro" element={<SignUpPage settoken={settoken}/>} />
          <Route path="/home" element={<HomePage settoken={settoken}/>} />
          <Route path="/home/nova-transacao/:tipo" element={<TransactionsPage settoken={settoken}/>} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
    </TokenContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
