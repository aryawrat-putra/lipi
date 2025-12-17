export function fileToBase64(file: File | null): Promise<string> {
    if (!file) return Promise.resolve('');

    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            resolve(reader.result as string)
        }

        reader.onerror = reject

        reader.readAsDataURL(file)
    })
}

type CompressOptions = {
    maxWidth?: number
    maxHeight?: number
    quality?: number // 0.1
    mimeType?: 'image/jpeg' | 'image/webp'
}

export async function compressFileToBase64(
    file: File | null,
    {
        maxWidth = 128,
        maxHeight = 128,
        quality = 0.9,
        mimeType = 'image/webp',
    }: CompressOptions = {}
): Promise<string> {
    if (!file) return Promise.resolve('');

    const img = await createImageBitmap(file)

    const scale = Math.min(
        maxWidth / img.width,
        maxHeight / img.height,
        1
    )

    const width = Math.round(img.width * scale)
    const height = Math.round(img.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, width, height)

    return canvas.toDataURL(mimeType, quality)
}
