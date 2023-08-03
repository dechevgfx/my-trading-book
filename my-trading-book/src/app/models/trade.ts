export type Trade = {
  id?: string;
  title: string,
  pair: string,
  image: string,
  type: string,
  likes: number,
  likedBy: string[],
  userId: string,
  date: Date,
}
