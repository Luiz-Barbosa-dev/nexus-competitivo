import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useAppLogic } from './useAppLogic.js'
import { CardJogador } from './CardJogador.jsx'
import './App.css'

function SistemaApp() {
  const {
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
  } = useAppLogic()

  return (
    <div className="fundo-aplicacao p-6 md:p-10" translate="no">

      {/* CABEÇALHO UTILIZANDO LINKS DE ROTA */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-red-600 pb-4 gap-4">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-red-500">
          Nexus <span className="text-white">Competitivo</span>
        </h1>
        <nav className="flex gap-6">
          <Link to="/" onClick={limparFormulario} className="font-semibold pb-1 text-zinc-400 hover:text-red-400 focus:text-red-400 focus:border-b-2 focus:border-red-500 transition">
            {editandoIndex !== null ? "Editando Perfil" : "Cadastrar"}
          </Link>
          <Link to="/lista" className="font-semibold pb-1 text-zinc-400 hover:text-red-400 focus:text-red-400 focus:border-b-2 focus:border-red-500 transition">
            Lista de Jogadores
          </Link>
        </nav>
      </header>

      {/*Criação de rotas para navegação entre páginas */}
      <main className="max-w-4xl mx-auto">
        <Routes>
          
          {/* ROTA 1: FORMULÁRIO */}
          <Route path="/" element={
            <div className="bg-zinc-800 p-8 rounded-lg shadow-2xl border border-zinc-700">
              <h2 className="text-2xl font-semibold mb-6 text-zinc-100">
                {editandoIndex !== null ? "Atualizar Informações do Jogador" : "Registrar Novo Perfil"}
              </h2>
              <form onSubmit={salvarRegistro} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm font-medium">Nickname <span className="text-red-500">*</span></label>
                  <input type="text" required value={nickname} onChange={(e) => setNickname(e.target.value)} className="bg-zinc-900 border border-zinc-600 rounded p-3 text-white focus:outline-none focus:border-red-500" placeholder="Ex: aspas" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm font-medium">Jogo Principal <span className="text-red-500">*</span></label>
                  <select required value={jogo} onChange={(e) => { setJogo(e.target.value); setRanque(""); }} className="bg-zinc-900 border border-zinc-600 rounded p-3 text-white focus:outline-none focus:border-red-500">
                    <option value="" disabled hidden>Selecione o jogo...</option>
                    <option value="Valorant">Valorant</option>
                    <option value="Rocket League">Rocket League</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm font-medium">Ranque Atual</label>
                  <select value={ranque} onChange={(e) => setRanque(e.target.value)} disabled={!jogo} className="bg-zinc-900 border border-zinc-600 rounded p-3 text-white focus:outline-none focus:border-red-500 disabled:opacity-50">
                    <option value="" disabled hidden>{!jogo ? "Escolha o jogo primeiro..." : "Selecione o ranque..."}</option>
                    {jogo === "Valorant" && (
                      <><option value="Sem classificação">Sem classificação</option><option value="Ferro">Ferro</option><option value="Bronze">Bronze</option><option value="Prata">Prata</option><option value="Ouro">Ouro</option><option value="Platina">Platina</option><option value="Diamante">Diamante</option><option value="Ascendente">Ascendente</option><option value="Imortal">Imortal</option><option value="Radiante">Radiante</option></>
                    )}
                    {jogo === "Rocket League" && (
                      <><option value="Sem classificação">Sem classificação</option><option value="Bronze">Bronze</option><option value="Prata">Prata</option><option value="Ouro">Ouro</option><option value="Platina">Platina</option><option value="Diamante">Diamante</option><option value="Campeão">Campeão</option><option value="Grande Campeão">Grande Campeão (GC)</option><option value="Lenda Supersônica">SSL</option></>
                    )}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm font-medium">DPI (Sensibilidade)</label>
                  <input type="number" value={dpi} onChange={(e) => setDpi(e.target.value)} className="bg-zinc-900 border border-zinc-600 rounded p-3 text-white focus:outline-none focus:border-red-500" placeholder="Ex: 1600" />
                </div>

                <div className="col-span-1 md:col-span-2 mt-4 flex gap-4">
                  <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition uppercase tracking-wide">
                    {editandoIndex !== null ? "Atualizar Registro" : "Salvar Registro"}
                  </button>
                  {editandoIndex !== null && (
                    <button type="button" onClick={() => { limparFormulario(); navegar("/lista"); }} className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded transition uppercase tracking-wide">
                      Cancelar
                    </button>
                  )}
                </div>

              </form>
            </div>
          } />

          {/*LISTA DE JOGADORES */}
          <Route path="/lista" element={
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-zinc-100">Jogadores Cadastrados</h2>
              {jogadores.length === 0 ? (
                <p className="text-zinc-500 text-center bg-zinc-800 p-8 rounded border border-zinc-700">Nenhum competidor registrado até o momento.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Utilização do componente com Props */}
                  {jogadores.map((jogador, index) => (
                    <CardJogador 
                      key={index}
                      jogador={jogador}
                      index={index}
                      aoEditar={editarPerfil}
                      aoExcluir={excluirPerfil}
                    />
                  ))}
                </div>
              )}
            </div>
          } />

        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SistemaApp />
    </BrowserRouter>
  )
}