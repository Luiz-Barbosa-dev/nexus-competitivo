export function CardJogador({ jogador, index, aoEditar, aoExcluir }) {
  const isValorant = jogador.jogo === "Valorant"
  const borda = isValorant ? "border-red-600/50" : "border-blue-600/50"
  const tagCor = isValorant ? "bg-red-950 text-red-300 border-red-600" : "bg-blue-950 text-blue-300 border-blue-600"

  return (
    <div className={`cartao-jogador bg-zinc-800 border ${borda} p-6 rounded-lg shadow-lg flex flex-col justify-between`}>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${jogador.nickname}`}
            alt="Avatar"
            className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 p-1"
          />
          <div className="truncate flex-1">
            <h3 className="text-xl font-bold tracking-wide truncate">{jogador.nickname}</h3>
            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded border mt-1 ${tagCor}`}>
              {jogador.jogo}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-zinc-400 mb-6">
          <p><strong className="text-zinc-200">Ranque:</strong> {jogador.ranque || "Não informado"}</p>
          <p><strong className="text-zinc-200">Sensibilidade:</strong> {jogador.dpi ? `${jogador.dpi} DPI` : "Não informada"}</p>
          <p><strong className="text-zinc-200">Nível da Conta:</strong> {jogador.nivel}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button onClick={() => aoEditar(index)} className="bg-zinc-700 text-zinc-200 hover:bg-zinc-600 transition py-2 rounded text-xs font-semibold border border-zinc-600">
          Editar Perfil
        </button>
        <button onClick={() => aoExcluir(index)} className="bg-zinc-700 hover:bg-red-600 text-zinc-300 hover:text-white transition py-2 rounded text-xs font-semibold border border-zinc-600 hover:border-red-500">
          Excluir
        </button>
      </div>
    </div>
  )
}