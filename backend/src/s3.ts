import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

const region = "eu-north-1";
const bucketName = "presentations-image-bucket";
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

export const generateUploadUrl = async () => {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(params), {
    expiresIn: 60,
  });
  return uploadUrl;
};
