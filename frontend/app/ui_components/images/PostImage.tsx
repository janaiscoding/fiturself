import { Avatar } from "@/app/__types__/types";
import Image from "next/image";

const PostImage = ({ image }: { image: Avatar }) => {
  return (
    <div>
      <Image
        src={`data:${image.contentType};base64,${Buffer.from(
          image.data!
        ).toString("base64")}`}
        width={400}
        height={0}
        className="w-40 h-40 object-cover border-2 border-solid border-mid-green"
        alt="Uploaded Post Picture"
      />
    </div>
  );
};

export default PostImage;
