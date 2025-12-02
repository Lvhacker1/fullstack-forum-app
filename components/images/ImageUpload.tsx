'use client'
import { useCallback, useState } from 'react'
import Button from '@/components/common/Button'
import { imageUploadText } from '@/lib/data/imageUploadText'
import Cropper from 'react-easy-crop'

interface ImageUploadProps {
    onUpload: (url: string) => void
}

interface Point {
    x: number
    y: number
}

interface Area {
    width: number
    height: number
    x: number
    y: number
}

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
    })

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            throw new Error('No 2d context')
        }

        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'))
                return
            }
            resolve(blob)
            }, 'image/jpeg', 0.95)
        })        
    }




const ImageUpload = ({ onUpload }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState('')
    const [showCropper, setShowCropper] = useState(false)
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImageSrc(reader.result as string)
            setShowCropper(true)
        }
        reader.readAsDataURL(file)
    }

    const handleCropConfirm = async () => {
        if (!imageSrc || !croppedAreaPixels) return
        setUploading(true)
        setError('')

        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
            const formData = new FormData()
            formData.append('file', croppedBlob, 'croppedImage.jpg')

            const response = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Upload failed')
            } else {
                setPreview(data.url)
                onUpload(data.url)
                setShowCropper(false)
                setImageSrc(null)
            }
        } catch (err) {
            setError('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleCropCancel = () => {
        setShowCropper(false)
        setImageSrc(null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
    }

    const handleRemove = () => {
        setPreview(null)
        onUpload('')
    }

  return (
    <div className="space-y-3 w-full">
        <label className="block text-sm font-medium mb-1 text-slate-300">
            {imageUploadText.label}
        </label>
        {preview ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Button 
                    type="button" 
                    variant="danger" 
                    onClick={handleRemove}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90">
                    {imageUploadText.removeButton}
                </Button>
            </div>
        ) : (
            <div className='w-full'>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-900/30 hover:bg-slate-900/60 hover:border-blue-500/50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="p-3 rounded-full bg-slate-800 mb-3 group-hover:bg-blue-500/10 transition-colors">
                            <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" ></path>
                            </svg>
                        </div>
                        <p className="mb-1 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                            <span className="font-semibold">{imageUploadText.clickToSelect}</span>
                        </p>
                        <p className="text-xs text-slate-600 group-hover:text-slate-500">{imageUploadText.fileTypes}</p>
                    </div>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"/>
                </label>
            </div>
        )}
        {error && <p className="text-sm text-red-400 mt-2 bg-red-950/20 p-2 rounded border border-red-900/50">{error}</p>}
        {showCropper && imageSrc && (
            <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            {imageUploadText.cropTitle}
                        </h3>
                        <button onClick={handleCropCancel} className="text-slate-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative flex-1 bg-black min-h-[300px]">
                        <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={true}/>
                    </div>
                    <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{imageUploadText.zoomLabel}</label>
                            <input className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}/>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button className="flex-1" type="button" variant="secondary"  onClick={handleCropCancel} disabled={uploading} >
                                {imageUploadText.cancelButton}
                            </Button>
                            <Button className="flex-1" type="button"  variant="primary"  onClick={handleCropConfirm} disabled={uploading}  isLoading={uploading}>
                                {uploading ? imageUploadText.uploadingButton : imageUploadText.saveButton}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ImageUpload