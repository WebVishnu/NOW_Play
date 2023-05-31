import data from '@/json/Songs.json';
export default async function handler(req, res) {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}
