import sys

# Leer el archivo JS compilado como bytes
with open('dist/assets/index-BujwkFJZ.js', 'rb') as f:
    raw = f.read()

# Buscar todos los caracteres U+FFFD (en UTF-8: EF BF BD)
indices = []
i = 0
while i < len(raw):
    if raw[i:i+3] == b'\xef\xbf\xbd':
        indices.append(i)
        i += 3  # Saltar los 3 bytes del carácter de reemplazo
    else:
        i += 1

print(f"Total de caracteres de reemplazo (U+FFFD) encontrados: {len(indices)}")
print()

for num, idx_byte in enumerate(indices, 1):
    # Obtener contexto (150 bytes antes y después)
    start = max(0, idx_byte - 150)
    end = min(len(raw), idx_byte + 153)
    
    chunk = raw[start:end]
    
    # Convertir cada byte a su representación
    # Mostrar como string escapado
    try:
        text = chunk.decode('utf-8', errors='replace')
        # Reemplazar el carácter de sustitución con una marca visible
        text_marked = text.replace('\ufffd', '<<U+FFFD>>')
        print(f"--- Carácter {num} (byte {idx_byte}) ---")
        print(f"Contexto: ...{text_marked}...")
        print()
    except Exception as e:
        print(f"Error en posición {idx_byte}: {e}")
