import axios from "axios";

const uploadImage = async (
  image: any,
  size: number = 400,
  format: string = "jpeg"
) => {
  try {
    const { data } = await axios.post(
      `fileupload?size=${size}&format=${format}`,
      image
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export { uploadImage };
