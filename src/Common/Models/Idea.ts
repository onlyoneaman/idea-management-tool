type Idea = {
  user?: string,
  description: string,
  position: {
    x: number,
    y: number
  },
  id: number,
  color: string,
  bucket_id?: number | null
}

export default Idea
