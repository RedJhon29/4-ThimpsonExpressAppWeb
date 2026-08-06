import { useState, useRef, useEffect } from 'react'
import { Star, Send, X, Camera, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Rating } from '@/lib/mock-data/ratings'

interface RideRatingModalProps {
  orderId: string
  riderName: string
  riderAvatar?: string
  riderRating?: number
  service: string
  onClose: () => void
  onSubmit: (rating: Rating) => void
}

const STAR_LABELS = ['Horrible', 'Malo', 'Regular', 'Bueno', 'Excelente']
const QUICK_TAGS = [
  'Servicio rápido',
  'Rider amable',
  'Servicio amable',
  'Servicio excelente',
  'Producto en buen estado',
  'Servicio impecable',
  'Servicio lento',
  'Servicio desorganizado',
  'Producto dañado',
  'Servicio malo',
]

export function RideRatingModal({
  orderId,
  riderName,
  riderAvatar,
  riderRating,
  service,
  onClose,
  onSubmit,
}: RideRatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus en el textarea al abrir
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleStarClick = (value: number) => {
    setRating(value)
  }

  const handleStarHover = (value: number) => {
    setHoverRating(value)
  }

  const handleStarLeave = () => {
    setHoverRating(0)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handlePhotoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const newPhotos = files.map(file => URL.createObjectURL(file))
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 3))
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    URL.revokeObjectURL(newPhotos[index])
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)

    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 800))

    const ratingData: Rating = {
      id: `r-${Date.now()}`,
      orderId,
      riderName,
      riderAvatar,
      clientId: `client-${Date.now()}`,
      clientName: 'Cliente Actual',
      service,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      photos,
      tags: selectedTags,
      status: 'ACTIVE',
      reportedReason: rating < 3 && comment.length > 0 ? comment : undefined,
    }

    onSubmit(ratingData)
    setIsSubmitting(false)
  }

  const canSubmit = rating > 0 && (comment.trim().length > 0 || selectedTags.length > 0)

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-500 p-4">
      <div
        className="bg-surface border border-border max-w-lg w-full animate-fade-in"
        style={{
          animation: 'fadeIn 0.3s ease-out',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-1">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden border-2 border-primary">
              {riderAvatar ? (
                <img
                  src={riderAvatar}
                  alt={riderName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-sm font-bold text-primary">
                  {riderName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Califica tu experiencia</h2>
              <p className="text-sm text-text-muted">Servicio: {service}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-white border border-border rounded-none hover:bg-destructive hover:border-destructive hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Estrellas */}
        <div className="p-5 text-center border-b border-border">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="relative p-1 transition-transform hover:scale-110"
                style={{ transition: 'transform 0.15s ease' }}
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-all",
                    star <= (hoverRating || rating)
                      ? "fill-primary text-primary"
                      : "fill-transparent text-text-muted/40"
                  )}
                  style={{ transition: 'all 0.2s ease' }}
                />
              </button>
            ))}
          </div>
          {(hoverRating > 0 || rating > 0) && (
            <p className="text-sm font-medium text-white mt-1 animate-fade-in">
              {STAR_LABELS[(hoverRating || rating) - 1]}
            </p>
          )}
          {riderRating && (
            <p className="text-xs text-text-muted mt-1">
              Rating histórico del rider: ⭐ {riderRating.toFixed(1)}
            </p>
          )}
        </div>

        {/* Comentario */}
        <div className="p-5 border-b border-border">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Cuéntanos cómo fue tu experiencia con ${riderName}...`}
            className="w-full min-h-[100px] bg-surface-1 border border-white/10 text-sm text-foreground placeholder:text-text-muted rounded-none resize-none focus:border-primary focus:outline-none transition-colors"
            maxLength={200}
          />
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className={cn(
              "text-text-muted",
              comment.length < 10 && "text-destructive"
            )}>
              {comment.length < 10 && rating >= 3 && "Mínimo 10 caracteres para calificaciones altas"}
            </span>
            <span className="text-text-muted">
              {comment.length}/200
            </span>
          </div>
        </div>

        {/* Tags rápidas */}
        <div className="p-5 border-b border-border">
          <p className="text-xs font-medium text-text-muted mb-3 uppercase tracking-widest">
            Selecciona etiquetas que describan tu experiencia
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              const isNegative = ['Servicio lento', 'Servicio desorganizado', 'Producto dañado', 'Servicio malo'].includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium border rounded-none transition-all whitespace-nowrap",
                    isSelected
                      ? isNegative
                        ? "bg-destructive/10 text-destructive border-destructive/30"
                        : "bg-primary/10 text-primary border-primary/30"
                      : "bg-surface-1 text-text-muted border-border hover:text-white hover:border-white/20"
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Fotos */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
              Agrega fotos (opcional)
            </p>
            <span className="text-xs text-text-muted">
              {photos.length}/3
            </span>
          </div>

          {photos.length < 3 ? (
            <button
              type="button"
              onClick={handlePhotoUpload}
              className="w-full h-24 border-2 border-dashed border-border rounded-none flex flex-col items-center justify-center gap-2 text-text-muted hover:border-primary hover:text-primary transition-colors"
            >
              <Camera className="h-5 w-5" />
              <span className="text-xs">Haz clic para subir fotos</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                max={3 - photos.length}
                onChange={handlePhotoChange}
                className="hidden"
              />
            </button>
          ) : (
            <p className="text-xs text-text-muted text-center">
              Has subido el máximo de fotos permitidas
            </p>
          )}

          {/* Preview de fotos */}
          {photos.length > 0 && (
            <div className="mt-3 flex gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative h-16 w-16 overflow-hidden border border-border">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-0 right-0 h-4 w-4 bg-destructive text-white rounded-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 bg-surface-1 border-t border-border">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm text-text-muted hover:text-white border border-border rounded-none transition-colors"
          >
           Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "px-6 py-2 text-sm font-semibold rounded-none border flex items-center gap-2 transition-all",
              canSubmit && !isSubmitting
                ? "bg-primary text-primary-foreground border-primary hover:opacity-90"
                : "bg-surface-1 text-text-muted border-border cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar calificación
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Estilos globales para animaciones
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
`

// Insertar estilos globales si no están ya
if (typeof document !== 'undefined') {
  const styleId = 'rating-modal-animations'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = globalStyles
    document.head.appendChild(style)
  }
}
