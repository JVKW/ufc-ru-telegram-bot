import { carregarCardapio } from "./cardapio.scraper.js"
import { formatarDataHoje } from "../../utils/date.js"
import { getCardapioCache, setCardapioCache } from "./cardapio.cache.js"
import { Refeicao } from "../../core/types.js"
import {
  CARDAPIO_BASE_URL,
  EMOJI_REFEICAO,
  EMOJI_CATEGORIAS
} from "../../config.js"

export async function obterCardapioFormatado(): Promise<string> {

  const refeicoes = await obterCardapio()

  const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date())

  const linhas: string[] = []

  linhas.push(`🍛 *CARDÁPIO UFC RUSSAS*`)
  linhas.push(`📅 ${dataFormatada}`)
  linhas.push("")

  for (const refeicao of refeicoes) {

    const emojiRef =
      EMOJI_REFEICAO[refeicao.tipo.toUpperCase()] || "🍽️"

    linhas.push("----------------------------------------------------------")
    linhas.push(`${emojiRef} *${refeicao.tipo.toUpperCase()}*`)
    linhas.push("----------------------------------------------------------")
    linhas.push("")

    for (const categoria of refeicao.categorias) {

      const emojiCat =
        EMOJI_CATEGORIAS[categoria.nome] || "🍽️"

      linhas.push(`${emojiCat} *${categoria.nome}*`)

      for (const item of categoria.itens) {
        linhas.push(`- ${item}`)
      }

      linhas.push("")
    }

    linhas.push("")
  }

  return linhas.join("\n")
}

async function obterCardapio(): Promise<Refeicao[]> {

  const cache = getCardapioCache()

  if (cache) return cache

  const data = formatarDataHoje()
  const url = `${CARDAPIO_BASE_URL}/${data}`

  const refeicoes = await carregarCardapio(url)

  setCardapioCache(refeicoes)

  return refeicoes
}