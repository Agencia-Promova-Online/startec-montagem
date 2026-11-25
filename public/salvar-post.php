<?php
header('Content-Type: application/json; charset=utf-8');

// 1. Senha secreta (coloque a mesma no n8n)
$senha_secreta = "aq3zshma92ui5gf0l46r9u0ut9ecu9u5vr2j";

// Lê os cabeçalhos de forma compatível com servidores Apache/HostGator
$headers = array_change_key_case(getallheaders(), CASE_LOWER);

if (!isset($headers['x-api-key']) || $headers['x-api-key'] !== $senha_secreta) {
    http_response_code(401);
    echo json_encode(["erro" => "Acesso não autorizado"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["erro" => "Método não permitido"]);
    exit;
}

// 2. Recebe o JSON enviado pelo n8n
$input = file_get_contents('php://input');
$dados = json_decode($input, true);

if (!$dados || empty($dados['title']) || empty($dados['content'])) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados inválidos ou campos obrigatórios (title, content) ausentes"]);
    exit;
}

// 3. Caminho do articles.json
$arquivoJson = 'articles.json';
$articles = [];

if (file_exists($arquivoJson)) {
    $conteudoAtual = file_get_contents($arquivoJson);
    $articles = json_decode($conteudoAtual, true);
    if (!is_array($articles)) {
        $articles = [];
    }
}

// 4. Descobre automaticamente o próximo ID (mantendo como string: "4", "5"...)
$maiorId = 0;
foreach ($articles as $artigo) {
    if (isset($artigo['id']) && is_numeric($artigo['id'])) {
        $idAtual = (int)$artigo['id'];
        if ($idAtual > $maiorId) {
            $maiorId = $idAtual;
        }
    }
}
$novoId = (string)($maiorId + 1);

// 5. Monta o novo artigo na ordem exata do seu JSON
$novoArtigo = [
    "id"          => $novoId,
    "title"       => $dados['title'],
    "slug"        => $dados['slug'] ?? '',
    "description" => $dados['description'] ?? '',
    "imageUrl"    => $dados['imageUrl'] ?? '',
    "content"     => $dados['content']
];

// Adiciona o novo artigo no topo da lista (mude para $articles[] = $novoArtigo; se quiser no final)
array_unshift($articles, $novoArtigo);

// 6. Salva no articles.json sem escapar barras (/) das URLs e mantendo acentos
$salvou = file_put_contents(
    $arquivoJson, 
    json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
);

if ($salvou) {
    http_response_code(201);
    echo json_encode([
        "mensagem" => "Artigo publicado com sucesso!",
        "id_gerado" => $novoId
    ]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Falha ao gravar no articles.json. Verifique permissões."]);
}

// 6. Atualiza o sitemap.xml mantendo exatamente o padrão original do site
$baseUrl = 'https://startecmontagem.com.br';
$hoje = date('Y-m-d');
$listaArtigos = json_decode(file_get_contents(__DIR__ . '/articles.json'), true) ?: [];

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . PHP_EOL;

// Página inicial
$xml .= "  <url>\n";
$xml .= "    <loc>{$baseUrl}/</loc>\n";
$xml .= "    <lastmod>{$hoje}</lastmod>\n";
$xml .= "    <changefreq>weekly</changefreq>\n";
$xml .= "    <priority>1.0</priority>\n";
$xml .= "  </url>\n";

// Todos os artigos do articles.json (antigos + novos)
foreach ($listaArtigos as $item) {
    if (!empty($item['slug'])) {
        $slug = htmlspecialchars($item['slug'], ENT_XML1, 'UTF-8');
        $titulo = htmlspecialchars($item['title'] ?? '', ENT_XML1, 'UTF-8');
        $imagem = htmlspecialchars($item['imageUrl'] ?? '', ENT_XML1, 'UTF-8');

        $xml .= "  <url>\n";
        $xml .= "    <loc>{$baseUrl}/artigos/{$slug}</loc>\n";
        $xml .= "    <lastmod>{$hoje}</lastmod>\n";
        $xml .= "    <changefreq>monthly</changefreq>\n";
        $xml .= "    <priority>0.8</priority>\n";
        if (!empty($imagem)) {
            $xml .= "    <image:image>\n";
            $xml .= "      <image:loc>{$imagem}</image:loc>\n";
            $xml .= "      <image:title>{$titulo}</image:title>\n";
            $xml .= "    </image:image>\n";
        }
        $xml .= "  </url>\n";
    }
}

$xml .= '</urlset>';
file_put_contents(__DIR__ . '/sitemap.xml', $xml);


?>
