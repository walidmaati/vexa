import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

// Controller function to generate images using prompts, targeting a specific online API
export const generateImage = async (req, res) => {
  try {
    // Getting the User ID from the token, using the middleware, and the prompt from the body
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);

    // Validation of user/prompts existence, and credits balance
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (user.credit == 0 || user.credit < 0) {
      return res.json({ success: false, message: "No credit balance" });
    }

    // Assigning the prompt to form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Requesting the call to the API to generate the image
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key":
            "54f292958727dfbb92429ad1def54dc2013cb5d41b9fa7cb965932905a8506260d1b78a8367525cac9c18949f91d0984", // API ClipDrop Key
          ...formData.getHeaders(), // Adding the multipart/form-data headers
        },
        // Array buffer used to return response type that match the files
        responseType: "arraybuffer",
      }
    );

    // Converting our image response to a base64
    const base64Image = Buffer.from(data, "binary").toString("base64");

    // Creating the image and the link
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Updating the credits of the user, after generating the image
    await userModel.findByIdAndUpdate(user._id, { credit: user.credit - 1 }); // <-- also fixed property name

    res.json({
      success: true,
      message: "Image generated",
      credit: user.credit - 1,
      resultImage,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
