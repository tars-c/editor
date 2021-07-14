import axios from "axios";

const uploadImage = async (image: any) => {
  try {
    const { data } = await axios.post("fileupload", image);
    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};

export { uploadImage };
