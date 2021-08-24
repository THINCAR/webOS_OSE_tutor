from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

port = 9999

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        result = urlparse(self.path)
        path = result.path

        if(path == '/'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write('<h1>/를 호출하셨네요!</h1>'.encode('utf-8'))

        if(path == '/hi'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write('<h1>안녕하세요</h1>'.encode('utf-8'))


httpd = HTTPServer(('0.0.0.0', port), SimpleHTTPRequestHandler)
print(f'Server running on port:{port}')
httpd.serve_forever()