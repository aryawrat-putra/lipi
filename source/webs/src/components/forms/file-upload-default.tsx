import { useFileUpload } from '@/hooks/use-file-upload';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';
import { useEffect } from 'react';

interface ImageUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  onBlur?: () => void;
}

export default function ImageUpload({ onChange, onBlur }: ImageUploadProps) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    multiple: false,
  });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  // Sync hook state with React Hook Form
  useEffect(() => {
    if (files[0]?.file instanceof File) {
      onChange?.(files[0].file);
    } else if (files.length === 0) {
      onChange?.(null);
    }
  }, [files, onChange]);

  const handleRemove = () => {
    if (files[0]?.id) {
      removeFile(files[0].id);
    }
    onChange?.(null);
  };

  return (
    <div className="max-w-full flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="border-input relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          aria-label={previewUrl ? 'Preview of uploaded image' : 'Default user avatar'}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={64}
              height={64}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUser className="opacity-60" size={32} />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <Button 
            onClick={openFileDialog} 
            onBlur={onBlur}
            aria-haspopup="dialog" 
            variant={'outline'} 
            size={'sm'}
            type="button"
          >
            {fileName ? 'Change image' : 'Upload image'}
          </Button>
          <input {...getInputProps()} className="sr-only" aria-label="Upload image file" tabIndex={-1} />
        </div>
      </div>
      {fileName ? (
        <div className="inline-flex gap-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            {fileName}
          </p>{' '}
          <button
            onClick={handleRemove}
            className="cursor-pointer text-destructive font-medium hover:underline"
            aria-label={`Remove ${fileName}`}
            type="button"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="inline-flex gap-2 text-xs">
          <p className="text-muted-foreground truncate" aria-live="polite">
            No image attached
          </p>
        </div>
      )}
    </div>
  );
}