import { consultarUsuario } from "../infra/sipac/cartaoScraper.js";

export async function obterDadosCartao(matricula: string, numeroCartao: string) {
    const dados = await consultarUsuario(matricula, numeroCartao)

    if (!dados || !dados.Nome) {
        return null
    }

    return {
        nome: dados.Nome,
        matricula: dados['Matrícula'],
        valorCredito: dados['Valor por Crédito'],
        saldo: Number(dados["Saldo Atual"])
    }
}