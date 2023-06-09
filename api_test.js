// import { getUserVideos } from "./src/api/user"
// const { getUserVideos } = require("./src/api/user");

const axios = require("axios");

const handleVideoUploadSubmit = async (event) => {

  

  const formData = new FormData();
  formData.append("video", );
  formData.append("responseInterfaces", "ui");
  formData.append("responseInterfaces", "email");
  // make a POST request to the File Upload API with the FormData object and Rapid API headers

  const token = "";

  try {
    const res = await axios.post("http://localhost:3001/api/user/videos/upload-and-enhance", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(res);
  } catch(error) {
    console.log(error);
  }

};

async function main() {
  const a = await handleVideoUploadSubmit();
  console.log(a);
}

main();