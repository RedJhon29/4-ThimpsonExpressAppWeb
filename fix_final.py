import sys

with open('src/features/home/HomePage.tsx', 'rb') as f:
    raw = f.read()

REPLACEMENT = b'\xef\xbf\xbd'

# El patrón real es: "mercan" + "c" + FFFD + "a"
# Queremos: "mercanc" + "ía" = "mercancía"
old = b'mercanc' + REPLACEMENT + b'a'
new = 'mercan\u00eda'.encode('utf-8')  # mercancía

if old in raw:
    count = raw.count(old)
    raw = raw.replace(old, new)
    sys.stdout.buffer.write(f"Reemplazado {count} ocurrencias!\n".encode('utf-8'))
else:
    sys.stdout.buffer.write(b"Patron no encontrado\n")
    idx = raw.find(REPLACEMENT)
    context = raw[idx-10:idx+10]
    sys.stdout.buffer.write(f"Contexto del FFFD: {context.hex()}\n".encode('utf-8'))
    sys.stdout.buffer.write(f"Texto: {context.decode('utf-8', errors='replace')}\n".encode('utf-8'))

# Verificar
rest = raw.count(REPLACEMENT)
sys.stdout.buffer.write(f"Caracteres corruptos finales: {rest}\n".encode('utf-8'))

# Escribir
with open('src/features/home/HomePage.tsx', 'wb') as f:
    f.write(raw)
