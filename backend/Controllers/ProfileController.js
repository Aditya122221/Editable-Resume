import Profile from "../Models/ProfileModel.js";

const ProfileController = async (req, res) => {
  try {
    const {
      Registration_ID,
      Profile_ID,
      fullName,
      address,
      phone,
      email,
      linkedinLink,
      linkedinP,
      github,
      flag
    } = req.body;

    // Fetch profile
    if (flag === 1) {
      const user = await Profile.findOne({ Registration_ID });

      if (!user) {
        return res.status(200).json({ user: {} });
      }

      return res.status(200).json({ user });
    }

    // Update profile
    else if (flag === 2) {
      const profile = await Profile.updateOne(
        { Profile_ID },
        {
          $set: { fullName, address, phone, email, linkedinLink, linkedinP, github }
        }
      );

      if (profile.modifiedCount === 0) {
        return res
          .status(210)
          .json({
            status: false,
            message:
              "Updating Error from server side. Please try again later"
          });
      }

      return res
        .status(200)
        .json({ status: true, message: "Profile Updated" });
    }

    // Add profile
    else if (flag === 3) {
      let p_id;
      let isDuplicate = true;

      while (isDuplicate) {
        p_id =
          "P" +
          Math.floor(Math.random() * 900000 + 100000).toString();
        isDuplicate = await Profile.findOne({ Profile_ID: p_id });
      }

      const newUser = new Profile({
        Registration_ID,
        Profile_ID: p_id,
        fullName,
        address,
        phone,
        email,
        linkedinLink,
        linkedinP,
        github
      });

      await newUser.save();

      return res
        .status(201)
        .json({ status: true, message: "Profile Added" });
    }

    // Unknown flag
    else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid flag value" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export default ProfileController;
