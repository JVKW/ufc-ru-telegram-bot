import axios from "axios"
import * as cheerio from "cheerio"

import { SIPAC_URL } from "../../config.js"

const url = SIPAC_URL

export async function consultarUsuario(matricula: string, cartao: string) {

  const getResponse = await axios.get(url)
  const cookies = getResponse.headers["set-cookie"]

  const $ = cheerio.load(getResponse.data)
  const viewState = $('input[name="javax.faces.ViewState"]').val()

  if (!viewState) {
    throw new Error("ViewState não encontrado")
  }

  const cartaoInput = $('input[type="text"][maxlength="10"]').attr("name")
  const matriculaInput = $('input[type="text"][maxlength="11"]').attr("name")
  const botaoConsultar = $('input[type="submit"][value="Consultar"]').attr("name")

  if (!cartaoInput || !matriculaInput || !botaoConsultar) {
    throw new Error("Campos do formulário não encontrados")
  }

  const form = new URLSearchParams()

  form.append("form", "form")
  form.append(cartaoInput, cartao)
  form.append(matriculaInput, matricula)
  form.append(botaoConsultar, "Consultar")
  form.append("javax.faces.ViewState", String(viewState))

  const postResponse = await axios.post(url, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookies?.join(";") || ""
    }
  })

  const $$ = cheerio.load(postResponse.data)

  const dados: Record<string, string> = {}

  $$("table.formulario tr").each((_, el) => {

    const chave = $$(el).find("th").text().trim().replace(":", "")
    const valor = $$(el).find("td").text().trim()

    if (chave && valor) {
      dados[chave] = valor
    }

  })

  return dados
}

// async function main() {
//   const teste = await consultarUsuario('585561', '0803120306')
//   console.log(teste)
// }

// main()