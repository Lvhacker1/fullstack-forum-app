'use client'
import { useState } from 'react'
import Button from '@/components/common/Button'
import { imageUploadText } from '@/lib/data/imageUploadText'

interface ImageUploadProps {
    onUpload: (url: string) => void
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState('')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        setUploading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/images/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Upload failed')
                setPreview(null)
            } else {
                onUpload(data.url)
            }
        } catch (err) {
            setError('Upload failed')
            setPreview(null)
        } finally {
            setUploading(false)
        }
    }
    const handleRemove = () => {
        setPreview(null)
        onUpload('')
    }

  return (
    <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
            {imageUploadText.label}
        </label>
        {preview ? (
            <div className="relative">
                <img src={preview} alt="Preview" className="max-h-48 rounded-lg" />
                <Button 
                    type="button" 
                    variant="danger" 
                    onClick={handleRemove}
                    className="absolute top-2 right-2">
                    {imageUploadText.removeButton}
                </Button>
            </div>
        ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="w-full"/>
                {uploading && <p className="text-sm text-gray-500 mt-2">{imageUploadText.uploading}</p>}
            </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default ImageUpload