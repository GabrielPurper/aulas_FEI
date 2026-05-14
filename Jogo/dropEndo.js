// Drop da moeda pelo Endoesqueleto
function dropMoeda(x, y) {
    const novaMoeda = document.createElement('div');
    novaMoeda.className = 'moeda';
    novaMoeda.style.left = x + 'px';
    novaMoeda.style.top = y + 'px';
    document.body.appendChild(novaMoeda);
}
