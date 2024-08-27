// components/ProfilePictureUpload.tsx
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

// Define the type for the props
interface ProfilePictureUploadProps {
    userId: string;
    onUpload: (url: string) => void; // Callback function type
}

const ProfilePictureUpload = ({ userId, onUpload }: ProfilePictureUploadProps) => {
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            // Create a unique file name using user ID and file name
            const fileName = `${userId}/${file.name}`;

            // Upload the image to the storage bucket

            const supabase = createClient();
            const { error: uploadError } = await supabase.storage
                .from('profile_pictuers')
                .upload(fileName, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get the public URL of the uploaded image
            const { data } = supabase.storage
                .from('profile_pictuers')
                .getPublicUrl(fileName);

            if (data?.publicUrl) {
                onUpload(data.publicUrl); // Pass the URL back to the parent component
            }

        } catch (error: any) {
            console.error('Error uploading file: ', error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
            />
            {uploading ? <p>Uploading...</p> : null}
        </div>
    );
}

export default ProfilePictureUpload;