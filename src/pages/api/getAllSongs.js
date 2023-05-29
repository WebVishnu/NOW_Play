import data from '@/json/Songs.json';
export default async function handler(req, res) {
  try {
    setTimeout(() => {
      res.status(200).json(data);
    }, 500);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
}
