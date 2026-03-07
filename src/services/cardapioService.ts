import { carregarCardapio } from "../infra/scrapers/cardapioScraper.js";
import { formatarDataHoje } from "../utils/date.js";
import { getCardapioCache, setCardapioCache } from "../cache/cardapioCache.js";
import { Refeicao } from "../core/types.js";
import { CARDAPIO_BASE_URL, EMOJI_REFEICAO, EMOJI_CATEGORIAS } from "../config.js";

export async function obterCardapioFormatado(): Promise<string> {

    let refeicoes: Refeicao[]
    const cache = getCardapioCache()

    if (cache) {
        refeicoes = cache
    } else {
        const data = formatarDataHoje()
        const url = `${CARDAPIO_BASE_URL}/${data}`

        refeicoes = await carregarCardapio(url)
        setCardapioCache(refeicoes)
    }

    const dataObj = new Date()
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(dataObj)

    const linhas: string[] = []

    linhas.push(`🍛 *CARDÁPIO UFC RUSSAS*`)
    linhas.push(`📅 ${dataFormatada}`)

    for (const refeicao of refeicoes) {

        const emojiRef = EMOJI_REFEICAO[refeicao.tipo.toUpperCase()] || "🍽️"

        linhas.push("----------------------------------------------------------\n")
        linhas.push(`${emojiRef} *${refeicao.tipo.toUpperCase()}*`)
        linhas.push("----------------------------------------------------------\n")

        for (const categoria of refeicao.categorias) {
            const emojiCat = EMOJI_CATEGORIAS[categoria.nome] || "🍽️"

            linhas.push(`${emojiCat} *${categoria.nome}*`)

            categoria.itens.forEach(item => {
                linhas.push(`- ${item}`)
            })

            linhas.push("")
        }

        linhas.push("")
    }

    return linhas.join("\n")
}