$root = "$PWD\dist"
$url = "http://localhost:3000"

# Start a simple HTTP server
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url + '/')
$listener.Start()

Write-Host "Serving $root at $url"
Write-Host "Press Ctrl+C to stop..."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) {
            $path = "index.html"
        }
        
        $filePath = Join-Path $root $path
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $content = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
}
