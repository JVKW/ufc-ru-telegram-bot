export function formatarDataHoje(): string {
    const hoje = new Date()
    return hoje.toISOString().split('T')[0]!;
}