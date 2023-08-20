export type Trade = {
  id?: string;
  title: string,
  pair: string,
  image: string,
  type: string,
  description: string,
  likedBy: string[],
  comments: [{ id: string, comment: string, date: string, userId: string, userName: string }],
  userId: string,
  date: Date,
}
