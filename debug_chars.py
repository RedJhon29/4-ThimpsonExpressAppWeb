import sys

with open('src/features/home/HomePage.tsx', 'rb') as f:
    raw = f.read()

REPLACEMENT = b'\xef\xbf\xbd'
idx = raw.find(REPLACEMENT)

# Mostrar bytes exactos alrededor del FFFD
start = max(0, idx - 20)
end = min(len(raw), idx + 20)
chunk = raw[start:end]

sys.stdout.buffer.write(f"Bytes hexadecimales: {chunk.hex()}\n".encode('utf-8'))
decoded = chunk.decode('utf-8', errors='replace')
sys.stdout.buffer.write(f"Texto decodificado: {decoded}\n".encode('utf-8'))

# Bytes antes y después del FFFD
sys.stdout.buffer.write(f"Antes del FFFD: {raw[idx-10:idx].hex()}\n".encode('utf-8'))
sys.stdout.buffer.write(f"Despues del FFFD: {raw[idx+3:idx+13].hex()}\n".encode('utf-8'))

# El texto correcto deberia ser "mercancía"
# "mercant" + FFFD + "a" = "mercant<FFFD>a"
# Pero el patrón podria ser diferente...

# Verificar el texto completo
text = raw[idx-15:idx+15]
try:
    decoded_text = text.decode('utf-8', errors='replace')
    sys.stdout.buffer.write(f"Texto completo: {decoded_text}\n".encode('utf-8'))
except Exception as e:
    sys.stdout.buffer.write(f"Error decodificando: {str(e)}\n".encode('utf-8'))
