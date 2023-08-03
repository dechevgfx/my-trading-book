export type Trade = {
  id?: string;
  title: string,
  pair: string,
  image: string,
  type: string,
  likedBy: string[],
  userId: string,
  date: Date,
}
