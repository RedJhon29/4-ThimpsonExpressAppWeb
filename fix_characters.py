import sys

# Leer el archivo como bytes
with open('src/features/home/HomePage.tsx', 'rb') as f:
    raw = f.read()

# En UTF-8, U+FFFD = \xef\xbf\xbd
REPLACEMENT = b'\xef\xbf\xbd'

# Estrategia: reemplazar U+FFFD según su contexto
# Patrones observados:
# - "L" + FFFD + "der" -> "Líder"
# - "detr" + FFFD + "s" -> "detrás"
# - "misi" + FFFD + "n" -> "misión"
# - "rinc" + FFFD + "n" -> "rincón"
# - "mercant" + FFFD + "a" -> "mercancía"
# - "visi" + FFFD + "n" -> "visión"
# - "coraz" + FFFD + "n" -> "corazón"
# - "log" + FFFD + "stico" -> "logístico"
# - "obst" + FFFD + "culo" -> "obstáculo"
# - "peque" + FFFD + "o" -> "pequeño"
# - "pa" + FFFD + "s" -> "país"
# - "d" + FFFD + "a" -> "día" (pero cuidado: "día" aparece en varios contextos)

# Vamos a hacer reemplazamientos secuenciales con bytes
result = raw

# Reemplazamientos específicos (deben ser únicos en el texto)
reemplazamientos = [
    (b'L' + REPLACEMENT + b'der', 'Líder'.encode('utf-8')),
    (b'detr' + REPLACEMENT + b's', 'detrás'.encode('utf-8')),
    (b'misi' + REPLACEMENT + b'n', 'misión'.encode('utf-8')),
    (b'rinc' + REPLACEMENT + b'n', 'rincón'.encode('utf-8')),
    (b'mercant' + REPLACEMENT + b'a', 'mercancía'.encode('utf-8')),
    (b'visi' + REPLACEMENT + b'n', 'visión'.encode('utf-8')),
    (b'coraz' + REPLACEMENT + b'n', 'corazón'.encode('utf-8')),
    (b'log' + REPLACEMENT + b'stico', 'logístico'.encode('utf-8')),
    (b'obst' + REPLACEMENT + b'culo', 'obstáculo'.encode('utf-8')),
    (b'peque' + REPLACEMENT + b'o', 'pequeño'.encode('utf-8')),
]

conteo = 0
for old, new in reemplazamientos:
    count = result.count(old)
    if count > 0:
        result = result.replace(old, new)
        conteo += count
    sys.stdout.buffer.write(f"  '{old.decode('utf-8', errors='replace')}' -> '{new.decode('utf-8')}' ({count} ocurrencias)\n".encode('utf-8'))

# Caso especial: "día" - el patrón "d" + FFFD + "a" es ambiguo
# Necesitamos ser cuidadosos. Busquemos "d\ufffda"
day_pattern = b'd' + REPLACEMENT + b'a'
count = result.count(day_pattern)
if count > 0:
    result = result.replace(day_pattern, 'día'.encode('utf-8'))
    conteo += count
    sys.stdout.buffer.write(f"  'd\ufffda' -> 'día' ({count} ocurrencias)\n".encode('utf-8'))

# Caso especial: "país" - el patrón "pa" + FFFD + "s"
country_pattern = b'pa' + REPLACEMENT + b's'
count = result.count(country_pattern)
if count > 0:
    result = result.replace(country_pattern, 'país'.encode('utf-8'))
    conteo += count
    sys.stdout.buffer.write(f"  'pa\ufffds' -> 'país' ({count} ocurrencias)\n".encode('utf-8'))

# Escribir el resultado corregido
with open('src/features/home/HomePage.tsx', 'wb') as f:
    f.write(result)

# Verificar
rest_count = result.count(REPLACEMENT)
if rest_count > 0:
    sys.stdout.buffer.write(f"\nADVERTENCIA: Aun hay {rest_count} caracteres corruptos sin reemplazar\n".encode('utf-8'))
else:
    sys.stdout.buffer.write(b"\nOK: Todos los caracteres corruptos han sido corregidos\n")

sys.stdout.buffer.write(f"Total de reemplazamientos: {conteo}\n".encode('utf-8'))
