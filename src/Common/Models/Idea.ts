type Idea = {
  user?: string,
  description: string,
  position: {
    x: number,
    y: number
  },
  id: number,
  color: string,
  bucketId?: number | null
}

export default Idea
