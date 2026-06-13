import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAppLogic() {
  const [nickname, setNickname] = useState("")
  const [jogo, setJogo] = useState("")
  const [ranque, setRanque] = useState("")
  const [dpi, setDpi] = useState("")
  const [editandoIndex, setEditandoIndex] = useState(null)

  const [jogadores, setJogadores] = useState(() => {
    return JSON.parse(localStorage.getItem('jogadores')) || []
  })

  const navegar = useNavigate()

  useEffect(() => {
    localStorage.setItem('jogadores', JSON.stringify(jogadores))
  }, [jogadores])

  async function salvarRegistro(evento) {
    evento.preventDefault()

    if (editandoIndex === null) {
      const registroJaExiste = jogadores.some(
        (jogador) => jogador.nickname.toLowerCase() === nickname.toLowerCase() && jogador.jogo === jogo
      )
      if (registroJaExiste) {
        alert(`Erro: O nick "${nickname}" já possui um perfil no ${jogo}!`)
        return
      }
    }

    let nivelConta = "Desconhecido"
    try {
      const resposta = await fetch(`https://api.agify.io?name=${nickname}`)
      const dados = await resposta.json()
      nivelConta = dados.age || Math.floor(Math.random() * 100) + 1 
    } catch (erro) {
      console.log("Erro na API, usando nível padrão.")
    }

    const dadosJogador = { nickname, jogo, ranque, dpi, nivel: nivelConta }

    if (editandoIndex !== null) {
      const listaAtualizada = jogadores.map((jog, index) => index === editandoIndex ? dadosJogador : jog)
      setJogadores(listaAtualizada)
      alert(`Perfil atualizado com sucesso!`)
      setEditandoIndex(null)
    } else {
      const listaAtualizada = [...jogadores, dadosJogador]
      setJogadores(listaAtualizada)
      alert(`Sucesso! Perfil criado.`)
    }

    limparFormulario()
    navegar("/lista")
  }

  function editarPerfil(index) {
    const jogadorParaEditar = jogadores[index]
    setNickname(jogadorParaEditar.nickname)
    setJogo(jogadorParaEditar.jogo)
    setRanque(jogadorParaEditar.ranque)
    setDpi(jogadorParaEditar.dpi)
    setEditandoIndex(index)
    navegar("/")
  }

  function excluirPerfil(indexParaExcluir) {
    const confirmacao = window.confirm("Tem certeza que deseja apagar este perfil?")
    if (confirmacao) {
      const listaAtualizada = jogadores.filter((_, index) => index !== indexParaExcluir)
      setJogadores(listaAtualizada)
    }
  }

  function limparFormulario() {
    setNickname("")
    setJogo("")
    setRanque("")
    setDpi("")
    setEditandoIndex(null)
  }

  return {
    nickname, setNickname,
    jogo, setJogo,
    ranque, setRanque,
    dpi, setDpi,
    editandoIndex,
    jogadores,
    salvarRegistro,
    editarPerfil,
    excluirPerfil,
    limparFormulario
  }
}