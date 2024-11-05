import { connect } from "../connectDB";
import User from "../models/user.model";

export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: { email: string }[];
  username: string;
}

export const createOrUpdateUser = async (data: UserProps) => {
  try {
    await connect();

    const { id, first_name, last_name, image_url, email_addresses, username } =
      data;

    // Ensure that email_addresses has at least one email before accessing it
    const email = email_addresses.length > 0 ? email_addresses[0].email : "";

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email,
          username,
        },
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await connect();

    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
