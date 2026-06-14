import User from "./models/user.js"

export async function createTestUser() {
  try {
    const user = await User.create({
      name: "Yash Gangan",
      email: "yash@gmail.com",
      password: "12345678",
      mainsRank: 12543,
      advancedRank: 6789,
      category: "OPEN",
      gender: "MALE",
    });

    console.log("User created:", user);
  } catch (error) {
    console.error(error);
  }
}

