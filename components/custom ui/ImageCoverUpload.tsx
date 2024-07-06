import { Plus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageCoverUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="hqmhbgp2"
        options={{
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result: any) => {
          onChange(result.info.secure_url);
        }}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className=" text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload Image Cover
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageCoverUpload;
