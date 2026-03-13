import * as cheerio from "cheerio"
import { Refeicao, Categoria } from "../../core/types.js"

export async function carregarCardapio(url: string): Promise<Refeicao[]> {

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`)
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const refeicoes: Refeicao[] = []

  $("table.refeicao").each((_, table) => {

    const classes = $(table).attr("class") || ""

    const tipo =
      classes.split(" ")[1] ||
      classes.split(" ")[0] ||
      "desconhecido"

    const categorias: Categoria[] = []

    $(table)
      .find("tr.item")
      .each((_, row) => {

        const tds = $(row).find("td")

        const nomeCategoria = $(tds[0]).text().trim()

        const itens: string[] = []

        $(tds[1])
          .find("span.desc")
          .each((_, el) => {

            const $el = $(el)

            const texto = $el.text().trim()

            if (!texto) return

            if ($el.hasClass("gluten") && itens.length > 0) {
              itens[itens.length - 1] += ` ${texto}`
            } else {
              itens.push(texto)
            }

          })

        if (nomeCategoria) {
          categorias.push({
            nome: nomeCategoria,
            itens
          })
        }

      })

    refeicoes.push({
      tipo: tipo.trim(),
      categorias
    })

  })

  return refeicoes
}